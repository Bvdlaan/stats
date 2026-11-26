<?php
/* Server-side proxy for the GUS DBW API. The browser calls
   gus-proxy.php?p=/variable/..., this script adds the API key and forwards the request.
   The key is read from the GUS_KEY environment variable, or from a .env file
   one folder ABOVE the web root (never inside it). Example .env line:
   GUS_KEY=your-key-here */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail($code, $msg){ http_response_code($code); echo json_encode(['error' => $msg]); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'GET') fail(405, 'GET only');

// Only allow the read endpoints the app uses.
$path = $_GET['p'] ?? '';
if (!preg_match('#^/(variable|dictionaries)/[A-Za-z0-9/_\-]+(\?[A-Za-z0-9_\-=&%.,+]*)?$#', $path)) fail(400, 'Path not allowed');

// Load the key.
$key = getenv('GUS_KEY');
if (!$key) {
  $envFile = dirname(__DIR__) . '/.env';
  if (is_readable($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
      if (preg_match('/^\s*GUS_KEY\s*=\s*(.+?)\s*$/', $line, $m)) { $key = trim($m[1], "\"'"); break; }
    }
  }
}

// Light rate limit per visitor (files in the system temp dir).
$bucket = sys_get_temp_dir() . '/gusproxy_' . md5($_SERVER['REMOTE_ADDR'] ?? 'x') . '_' . floor(time() / 60);
$n = (int)@file_get_contents($bucket) + 1;
@file_put_contents($bucket, (string)$n);
if ($n > 60) fail(429, 'Too many requests, wait a minute');

$bases = ['https://api-dbw.stat.gov.pl/api', 'https://api-dbw.stat.gov.pl/api/1.0.0'];
$last = [0, ''];
foreach ($bases as $b) {
  $ch = curl_init($b . $path);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTPHEADER => array_filter(['Accept: application/json', $key ? 'X-ClientId: ' . $key : null]),
  ]);
  $body = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($code >= 200 && $code < 300 && $body !== false) { echo $body; exit; }
  $last = [$code, (string)$body];
}
http_response_code($last[0] ?: 502);
echo $last[1] !== '' ? $last[1] : json_encode(['error' => 'Upstream request failed']);

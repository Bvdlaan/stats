<?php
/* Forwards read requests to the SNB data portal, which sends no CORS headers.
   Usage: snb-proxy.php?p=/<cube>/data/json/en?fromDate=2024-01 . No key needed. */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
function fail($c,$m){ http_response_code($c); echo json_encode(['error'=>$m]); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'GET') fail(405, 'GET only');
$p = $_GET['p'] ?? '';
if (!preg_match('#^/[a-z0-9_]+/(data/json/en|dimensions/en)(\?fromDate=\d{4}(-\d{2})?)?$#i', $p)) fail(400, 'Path not allowed');
$bucket = sys_get_temp_dir().'/snbproxy_'.md5($_SERVER['REMOTE_ADDR'] ?? 'x').'_'.floor(time()/60);
$n = (int)@file_get_contents($bucket) + 1; @file_put_contents($bucket, (string)$n);
if ($n > 60) fail(429, 'Too many requests, wait a minute');
$ch = curl_init('https://data.snb.ch/api/cube'.$p);
curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER=>true, CURLOPT_TIMEOUT=>30, CURLOPT_HTTPHEADER=>['Accept: application/json']]);
$body = curl_exec($ch); $code = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
if ($body === false) fail(502, 'Upstream request failed');
http_response_code($code ?: 502); echo $body;

// Local test server: node serve.js  ->  http://localhost:8080
// Serves this folder and mimics snb-proxy.php (SNB sends no CORS headers).
const http = require('http'), fs = require('fs'), path = require('path'), https = require('https');
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css' };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname === '/snb-proxy.php') {
    const p = u.searchParams.get('p') || '';
    if (!/^\/[a-z0-9_]+\/(data\/json\/en|dimensions\/en)(\?fromDate=\d{4}(-\d{2})?)?$/i.test(p)) { res.writeHead(400); return res.end('{"error":"Path not allowed"}'); }
    https.get('https://data.snb.ch/api/cube' + p, { headers:{ Accept:'application/json' } }, r => {
      res.writeHead(r.statusCode, { 'Content-Type':'application/json; charset=utf-8' }); r.pipe(res);
    }).on('error', () => { res.writeHead(502); res.end('{"error":"Upstream request failed"}'); });
    return;
  }
  const f = path.join(__dirname, u.pathname === '/' ? 'index.html' : path.normalize(u.pathname).replace(/^(\.\.[/\\])+/, ''));
  if (!f.startsWith(__dirname) || /\/\.|serve\.js|serve\.py|start\./.test(f)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end('Not found'); } res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); res.end(d); });
}).listen(8080, () => console.log('Open http://localhost:8080'));

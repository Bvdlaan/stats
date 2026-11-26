#!/usr/bin/env python3
"""Local server for Macro data lookup (no installs needed, Python 3 only).
Run:  python3 serve.py   then open http://localhost:8080
Serves this folder and mimics snb-proxy.php, because the SNB sends no CORS headers."""
import http.server, re, socketserver, sys, urllib.parse, urllib.request, os
PORT = int(os.environ.get('PORT', 8080))
ROOT = os.path.dirname(os.path.abspath(__file__))
OK = re.compile(r'^/[a-z0-9_]+/(data/json/en|dimensions/en)(\?fromDate=\d{4}(-\d{2})?)?$', re.I)
BLOCK = ('serve.py', 'serve.js', 'start.command', 'start.bat')

class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=ROOT, **k)
    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        if u.path == '/snb-proxy.php':
            p = urllib.parse.parse_qs(u.query).get('p', [''])[0]
            if not OK.match(p): return self.reply(400, b'{"error":"Path not allowed"}')
            try:
                req = urllib.request.Request('https://data.snb.ch/api/cube' + p, headers={'Accept': 'application/json'})
                with urllib.request.urlopen(req, timeout=30) as r: return self.reply(r.status, r.read())
            except urllib.error.HTTPError as e: return self.reply(e.code, e.read())
            except Exception: return self.reply(502, b'{"error":"Upstream request failed"}')
        if os.path.basename(u.path) in BLOCK or '/.' in u.path: return self.reply(403, b'')
        return super().do_GET()
    def reply(self, code, body):
        self.send_response(code); self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body)
    def log_message(self, *a): pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('127.0.0.1', PORT), H) as s:
    print(f'Open http://localhost:{PORT}   (Ctrl+C to stop)'); 
    try: s.serve_forever()
    except KeyboardInterrupt: sys.exit(0)

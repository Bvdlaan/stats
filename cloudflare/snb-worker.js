// Cloudflare Worker: forwards read requests to the SNB data portal and adds CORS headers,
// so the app can be opened straight from a file with nothing installed.
// Deploy: dash.cloudflare.com -> Workers & Pages -> Create -> Create Worker -> paste this -> Deploy.
// Then put the worker address in config.js:  snbProxy: 'https://<name>.<account>.workers.dev'
const ALLOWED = /^\/[a-z0-9_]+\/(data\/json\/en|dimensions\/en)(\?fromDate=\d{4}(-\d{2})?)?$/i;
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' };

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'GET') return new Response('GET only', { status: 405, headers: CORS });
    const p = new URL(request.url).searchParams.get('p') || '';
    if (!ALLOWED.test(p)) return new Response('{"error":"Path not allowed"}', { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } });
    const r = await fetch('https://data.snb.ch/api/cube' + p, { headers: { Accept: 'application/json' }, cf: { cacheTtl: 3600, cacheEverything: true } });
    return new Response(r.body, { status: r.status, headers: { ...CORS, 'Content-Type': 'application/json; charset=utf-8' } });
  }
};

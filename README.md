# Macro data lookup

Chart and table lookup for central bank and statistics office data (ECB, Norges Bank, Riksbank, SSB, SCB, Eurostat, Bundesbank, SNB, NBP, GUS, ONS), with an optional AI question box.

## Run locally (everything works, including Switzerland)

1. Copy `config.example.js` to `config.js` and fill in what you need (GUS key, AI keys). `config.js` is never committed.
2. Start the small local server:
   - **Mac:** double-click `start.command`
   - **Windows:** double-click `start.bat`
   - **Any system:** `node serve.js` or `python3 serve.py`
3. Open http://localhost:8080

The server only serves this folder and forwards SNB requests, because the SNB blocks direct browser calls (no CORS).

## Without the server

Opening `index.html` directly still works for every source except SNB. GitHub Pages behaves the same: SNB is not available there.

## Hosting with PHP

Upload the folder (without `config.js`). `snb-proxy.php` and `gus-proxy.php` replace the local server. Put the GUS key in a `.env` file above the web root (`GUS_KEY=...`) and set `gusProxy: 'gus-proxy.php'` in `config.js`. See `API_REFERENCE.md` for all endpoints.

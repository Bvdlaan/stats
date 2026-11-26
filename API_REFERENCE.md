# Macro data lookup: API reference

All endpoints used by the tool (index.html, styles.css, app.js, config.js). All data APIs are free. Calls are made from the browser (`fetch`), so the API must allow cross-origin requests (CORS), except SNB, which goes through the local server or a PHP proxy.
Status: **Built** = implemented per official documentation; **Unverified** = not yet confirmed with a live call.

## Overview

| # | Source | Base URL | Key | Format | Status |
|---|--------|----------|-----|--------|--------|
| 1 | ECB Data Portal | `https://data-api.ecb.europa.eu/service/data` | No | SDMX-JSON | Built |
| 2 | Norges Bank | `https://data.norges-bank.no/api/data` | No | SDMX-JSON | Built |
| 3 | Bundesbank | `https://api.statistiken.bundesbank.de/rest/data` | No | SDMX-JSON | Built; HICP preset key unverified |
| 4 | Riksbank (SWEA) | `https://api.riksbank.se/swea/v1` | Optional | JSON | Built |
| 5 | NBP (Poland) | `https://api.nbp.pl/api` | No | JSON | Built |
| 6 | Statistics Norway (SSB) | `https://data.ssb.no/api/pxwebapi/v2` | No | PxWebApi v2, JSON-stat 2.0 | Built |
| 7 | Statistics Sweden (SCB) | `https://statistikdatabasen.scb.se/api/v2` (fallback `https://api.scb.se/OV0104/v2beta/api/v2`) | No | PxWebApi v2 | Base URL unverified |
| 8 | Statistics Poland (GUS), API DBW | `https://api-dbw.stat.gov.pl/api` | Optional | JSON | Experimental; allows browser calls (CORS `*`) |
| 9 | Swiss National Bank (SNB) | `https://data.snb.ch/api/cube` | No | JSON | Built; no CORS, needs proxy |
| 10 | Eurostat | `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data` | No | JSON-stat 2.0 | Built |
| 11 | ONS (UK) | `https://api.beta.ons.gov.uk/v1` | No | JSON | Built |
| 12 | Mistral (AI) | `https://api.mistral.ai/v1` | Yes | JSON | Built |
| 13 | Anthropic Claude (AI) | `https://api.anthropic.com/v1/messages` | Yes | JSON | Built |

Not included: Destatis GENESIS (needs login), CBS Netherlands, Danmarks Statistik, Statistics Finland, Swiss BFS (the legacy PxWeb API has no titles or search, and Swiss Stats Explorer has no CPI or GDP dataflows).

## 1. ECB
`GET {base}/{flow}/{key}?format=jsondata&startPeriod=YYYY-MM-DD&detail=dataonly`. FX `EXR` / `D.{CUR}.EUR.SP00.A`; deposit rate `FM` / `D.U2.EUR.4F.KR.DFR.LEV`; €STR `EST` / `B.EU000A2X2A25.WT`; HICP `ICP` / `M.{CC}.N.000000.4.ANR`; core HICP `ICP` / `M.U2.N.XEF000.4.ANR`. `+` combines values in one key position.

## 2. Norges Bank
`GET {base}/{flow}/{key}?format=sdmx-json&startPeriod=YYYY-MM-DD&locale=en`. `EXR` / `B.{CUR}.NOK.SP` (SEK per 100); policy rate `IR` / `B.KPRA.SD.R`.

## 3. Bundesbank
Same request with header `Accept: application/vnd.sdmx.data+json;version=1.0.0`. 10-year Bund `BBSIS` / `D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A`; EUR/USD `BBEX3` / `D.USD.EUR.BB.AC.000`.

## 4. Riksbank
`GET {base}/Observations/{seriesId}/{from}/{to}`; series list `GET {base}/Series`. Optional key as `?subscription-key=` (`riksbankKey`): 5 to 200 calls a minute. Series: `SECBREPOEFF`, `SECBDEPOEFF`, `SECBLENDEFF`, `SEK{CUR}PMI`, `SEDP3MSTIBORDELAYC`. Name Sveriges riksbank as the source.

## 5. NBP
FX `GET {base}/exchangerates/rates/A/{CODE}/{from}/{to}/?format=json`; gold `GET {base}/cenyzlota/{from}/{to}/?format=json`. About 93 days per FX request (367 for gold), stitched in windows. The NBP policy rate is not in this API.

## 6. SSB and 7. SCB (PxWebApi v2)
Search `GET {base}/tables?query=&lang=en&pageSize=40`; metadata `GET {base}/tables/{id}/metadata?lang=en`; data `GET {base}/tables/{id}/data?lang=en&outputFormat=json-stat2&valueCodes[{dim}]=...&valueCodes[Tid]=from(...)`. SSB tables: `09190` national accounts (GDP Mainland Norway), `03013` CPI, `05327` CPI-ATE, `13760` labour force survey. SCB limit: 30 calls per 10 s. The SCB v1 API retires around 2026/27, use v2.

## 8. GUS (API DBW, experimental)
Catalogue `GET {base}/variable/variable-section-periods?...`; periods `GET {base}/dictionaries/periods-dictionary?...`; data `GET {base}/variable/variable-data-section?id-zmienna=&id-przekroj=&id-rok=&id-okres=&...`. Optional key as header `X-ClientId` (`gusKey`; confirmed accepted). Limits without key: 5/s, 100 per 15 min; with key 10/s, 500 per 15 min. Many series are indices with previous year = 100; the tool subtracts 100 when a % change is wanted. When hosted, use `gus-proxy.php` (`gusProxy`) so the key stays on the server.

## 9. SNB (Swiss National Bank)
- **Data:** `GET https://data.snb.ch/api/cube/{cube}/data/json/en?fromDate=YYYY-MM` returns `{"timeseries":[{"header":[{"dim","dimItem"}],"metadata":{"unit"},"values":[{"date","value"}]}]}`.
- **Dimensions:** `GET .../cube/{cube}/dimensions/en`.
- **Cubes used:** `snbgwdzid` policy rate and SARON (daily), `devkum` CHF exchange rates (monthly), `plkopr` consumer prices, `zimoma` money market rates, `rendoblim` Confederation bond yields.
- **CORS:** SNB sends no CORS headers, so the browser cannot call it directly. Locally `serve.js` or `serve.py` forwards the request at `/snb-proxy.php`; hosted on PHP, `snb-proxy.php` does the same (`snbProxy` in `config.js`). GitHub Pages has no proxy, so SNB is unavailable there.

## 10. Eurostat
`GET {base}/{dataset}?format=JSON&lang=en&geo=..&{dim}={code}&sinceTimePeriod=`. The tool first reads the available codes with `&lastTimePeriod=1`. Datasets: `prc_hicp_minr` (`RCH_A`), `namq_10_gdp` (`CLV_PCH_PRE`, `CLV_PCH_SM`, `B1GQ`, `SCA`), `une_rt_m`. Use `prc_hicp_minr`, not the archived `prc_hicp_manr`. The UK is not covered after 2020.

## 11. ONS
Find `GET {base}/search?content_type=timeseries&cdids={cdid}&limit=20`; data `GET {base}/data?uri={uri}`. `D7G7` CPI, `L55O` CPIH, `DKO8` core CPI, `D7NN` services CPI, `MGSX` unemployment, `IHYQ` GDP q/q, `IHYR` GDP y/y.

## 12. Mistral and 13. Claude (AI layer)
Mistral `POST https://api.mistral.ai/v1/chat/completions` (Bearer key, `response_format` json_object; the agents endpoint is deprecated). Claude `POST https://api.anthropic.com/v1/messages` with `x-api-key`, `anthropic-version: 2023-06-01` and `anthropic-dangerous-direct-browser-access: true`. Keys: `mistralKey`, `mistralModel`, `mistralAgentId`, `anthropicKey`, `anthropicModel`.

## How the AI uses the sources
1. **Plan:** the AI turns the question into a JSON list of queries (see `plannerPrompt()`).
2. **Resolve:** for SSB, SCB and GUS it searches the real table or variable list and picks the exact codes.
3. **Fetch:** the tool calls the APIs. The AI never supplies numbers.
4. **Answer (optional):** two to four sentences from the fetched data only.

**Source rules:** national sources always come first, also in comparisons (SSB and Norges Bank for Norway, SCB and Riksbank for Sweden, GUS and NBP for Poland, SNB for Switzerland, ONS for the UK, Bundesbank for German yields). Eurostat only for countries without a national source here, or when asked. The Ask dropdown has "National sources only" and "Norway + Sweden" restrictions.

**Analyst lens:** `CB_VIEW` in `app.js` sets the headline measure per country (GDP Mainland Norway, CPI-ATE, CPIF, services CPI, and so on). Edit it there.

/* ---------- Source definitions ---------- */
const SOURCES = {
  ecb: { label:'ECB', kind:'sdmx', base:'https://data-api.ecb.europa.eu/service/data', fmt:'jsondata', extra:'&detail=dataonly',
    help:'Dataset (flow) and series key from the ECB Data Portal, e.g. EXR and D.USD.EUR.SP00.A.',
    presets:[
      ['EUR/USD reference rate (daily)','EXR','D.USD.EUR.SP00.A'],
      ['EUR/GBP reference rate (daily)','EXR','D.GBP.EUR.SP00.A'],
      ['EUR/SEK reference rate (daily)','EXR','D.SEK.EUR.SP00.A'],
      ['EUR/NOK reference rate (daily)','EXR','D.NOK.EUR.SP00.A'],
      ['EUR/CHF reference rate (daily)','EXR','D.CHF.EUR.SP00.A'],
      ['Deposit facility rate','FM','D.U2.EUR.4F.KR.DFR.LEV'],
      ['€STR','EST','B.EU000A2X2A25.WT'],
      ['HICP, euro area, % y/y','ICP','M.U2.N.000000.4.ANR'],
      ['Core HICP (ex energy, food, alcohol, tobacco), % y/y','ICP','M.U2.N.XEF000.4.ANR']
    ]},
  bbk: { label:'Bundesbank', kind:'sdmx', base:'https://api.statistiken.bundesbank.de/rest/data', fmt:'', extra:'',
    headers:{ Accept:'application/vnd.sdmx.data+json;version=1.0.0' },
    help:'Flow and key from the Bundesbank time series database, e.g. BBEX3 and D.USD.EUR.BB.AC.000 (series code BBEX3.D.USD.EUR.BB.AC.000 with the first dot as the split).',
    presets:[
      ['10-year Bund yield (daily)','BBSIS','D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A'],
      ['EUR/USD reference rate (daily)','BBEX3','D.USD.EUR.BB.AC.000'],
      ['German HICP, % y/y (monthly)','BBDP1','M.DE.N.HVPI.C.A00000.VGJ.LV']
    ]},
  nb: { label:'Norges Bank', kind:'sdmx', base:'https://data.norges-bank.no/api/data', fmt:'sdmx-json', extra:'&locale=en',
    help:'Flow and key from data.norges-bank.no, e.g. EXR and B.EUR.NOK.SP.',
    presets:[
      ['EUR/NOK (daily)','EXR','B.EUR.NOK.SP'],
      ['USD/NOK (daily)','EXR','B.USD.NOK.SP'],
      ['SEK/NOK, per 100 SEK (daily)','EXR','B.SEK.NOK.SP'],
      ['Policy rate','IR','B.KPRA.SD.R']
    ]},
  rb: { label:'Riksbank', kind:'swea', base:'https://api.riksbank.se/swea/v1',
    presets:[
      ['Policy rate','SECBREPOEFF'],
      ['Deposit rate','SECBDEPOEFF'],
      ['Lending rate','SECBLENDEFF'],
      ['EUR/SEK (SEK per EUR)','SEKEURPMI'],
      ['USD/SEK (SEK per USD)','SEKUSDPMI'],
      ['NOK/SEK (SEK per NOK)','SEKNOKPMI'],
      ['GBP/SEK (SEK per GBP)','SEKGBPPMI'],
      ['STIBOR 3 months','SEDP3MSTIBORDELAYC']
    ]},
  nbp: { label:'NBP (Poland)', kind:'nbp', base:'https://api.nbp.pl/api',
    presets:[['EUR/PLN','EUR'],['USD/PLN','USD'],['CHF/PLN','CHF'],['GBP/PLN','GBP'],['NOK/PLN','NOK'],['SEK/PLN','SEK'],['Gold, PLN per gram','GOLD']]},
  ssb: { label:'Statistics Norway (SSB)', kind:'px', bases:['https://data.ssb.no/api/pxwebapi/v2'],
    presets:[['CPI','03013'],['CPI-ATE (core)','05327'],['National accounts, quarterly','09190'],['Labour force survey, seasonally adjusted','13760']],
    searches:['consumer price index','gross domestic product','unemployment','house prices','retail trade']},
  scb: { label:'Statistics Sweden (SCB)', kind:'px', bases:['https://statistikdatabasen.scb.se/api/v2','https://api.scb.se/OV0104/v2beta/api/v2'],
    presets:[], searches:['CPIF','consumer price index','GDP','unemployment','household consumption']},
  gus: { label:'Statistics Poland (GUS)', kind:'gus', bases:['https://api-dbw.stat.gov.pl/api','https://api-dbw.stat.gov.pl/api/1.0.0'],
    searches:['consumer price index','gross domestic product','unemployment rate','average gross wages','industrial production']},
  estat: { label:'Eurostat', kind:'estat', base:'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data',
    presets:[
      ['HICP inflation, % y/y: NL, NO, SE, EA','prc_hicp_minr','geo=NL,NO,SE,EA&unit=RCH_A'],
      ['GDP, % q/q: NL, SE, NO, DE','namq_10_gdp','geo=NL,SE,NO,DE&unit=CLV_PCH_PRE&na_item=B1GQ&s_adj=SCA'],
      ['GDP, % y/y: NL, SE, NO, DE','namq_10_gdp','geo=NL,SE,NO,DE&unit=CLV_PCH_SM&na_item=B1GQ&s_adj=SCA'],
      ['Unemployment rate: NL, SE, NO, EA','une_rt_m','geo=NL,SE,NO,EA20&unit=PC_ACT&s_adj=SA&age=TOTAL&sex=T']
    ]},
  snb: { label:'Swiss National Bank (SNB)', kind:'snb', base:'https://data.snb.ch/api/cube',
    presets:[
      ['SNB policy rate and SARON (daily)','snbgwdzid'],
      ['Exchange rates against CHF (monthly)','devkum'],
      ['Swiss consumer prices (CPI)','plkopr'],
      ['Money market rates (monthly)','zimoma'],
      ['Swiss Confederation bond yields','rendoblim']
    ]},
  ons: { label:'ONS (UK)', kind:'ons', base:'https://api.beta.ons.gov.uk/v1',
    presets:[
      ['CPI, % y/y','D7G7','/economy/inflationandpriceindices/timeseries/d7g7/mm23'],
      ['CPIH, % y/y','L55O','/economy/inflationandpriceindices/timeseries/l55o/mm23'],
      ['Core CPI, % y/y','DKO8','/economy/inflationandpriceindices/timeseries/dko8/mm23'],
      ['Services CPI, % y/y','D7NN','/economy/inflationandpriceindices/timeseries/d7nn/mm23'],
      ['Unemployment rate, 16+','MGSX','/employmentandlabourmarket/peoplenotinwork/unemployment/timeseries/mgsx/lms'],
      ['GDP, % q/q','IHYQ','/economy/grossdomesticproductgdp/timeseries/ihyq/qna']
    ]}
};

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cache = new Map();
const CFG = window.MDL_CONFIG || {};
const CFG_MAP = { mkey:'mistralKey', magent:'mistralAgentId', mmodel:'mistralModel', akey:'anthropicKey', amodel:'anthropicModel', aiprov:'provider' };
const rbKey = () => store.get('rbkey','') || CFG.riksbankKey || '';
const gusKey = () => CFG.gusKey || '';
const store = {
  get(k, d){ try{ const v = localStorage.getItem('mdl.'+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('mdl.'+k, JSON.stringify(v)); }catch(e){} }
};
function yearsAgo(n){ const d=new Date(); d.setFullYear(d.getFullYear()-n); return d.toISOString().slice(0,10); }
const today = () => new Date().toISOString().slice(0,10);

function status(msg, type='info'){
  const el=$('#status');
  if(!msg){ el.className='status'; el.textContent=''; return; }
  el.className='status show '+type; el.textContent=msg;
}

async function getJSON(url, headers = {}){
  if(cache.has(url)) return cache.get(url);
  let r;
  try{ r = await fetch(url, {headers:{Accept:'application/json', ...headers}}); }
  catch(e){ throw new Error(`No response from ${new URL(url).host}. Either you’re offline, the network blocks it, or the API refuses browser requests (CORS). Open the request link below in a new tab to check.`); }
  if(r.status===429) throw new Error(`${new URL(url).host} says too many requests. Wait a minute and try again${url.includes('riksbank')?' (without a key the Riksbank allows 5 calls per minute)':''}.`);
  if(!r.ok){ let t=''; try{ t=(await r.text()).slice(0,200); }catch(e){} throw new Error(`HTTP ${r.status} from ${new URL(url).host}. ${t}`); }
  const j = await r.json();
  cache.set(url, j);
  return j;
}

function normDate(s){
  s = String(s).trim();
  let m;
  if((m=s.match(/^(\d{4})M(\d{2})$/))) return `${m[1]}-${m[2]}`;
  if((m=s.match(/^(\d{4})[KQ](\d)$/))) return `${m[1]}-Q${m[2]}`;
  if((m=s.match(/^(\d{4})-?Q(\d)$/))) return `${m[1]}-Q${m[2]}`;
  const mon={JAN:'01',FEB:'02',MAR:'03',APR:'04',MAY:'05',JUN:'06',JUL:'07',AUG:'08',SEP:'09',OCT:'10',NOV:'11',DEC:'12'};
  if((m=s.match(/^(\d{4}) ([A-Z]{3})$/)) && mon[m[2]]) return `${m[1]}-${mon[m[2]]}`;
  if((m=s.match(/^(\d{4}) (Q\d)$/))) return `${m[1]}-${m[2]}`;
  return s;
}
const num = v => (v===null || v===undefined || v==='' || v==='..' || v==='.') ? null : (isNaN(+v) ? null : +v);

function sdmxUrl(s, flow, key, start){
  const qs = [s.fmt ? `format=${s.fmt}` : '', start ? `startPeriod=${start}` : ''].filter(Boolean).join('&');
  return `${s.base}/${encodeURIComponent(flow)}/${key}?${qs}${s.extra}`;
}
/* ---------- Parsers ---------- */
function parseSdmx(j){
  const root = (j.data && j.data.dataSets) ? j.data : j;
  const st = root.structure, ds = root.dataSets[0];
  const obsVals = st.dimensions.observation[0].values.map(v => v.id || v.name);
  const sDims = st.dimensions.series || [];
  const varying = sDims.map(d => d.values.length > 1);
  const series = Object.entries(ds.series || {}).map(([k, s]) => {
    const idx = k.split(':').map(Number);
    let parts = sDims.map((d,i) => ({d, v:d.values[idx[i]], vary:varying[i]}));
    const pick = parts.filter(p => p.vary);
    const nameParts = (pick.length ? pick : parts.filter(p => !/freq/i.test(p.d.id)))
      .map(p => p.v && (p.v.name || p.v.id)).filter(Boolean);
    const points = Object.entries(s.observations || {})
      .map(([o, arr]) => [normDate(obsVals[+o]), num(arr[0])])
      .sort((a,b) => a[0] < b[0] ? -1 : 1);
    return { name: nameParts.join(', ') || 'Series', points };
  });
  return series;
}

function parseJsonStat(j, fallbackName){
  const ids = j.id, sizes = j.size;
  const timeId = (j.role && j.role.time && j.role.time[0]) || ids.find(d => /^(tid|time|period)$/i.test(d)) || ids[ids.length-1];
  const dims = ids.map(d => {
    const c = j.dimension[d].category || {};
    let codes;
    if(Array.isArray(c.index)) codes = c.index;
    else if(c.index) codes = Object.keys(c.index).sort((a,b) => c.index[a]-c.index[b]);
    else codes = Object.keys(c.label || {});
    return { id:d, codes, labels: codes.map(k => (c.label && c.label[k]) || k) };
  });
  const strides = new Array(ids.length).fill(1);
  for(let i = ids.length-2; i >= 0; i--) strides[i] = strides[i+1]*sizes[i+1];
  const total = sizes.reduce((a,b) => a*b, 1);
  const getV = Array.isArray(j.value) ? i => j.value[i] : i => (j.value || {})[i];
  const map = new Map();
  for(let n = 0; n < total; n++){
    let rem = n, key = [], t = null;
    dims.forEach((d,i) => {
      const pos = Math.floor(rem/strides[i]); rem -= pos*strides[i];
      if(d.id === timeId) t = d.codes[pos];
      else if(sizes[i] > 1) key.push(d.labels[pos]);
    });
    const k = key.join(', ') || fallbackName || j.label || 'Series';
    if(!map.has(k)) map.set(k, []);
    map.get(k).push([normDate(t), num(getV(n))]);
  }
  return [...map.entries()].map(([name, points]) => ({ name, points: points.sort((a,b) => a[0] < b[0] ? -1 : 1) }));
}

/* ---------- UI: tabs ---------- */
let current = store.get('tab', 'ecb');
const ICONS = { ecb:['€','ECB'], nb:['NOK','Norges Bank'], rb:['SEK','Riksbank'], ssb:['NO','SSB'], scb:['SE','SCB'], estat:['EU','Eurostat'], bbk:['DE','Bundesbank'], nbp:['PLN','NBP'], gus:['PL','GUS'], snb:['CHF','SNB'], ons:['GBP','ONS'], ai:['AI','Ask'] };
function renderTabs(){
  $('#tabs').innerHTML = Object.entries(SOURCES).map(([id,s]) =>
    `<button role="tab" aria-selected="${id===current}" data-id="${id}" title="${esc(s.label)}"><span class="dot">${esc(ICONS[id][0])}</span>${esc(ICONS[id][1])}</button>`).join('');
  $('#tabs').querySelectorAll('button').forEach(b => b.onclick = () => { current = b.dataset.id; store.set('tab', current); renderTabs(); renderForm(); status(); if($('#askscope')) $('#askscope').value = current; });
}

/* ---------- UI: forms ---------- */
function renderForm(prefill){
  const s = SOURCES[current];
  const f = $('#form');
  if(s.kind === 'sdmx'){
    f.innerHTML = `<h3>${esc(s.label)}</h3>
      <label for="preset">Preset</label>
      <select id="preset"><option value="">Choose a series…</option>${s.presets.map((p,i)=>`<option value="${i}">${esc(p[0])}</option>`).join('')}</select>
      <div class="row">
        <div><label for="flow">Dataset</label><input id="flow" placeholder="EXR"></div>
        <div style="flex:2"><label for="key">Series key</label><input id="key" placeholder="D.USD.EUR.SP00.A"></div>
      </div>
      <p class="hint">${esc(s.help)} Use + to combine values in a key position, e.g. D.USD+GBP.EUR.SP00.A.</p>
      <label for="start">Start date</label><input id="start" type="date" value="${yearsAgo(5)}">
      <button class="btn" id="go">Fetch data</button>`;
    $('#preset').onchange = e => { const p = s.presets[e.target.value]; if(p){ $('#flow').value = p[1]; $('#key').value = p[2]; } };
    if(prefill){ $('#flow').value = prefill.flow; $('#key').value = prefill.key; if(prefill.start) $('#start').value = prefill.start; }
    $('#go').onclick = runSdmx;
  }
  if(s.kind === 'swea'){
    f.innerHTML = `<h3>${esc(s.label)}</h3>
      <label for="preset">Preset</label>
      <select id="preset"><option value="">Choose a series…</option>${s.presets.map((p,i)=>`<option value="${i}">${esc(p[0])}</option>`).join('')}</select>
      <label for="sid">Series ID</label><input id="sid" list="rbseries" placeholder="SECBREPOEFF">
      <datalist id="rbseries"></datalist>
      <button class="btn secondary" id="browse" type="button">Load the full series list</button>
      <label for="start">Start date</label><input id="start" type="date" value="${yearsAgo(5)}">
      <label for="rbkey">API key (optional)</label><input id="rbkey" type="password" autocomplete="off" placeholder="Raises the limit from 5 to 200 calls a minute" value="${esc(store.get('rbkey',''))}">
      <p class="hint">Free key from developer.api.riksbank.se. It’s stored only in this browser.</p>
      <button class="btn" id="go">Fetch data</button>`;
    $('#preset').onchange = e => { const p = s.presets[e.target.value]; if(p) $('#sid').value = p[1]; };
    $('#rbkey').onchange = e => store.set('rbkey', e.target.value.trim());
    $('#browse').onclick = loadRiksbankList;
    if(prefill){ $('#sid').value = prefill.sid; if(prefill.start) $('#start').value = prefill.start; }
    $('#go').onclick = runRiksbank;
  }
  if(s.kind === 'px'){
    f.innerHTML = `<h3>${esc(s.label)}</h3>
      <label for="q">Search tables</label>
      <div class="row"><input id="q" placeholder="e.g. ${esc(s.searches[0])}"><button class="btn" id="search" style="flex:0 0 auto;margin-top:0">Search</button></div>
      <p class="hint">Try: ${s.searches.map(x=>`<a href="#" data-q="${esc(x)}">${esc(x)}</a>`).join(', ')}</p>
      <div id="searchResults"></div>
      ${s.presets.length ? `<label for="preset">Quick tables</label><select id="preset"><option value="">Choose a table…</option>${s.presets.map((p,i)=>`<option value="${i}">${esc(p[1])}: ${esc(p[0])}</option>`).join('')}</select>` : ''}
      <label for="tid">Table ID</label>
      <div class="row"><input id="tid" placeholder="${current==='ssb'?'03013':'TAB…'}"><button class="btn secondary" id="loadT" style="flex:0 0 auto;margin-top:0">Load table</button></div>
      <div id="dims"></div>`;
    $('#search').onclick = () => pxSearch($('#q').value);
    $('#q').onkeydown = e => { if(e.key==='Enter') pxSearch($('#q').value); };
    f.querySelectorAll('[data-q]').forEach(a => a.onclick = e => { e.preventDefault(); $('#q').value = a.dataset.q; pxSearch(a.dataset.q); });
    if($('#preset')) $('#preset').onchange = e => { const p = s.presets[e.target.value]; if(p){ $('#tid').value = p[1]; pxLoadTable(p[1]); } };
    $('#loadT').onclick = () => pxLoadTable($('#tid').value.trim());
    if(prefill){ $('#tid').value = prefill.tid; pxLoadTable(prefill.tid, prefill); }
  }
  if(s.kind === 'snb'){
    f.innerHTML = `<h3>${esc(s.label)}</h3>
      <label for="preset">Dataset</label>
      <select id="preset"><option value="">Choose a dataset…</option>${s.presets.map((p,i)=>`<option value="${i}">${esc(p[0])}</option>`).join('')}</select>
      <label for="cube">Cube ID</label><input id="cube" placeholder="snbgwdzid">
      <p class="hint">The ID is in the address of any table on data.snb.ch. Datasets with many lines (exchange rates, bond yields) can be narrowed below.</p>
      <label for="snbf">Only lines containing (optional)</label><input id="snbf" placeholder="e.g. EUR, USD or 10 years">
      <label for="start">Start date</label><input id="start" type="date" value="${yearsAgo(3)}">
      <button class="btn" id="go">Fetch data</button>`;
    $('#preset').onchange = e => { const p = s.presets[e.target.value]; if(p) $('#cube').value = p[1]; };
    if(prefill){ $('#cube').value = prefill.cube; $('#snbf').value = prefill.filter || ''; if(prefill.start) $('#start').value = prefill.start; }
    $('#go').onclick = () => {
      const cube = $('#cube').value.trim().toLowerCase(), start = $('#start').value, filter = $('#snbf').value.trim();
      if(!cube) return status('Enter a cube ID, or pick a dataset.', 'error');
      run(async () => { const r = await fetchSnb(cube, start, filter); r.fav = { src:'snb', label:r.title, params:{ cube, start, filter } }; return r; });
    };
  }
  if(s.kind === 'nbp'){
    f.innerHTML = `<h3>${esc(s.label)}</h3>
      <label for="preset">Currency</label>
      <select id="preset">${s.presets.map((p,i)=>`<option value="${esc(p[1])}">${esc(p[0])}</option>`).join('')}</select>
      <label for="ccy">Or any table A code</label><input id="ccy" placeholder="EUR" maxlength="4">
      <p class="hint">NBP mid rates, in PLN per unit of currency, published each business day.</p>
      <label for="start">Start date</label><input id="start" type="date" value="${yearsAgo(3)}">
      <button class="btn" id="go">Fetch data</button>`;
    if(prefill){ $('#ccy').value = prefill.currency; if(prefill.start) $('#start').value = prefill.start; }
    $('#go').onclick = () => {
      const currency = ($('#ccy').value.trim() || $('#preset').value).toUpperCase(), start = $('#start').value;
      run(async () => { const r = await fetchNbp(currency, start); r.fav = { src:'nbp', label:r.title, params:{ currency, start } }; return r; });
    };
  }
  if(s.kind === 'gus'){
    f.innerHTML = `<h3>${esc(s.label)}</h3>
      <label for="q">Search variables</label>
      <div class="row"><input id="q" placeholder="e.g. consumer price index"><button class="btn" id="search" style="flex:0 0 auto;margin-top:0">Search</button></div>
      <p class="hint">Try: ${s.searches.map(x=>`<a href="#" data-q="${esc(x)}">${esc(x)}</a>`).join(', ')}. The first search loads GUS’s variable list, which takes a moment and is then kept for a week.</p>
      <div id="searchResults"></div>
      <label for="start">From year</label><input id="start" type="number" value="${new Date().getFullYear()-1}">
      <p class="hint">Experimental. GUS serves one period per request (max 48 per lookup), with 100 requests per 15 minutes without a key.</p>`;
    const doSearch = async () => {
      const box = $('#searchResults');
      try{
        status('Loading the GUS variable list…');
        const hits = gusSearch(await gusCatalogue(), $('#q').value, 40);
        box.style.display = 'block';
        box.innerHTML = hits.length ? hits.map(h => `<button data-v="${esc(h.v)}" data-s="${esc(h.s)}">${esc(h.name)}<br><small>${esc(h.section)}</small></button>`).join('') : '<p class="hint" style="padding:8px">No variables found. Try other words, in English or Polish.</p>';
        box.querySelectorAll('button').forEach(b => b.onclick = () => {
          const spec = { source:'gus', variable:b.dataset.v, section:b.dataset.s, start:String($('#start').value) };
          run(async () => { const r = await fetchSpec(spec); r.fav = { src:'gus', label:r.title.slice(0,70), params:{ spec } }; return r; });
        });
        status();
      }catch(e){ status(e.message, 'error'); }
    };
    $('#search').onclick = doSearch;
    $('#q').onkeydown = e => { if(e.key === 'Enter') doSearch(); };
    f.querySelectorAll('[data-q]').forEach(a => a.onclick = e => { e.preventDefault(); $('#q').value = a.dataset.q; doSearch(); });
  }
  if(s.kind === 'estat'){
    f.innerHTML = `<h3>${esc(s.label)}</h3>
      <label for="preset">Preset</label>
      <select id="preset"><option value="">Choose a series…</option>${s.presets.map((p,i)=>`<option value="${i}">${esc(p[0])}</option>`).join('')}</select>
      <label for="eds">Dataset</label><input id="eds" placeholder="prc_hicp_minr">
      <label for="efl">Filters</label><input id="efl" placeholder="geo=NL,NO&unit=RCH_A">
      <p class="hint">Dimensions you leave out get a sensible default (all items, seasonally adjusted, total).</p>
      <label for="start">Start month</label><input id="start" type="month" value="${yearsAgo(5).slice(0,7)}">
      <button class="btn" id="go">Fetch data</button>`;
    $('#preset').onchange = e => { const p = s.presets[e.target.value]; if(p){ $('#eds').value = p[1]; $('#efl').value = p[2]; } };
    if(prefill){ $('#eds').value = prefill.dataset; $('#efl').value = prefill.filterText || ''; if(prefill.start) $('#start').value = prefill.start; }
    $('#go').onclick = () => {
      const filters = {};
      $('#efl').value.split('&').forEach(kv => { const [k,v] = kv.split('='); if(k && v) filters[k.trim()] = v.split(',').map(x=>x.trim()); });
      const spec = { source:'estat', dataset:$('#eds').value.trim(), filters, start:$('#start').value };
      if(!spec.dataset) return status('Enter a dataset code, or pick a preset.', 'error');
      run(async () => { const r = await fetchSpec(spec); r.fav = { src:'estat', label: r.title.slice(0,70), params:{ dataset:spec.dataset, filterText:$('#efl').value, start:spec.start } }; return r; });
    };
  }
  if(s.kind === 'ons'){
    f.innerHTML = `<h3>${esc(s.label)}</h3>
      <label for="preset">Preset</label>
      <select id="preset"><option value="">Choose a series…</option>${s.presets.map((p,i)=>`<option value="${i}">${esc(p[0])}</option>`).join('')}</select>
      <div class="row">
        <div><label for="cdid">Series ID (CDID)</label><input id="cdid" placeholder="D7G7"></div>
        <div><label for="dsid">Dataset (optional)</label><input id="dsid" placeholder="MM23"></div>
      </div>
      <p class="hint">The four-character ID shown on every ONS time series page.</p>
      <div class="row">
        <div><label for="freq">Frequency</label><select id="freq"><option value="auto">Highest available</option><option value="months">Monthly</option><option value="quarters">Quarterly</option><option value="years">Annual</option></select></div>
        <div><label for="sy">From year</label><input id="sy" type="number" value="${new Date().getFullYear()-5}"></div>
      </div>
      <button class="btn" id="go">Fetch data</button>`;
    $('#preset').onchange = e => { const p = s.presets[e.target.value]; if(p){ $('#cdid').value = p[1]; $('#dsid').value = p[2].split('/').pop().toUpperCase(); $('#cdid').dataset.uri = p[2]; } };
    $('#cdid').oninput = () => delete $('#cdid').dataset.uri;
    if(prefill){ $('#cdid').value = prefill.cdid; $('#dsid').value = prefill.dsid || ''; $('#freq').value = prefill.freq || 'auto'; if(prefill.sy) $('#sy').value = prefill.sy; }
    $('#go').onclick = runOns;
  }
}

/* ---------- Runners ---------- */
async function runSdmx(){
  const s = SOURCES[current], flow = $('#flow').value.trim(), key = $('#key').value.trim(), start = $('#start').value;
  if(!flow || !key) return status('Enter a dataset and a series key, or pick a preset.', 'error');
  const url = sdmxUrl(s, flow, key, start);
  await run(async () => {
    const series = parseSdmx(await getJSON(url, s.headers || {}));
    if(!series.length) throw new Error('The request worked but returned no series. Check the key.');
    const pre = s.presets.find(p => p[1]===flow && p[2]===key);
    return { title: pre ? pre[0] : `${flow} ${key}`, url, series, fav:{src:current, label:pre?pre[0]:`${flow} ${key}`, params:{flow,key,start}} };
  });
}

async function runRiksbank(){
  const s = SOURCES.rb, sid = $('#sid').value.trim().toUpperCase(), start = $('#start').value || yearsAgo(5);
  if(!sid) return status('Enter a series ID, or pick a preset.', 'error');
  const k = rbKey();
  const url = `${s.base}/Observations/${encodeURIComponent(sid)}/${start}/${today()}${k?`?subscription-key=${encodeURIComponent(k)}`:''}`;
  await run(async () => {
    const arr = await getJSON(url);
    const pre = s.presets.find(p => p[1]===sid);
    const points = (Array.isArray(arr)?arr:[]).map(o => [o.date.slice(0,10), num(o.value)]);
    if(!points.length) throw new Error('No observations for this series in the chosen period.');
    return { title: pre ? pre[0] : sid, url: url.replace(/subscription-key=[^&]+/, 'subscription-key=…'), series:[{name:sid, points}], fav:{src:'rb', label:pre?pre[0]:sid, params:{sid,start}} };
  });
}

async function loadRiksbankList(){
  const k = rbKey();
  try{
    status('Loading the Riksbank series list…');
    const list = await getJSON(`${SOURCES.rb.base}/Series${k?`?subscription-key=${encodeURIComponent(k)}`:''}`);
    $('#rbseries').innerHTML = list.map(x => `<option value="${esc(x.seriesId)}">${esc(x.shortDescription || x.midDescription || x.longDescription || '')}</option>`).join('');
    status(`${list.length} series loaded. Start typing in the series ID box to pick one.`);
  }catch(e){ status(e.message, 'error'); }
}

/* PxWeb v2 (SSB and SCB) */
let pxBase = {};
async function pxGet(path, src = current){
  const s = SOURCES[src];
  const bases = pxBase[src] ? [pxBase[src]] : s.bases;
  let last;
  for(const b of bases){
    try{ const j = await getJSON(b + path); pxBase[src] = b; return { j, url: b + path }; }
    catch(e){ last = e; }
  }
  throw last;
}

async function pxSearch(q){
  q = (q||'').trim(); if(!q) return;
  const box = $('#searchResults');
  try{
    status('Searching tables…');
    const { j } = await pxGet(`/tables?query=${encodeURIComponent(q)}&lang=en&pageSize=40`);
    const tables = j.tables || [];
    box.style.display = 'block';
    box.innerHTML = tables.length ? tables.map(t => `<button data-id="${esc(t.id)}">${esc(t.id)}: ${esc(t.label)}<br><small>${esc(t.firstPeriod||'')}${t.lastPeriod?' to '+esc(t.lastPeriod):''}${t.updated?', updated '+esc(String(t.updated).slice(0,10)):''}</small></button>`).join('') : '<p class="hint" style="padding:8px">No tables found. Try a broader term.</p>';
    box.querySelectorAll('button').forEach(b => b.onclick = () => { $('#tid').value = b.dataset.id; pxLoadTable(b.dataset.id); });
    status();
  }catch(e){ status(e.message, 'error'); }
}

let pxMeta = null;
async function pxLoadTable(tid, prefill){
  if(!tid) return status('Enter a table ID, or search for one.', 'error');
  try{
    status('Loading table details…');
    const { j } = await pxGet(`/tables/${encodeURIComponent(tid)}/metadata?lang=en`);
    pxMeta = { tid, j };
    const timeId = (j.role && j.role.time && j.role.time[0]) || j.id.find(d => /^(tid|time)$/i.test(d));
    const html = j.id.map(d => {
      const dim = j.dimension[d], c = dim.category || {};
      const codes = Array.isArray(c.index) ? c.index : Object.keys(c.index || c.label || {}).sort((a,b)=>(c.index?c.index[a]-c.index[b]:0));
      if(d === timeId){
        return `<label for="dim_time">${esc(dim.label)}: last how many periods</label>
          <input id="dim_time" type="number" min="1" value="${prefill && prefill.top || 60}" data-dim="${esc(d)}">
          <p class="hint">Available: ${esc(codes[0])} to ${esc(codes[codes.length-1])}</p>`;
      }
      const sel = prefill && prefill.sel && prefill.sel[d];
      const opts = codes.map((k,i) => `<option value="${esc(k)}" ${(sel ? sel.includes(k) : i===0) ? 'selected' : ''}>${esc((c.label&&c.label[k])||k)}</option>`).join('');
      return `<label>${esc(dim.label)} <small>(${codes.length})</small></label>
        <select multiple size="${Math.min(6, codes.length)}" data-dim="${esc(d)}">${opts}</select>`;
    }).join('');
    $('#dims').innerHTML = `<p class="hint" style="margin-top:14px"><strong>${esc(j.label || tid)}</strong></p>${html}
      <p class="hint">Ctrl or Cmd-click to select several values. Each combination becomes its own line.</p>
      <button class="btn" id="go">Fetch data</button>`;
    $('#go').onclick = pxRun;
    status();
    if(prefill) pxRun();
  }catch(e){ status(e.message, 'error'); }
}

async function pxRun(){
  if(!pxMeta) return;
  const { tid, j } = pxMeta;
  const params = [`lang=en`, `outputFormat=json-stat2`];
  const sel = {};
  document.querySelectorAll('#dims select[data-dim]').forEach(s => {
    const v = [...s.selectedOptions].map(o => o.value);
    if(!v.length) return;
    sel[s.dataset.dim] = v;
    params.push(`valueCodes[${encodeURIComponent(s.dataset.dim)}]=${v.map(encodeURIComponent).join(',')}`);
  });
  const t = $('#dim_time');
  const top = t ? Math.max(1, parseInt(t.value,10) || 60) : null;
  if(t) params.push(`valueCodes[${encodeURIComponent(t.dataset.dim)}]=top(${top})`);
  const path = `/tables/${encodeURIComponent(tid)}/data?${params.join('&')}`;
  await run(async () => {
    const { j: d, url } = await pxGet(path);
    const series = parseJsonStat(d, j.label);
    return { title: j.label || tid, url, series: series.slice(0, 24), note: series.length > 24 ? `Showing 24 of ${series.length} lines. Narrow the selection to see the rest.` : '',
      fav:{src:current, label:`${tid}: ${(j.label||'').slice(0,60)}`, params:{tid, sel, top}} };
  });
}

/* ONS */
async function runOns(){
  const s = SOURCES.ons, cdid = $('#cdid').value.trim().toUpperCase(), dsid = $('#dsid').value.trim().toUpperCase();
  const freqSel = $('#freq').value, sy = parseInt($('#sy').value,10) || 0;
  if(!cdid) return status('Enter a series ID (CDID), or pick a preset.', 'error');
  await run(async () => {
    let uri = $('#cdid').dataset.uri;
    if(!uri){
      const sr = await getJSON(`${s.base}/search?content_type=timeseries&cdids=${encodeURIComponent(cdid.toLowerCase())}&limit=20`);
      const items = sr.items || [];
      const hit = items.find(i => dsid && (i.uri||'').toUpperCase().endsWith('/'+dsid)) || items[0];
      if(!hit) throw new Error(`ONS has no time series with ID ${cdid}.`);
      uri = hit.uri;
    }
    const url = `${s.base}/data?uri=${encodeURIComponent(uri)}`;
    const j = await getJSON(url);
    const order = freqSel === 'auto' ? ['months','quarters','years'] : [freqSel];
    const f = order.find(k => (j[k]||[]).length);
    if(!f) throw new Error('This series has no data at the chosen frequency.');
    const points = j[f].map(o => [normDate(o.date), num(o.value)]).filter(p => parseInt(p[0],10) >= sy);
    const title = (j.description && j.description.title) || cdid;
    const unit = j.description && j.description.unit;
    return { title, url, series:[{name: cdid + (unit?` (${unit})`:''), points}],
      fav:{src:'ons', label:title.slice(0,70), params:{cdid, dsid: dsid || uri.split('/').pop().toUpperCase(), freq:freqSel, sy}} };
  });
}

/* ---------- Result rendering ---------- */
let chart = null, lastResult = null;
async function run(fn){
  const btn = $('#go'); if(btn) btn.disabled = true;
  status('Fetching…');
  try{ const res = await fn(); lastResult = res; renderResult(res); status(res.note || ''); }
  catch(e){ status(e.message, 'error'); }
  finally{ if(btn) btn.disabled = false; }
}

function mergeRows(series){
  const dates = [...new Set(series.flatMap(s => s.points.map(p => p[0])))].sort();
  const maps = series.map(s => new Map(s.points));
  return { dates, rows: dates.map(d => [d, ...maps.map(m => m.has(d) ? m.get(d) : null)]) };
}

const PALETTE = ['#2F5FE0','#7B3FF2','#C04CF0','#14A39A','#F2994A','#E0457B','#8E96A8','#1B3BB3'];
function updateHero(res, rows){
  let v = null, d = null;
  for(let i = rows.length-1; i >= 0; i--){ if(rows[i][1] !== null){ v = rows[i][1]; d = rows[i][0]; break; } }
  $('#heroLabel').textContent = `${res.sourceLabel || SOURCES[res.fav.src].label} · ${res.series.length > 1 ? res.series[0].name : res.title}`;
  $('#heroValue').textContent = v === null ? '–' : v.toLocaleString('en-GB',{maximumFractionDigits:4});
  $('#heroDate').textContent = d ? `Latest: ${d}` : 'No recent value';
}
function renderResult(res){
  const { dates, rows } = mergeRows(res.series);
  const last = rows.length ? rows[rows.length-1] : null;
  $('#output').innerHTML = `
    ${res.answer || res.plan ? `<div class="card answer">${res.answer ? res.answer.split(/\n+/).map(x=>`<p>${esc(x)}</p>`).join('') : ''}${res.plan ? `<ul class="plan">${res.plan.map(x=>`<li>${x}</li>`).join('')}</ul>` : ''}</div>` : ''}
    <div class="card">
      <h2 class="rtitle">${esc(res.title)}</h2>
      <p class="rmeta">${esc(res.sourceLabel || SOURCES[res.fav.src].label)}, ${dates.length} observations.${res.url ? ` <a href="${esc(res.url)}" target="_blank" rel="noopener">Open request</a>` : ''}</p>
      <div class="actions">
        <button class="btn" id="copy">Copy for Excel</button>
        <button class="btn secondary" id="csv">Download CSV</button>
        <button class="btn secondary" id="fav">Save to favourites</button>
      </div>
      <div class="chartbox"><canvas id="chart" aria-label="Chart of ${esc(res.title)}"></canvas></div>
    </div>
    <div class="card">
      <h3>Data</h3>
      <div class="tablewrap"><table><thead><tr><th>Date</th>${res.series.map(s=>`<th>${esc(s.name)}</th>`).join('')}</tr></thead>
      <tbody>${rows.slice().reverse().slice(0,1000).map(r => `<tr>${r.map((v,i) => `<td>${i===0 ? esc(v) : (v===null ? '' : v.toLocaleString('en-GB',{maximumFractionDigits:4}))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    </div>`;
  updateHero(res, rows);
  $('#copy').onclick = () => copyTSV(res, rows);
  $('#csv').onclick = () => downloadCSV(res, rows);
  $('#fav').onclick = () => addFav(res.fav);
  if(chart){ chart.destroy(); chart = null; }
  if(window.Chart){
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue('--muted').trim(), grid = css.getPropertyValue('--rule').trim();
    chart = new Chart($('#chart'), {
      type:'line',
      data:{ labels: dates, datasets: res.series.map((s,i) => ({ label:s.name, data: rows.map(r => r[i+1]), borderColor: PALETTE[i % PALETTE.length], backgroundColor: PALETTE[i % PALETTE.length], borderWidth:2, pointRadius:0, tension:.15, spanGaps:true, stepped: /policy|deposit facility|lending rate|deposit rate/i.test(res.title) ? 'before' : false })) },
      options:{ responsive:true, maintainAspectRatio:false, animation:false, interaction:{mode:'index', intersect:false},
        plugins:{ legend:{ display: res.series.length > 1, labels:{color:ink, boxWidth:12} } },
        scales:{ x:{ ticks:{color:ink, maxTicksLimit:10, maxRotation:0}, grid:{display:false} }, y:{ ticks:{color:ink}, grid:{color:grid} } } }
    });
  } else {
    $('.chartbox').innerHTML = '<p class="hint">The chart library didn’t load, so only the table is shown. Check your internet connection.</p>';
    $('.chartbox').style.height = 'auto';
  }
}

function copyTSV(res, rows){
  const txt = [['Date', ...res.series.map(s => s.name)].join('\t'), ...rows.map(r => r.map(v => v===null ? '' : v).join('\t'))].join('\n');
  const done = () => status('Copied. Paste into Excel.');
  if(navigator.clipboard) navigator.clipboard.writeText(txt).then(done, () => fallbackCopy(txt, done));
  else fallbackCopy(txt, done);
}
function fallbackCopy(txt, done){
  const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); done(); }catch(e){ status('Copy failed. Use Download CSV instead.', 'error'); }
  ta.remove();
}
function downloadCSV(res, rows){
  const q = s => `"${String(s).replace(/"/g,'""')}"`;
  const csv = [['Date', ...res.series.map(s => s.name)].map(q).join(','), ...rows.map(r => r.map((v,i) => i===0 ? v : (v===null?'':v)).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], {type:'text/csv'}));
  a.download = (res.title || 'data').replace(/[^\w\-]+/g,'_').slice(0,60) + '.csv';
  a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ---------- Favourites ---------- */
function addFav(f){
  const favs = store.get('favs', []);
  if(!favs.some(x => JSON.stringify(x) === JSON.stringify(f))){ favs.push(f); store.set('favs', favs); }
  renderFavs(); status('Saved to favourites.');
}
function renderFavs(){
  const favs = store.get('favs', []);
  $('#favs').innerHTML = `<h3>Favourites</h3>` + (favs.length
    ? `<div class="chips">${favs.map((f,i) => `<span class="chip"><button data-i="${i}" class="open">${esc((ICONS[f.src]||['','Ask'])[1])}: ${esc(f.label)}</button><button data-i="${i}" class="del" aria-label="Remove ${esc(f.label)}">×</button></span>`).join('')}</div>`
    : `<p class="hint">Fetch a series and save it here for one-click access.</p>`);
  $('#favs').querySelectorAll('.open').forEach(b => b.onclick = () => openFav(favs[b.dataset.i]));
  $('#favs').querySelectorAll('.del').forEach(b => b.onclick = () => { favs.splice(b.dataset.i,1); store.set('favs', favs); renderFavs(); });
}
function openFav(f){
  if(f.src === 'ai'){ $('#askq').value = f.params.q; $('#askscope').value = f.params.scope || 'auto'; return runAsk(); }
  current = f.src; store.set('tab', current); renderTabs(); renderForm(f.params);
  const k = SOURCES[current].kind;
  if(k === 'sdmx') runSdmx(); else if(k === 'swea') runRiksbank(); else if(k === 'ons') runOns(); else if(k === 'estat') $('#go').click(); else if(k === 'nbp' || k === 'snb') $('#go').click(); else if(k === 'gus') run(async () => { const r = await fetchSpec(f.params.spec); r.fav = f; return r; });
}


/* ---------- Spec-based fetching (used by Eurostat and the AI) ---------- */
const DEFAULT_CODES = ['TOTAL','CP00','T','SA','SCA','PC_ACT','RCH_A','CLV_PCH_PRE','B1GQ','00','0','ALL','TOT'];
function pickCodes(codes, wanted){
  const w = (wanted || []).map(String).filter(c => codes.includes(c));
  if(w.length) return w;
  return [DEFAULT_CODES.find(c => codes.includes(c)) || codes[0]];
}
function periodFrom(start, freqCodeSample){
  const y = (start || yearsAgo(5)).slice(0,4), m = (start || '').slice(5,7) || '01';
  if(/Q\d$/.test(freqCodeSample)) return `${y}-Q${Math.ceil(+m/3)}`;
  if(/^\d{4}$/.test(freqCodeSample)) return y;
  return `${y}-${m}`;
}
const catCodes = c => Array.isArray(c.index) ? c.index : Object.keys(c.index || c.label || {}).sort((a,b) => c.index ? c.index[a]-c.index[b] : 0);

async function fetchSpec(spec){
  const src = spec.source;
  const label = spec.label;
  const rename = (series) => series.map(s => ({ ...s, name: label ? (series.length > 1 ? `${label}: ${s.name}` : label) : s.name }));
  if(src === 'ecb' || src === 'nb' || src === 'bbk'){
    const s = SOURCES[src], start = spec.start ? (spec.start.length === 7 ? spec.start + '-01' : spec.start) : yearsAgo(5);
    const url = sdmxUrl(s, spec.flow, spec.key, start);
    return { title: label || `${spec.flow} ${spec.key}`, url, used:`${s.label} ${spec.flow}/${spec.key}`, series: rename(parseSdmx(await getJSON(url, s.headers || {}))) };
  }
  if(src === 'rb'){
    const k = rbKey(), start = spec.start ? (spec.start.length === 7 ? spec.start + '-01' : spec.start) : yearsAgo(5);
    const url = `${SOURCES.rb.base}/Observations/${encodeURIComponent(spec.series)}/${start}/${today()}${k?`?subscription-key=${encodeURIComponent(k)}`:''}`;
    const arr = await getJSON(url);
    return { title: label || spec.series, url: url.replace(/subscription-key=[^&]+/,'subscription-key=…'), used:`Riksbank ${spec.series}`, series: rename([{ name: spec.series, points: arr.map(o => [o.date.slice(0,10), num(o.value)]) }]) };
  }
  if(src === 'ons'){
    const sr = await getJSON(`${SOURCES.ons.base}/search?content_type=timeseries&cdids=${encodeURIComponent(spec.cdid.toLowerCase())}&limit=20`);
    const hit = (sr.items || [])[0];
    if(!hit) throw new Error(`ONS has no time series with ID ${spec.cdid}.`);
    const url = `${SOURCES.ons.base}/data?uri=${encodeURIComponent(hit.uri)}`;
    const j = await getJSON(url);
    const f = ['months','quarters','years'].find(k => (j[k]||[]).length);
    const sy = parseInt((spec.start || yearsAgo(5)).slice(0,4), 10);
    const points = j[f].map(o => [normDate(o.date), num(o.value)]).filter(p => parseInt(p[0],10) >= sy);
    return { title: label || j.description.title, url, used:`ONS ${spec.cdid}`, series: rename([{ name: spec.cdid, points }]) };
  }
  if(src === 'estat'){
    const base = `${SOURCES.estat.base}/${encodeURIComponent(spec.dataset)}?format=JSON&lang=en`;
    const filters = spec.filters || {};
    const geoQ = (filters.geo || []).map(g => `&geo=${encodeURIComponent(g)}`).join('');
    // Step 1: discover which codes this dataset has (one period only, small response)
    const meta = await getJSON(base + geoQ + '&lastTimePeriod=1');
    const timeId = (meta.role && meta.role.time && meta.role.time[0]) || 'time';
    let q = geoQ, usedParts = [];
    for(const d of meta.id){
      if(d === timeId || d === 'geo') continue;
      const codes = catCodes(meta.dimension[d].category);
      let pick;
      if(d === 'freq') pick = (filters.freq && filters.freq.filter(c => codes.includes(c)).length) ? filters.freq.filter(c => codes.includes(c)) : [['M','Q','A'].find(c => codes.includes(c)) || codes[0]];
      else pick = pickCodes(codes, filters[d]);
      if(codes.length > 1 || filters[d]) { q += pick.map(c => `&${d}=${encodeURIComponent(c)}`).join(''); usedParts.push(`${d}=${pick.join(',')}`); }
    }
    const tSample = catCodes(meta.dimension[timeId].category)[0] || '';
    const url = `${base}${q}&sinceTimePeriod=${periodFrom(spec.start, tSample)}`;
    const j = await getJSON(url);
    return { title: label || j.label || spec.dataset, url, used:`Eurostat ${spec.dataset}: ${usedParts.join(', ')}`, series: rename(parseJsonStat(j, j.label)).slice(0,24) };
  }
  if(src === 'ssb' || src === 'scb'){
    const { j: meta } = await pxGet(`/tables/${encodeURIComponent(spec.table)}/metadata?lang=en`, src);
    const timeId = (meta.role && meta.role.time && meta.role.time[0]) || meta.id.find(d => /^(tid|time)$/i.test(d));
    const params = ['lang=en','outputFormat=json-stat2'], used = [];
    for(const d of meta.id){
      const codes = catCodes(meta.dimension[d].category);
      if(d === timeId){
        const startN = normDate(periodFrom(spec.start, normDate(codes[0])));
        const first = codes.find(c => normDate(c) >= startN) || codes[Math.max(0, codes.length-60)];
        params.push(`valueCodes[${encodeURIComponent(d)}]=from(${encodeURIComponent(first)})`);
        continue;
      }
      const pick = pickCodes(codes, (spec.selection || {})[d]);
      params.push(`valueCodes[${encodeURIComponent(d)}]=${pick.map(encodeURIComponent).join(',')}`);
      used.push(`${d}=${pick.join(',')}`);
    }
    const { j, url } = await pxGet(`/tables/${encodeURIComponent(spec.table)}/data?${params.join('&')}`, src);
    return { title: label || meta.label, url, used:`${SOURCES[src].label} table ${spec.table}: ${used.join(', ')}`, series: rename(parseJsonStat(j, meta.label)).slice(0,24) };
  }
  if(src === 'nbp'){
    const r = await fetchNbp(String(spec.currency || 'EUR').toUpperCase(), spec.start);
    return { ...r, title: label || r.title, series: rename(r.series) };
  }
  if(src === 'snb'){
    const r = await fetchSnb(String(spec.cube || '').toLowerCase(), spec.start, spec.filter);
    return { ...r, title: label || r.title, series: rename(r.series) };
  }
  if(src === 'gus'){
    const r = await fetchGus(spec);
    return { ...r, title: label || r.title, series: rename(r.series) };
  }
  throw new Error(`Unknown source “${src}”.`);
}

/* ---------- SNB (Swiss National Bank) data portal ----------
   data.snb.ch sends no CORS headers, so browsers block direct calls. Set snbProxy in config.js
   (snb-proxy.php on a PHP host, or run "node serve.js" locally). */
async function fetchSnb(cube, start, filter){
  if(!/^[a-z0-9_]+$/.test(cube)) throw new Error('Cube IDs only contain letters, digits and underscores.');
  start = start ? start.slice(0,7) : yearsAgo(3).slice(0,7);
  const path = `/${cube}/data/json/en?fromDate=${start}`;
  const proxy = CFG.snbProxy;
  const url = proxy ? `${proxy}?p=${encodeURIComponent(path)}` : SOURCES.snb.base + path;
  let j;
  try{ j = await getJSON(url); }
  catch(e){
    if(!proxy && /No response from/.test(e.message)) throw new Error('The SNB data portal refuses direct browser requests (no CORS). Start the page with “node serve.js” in this folder, or host snb-proxy.php and set snbProxy in config.js.');
    throw e;
  }
  const f = (filter || '').toLowerCase();
  let series = (j.timeseries || []).map(t => {
    const name = (t.header || []).map(h => h.dimItem).join(' · ') || cube;
    const unit = t.metadata && t.metadata.unit;
    return { name: name + (unit && !/^none$/i.test(unit) ? ` (${unit})` : ''), points: (t.values || []).filter(v => v.value !== null && v.value !== undefined).map(v => [normDate(v.date), num(v.value)]) };
  }).filter(s => s.points.length);
  if(f) series = series.filter(s => s.name.toLowerCase().includes(f));
  if(!series.length) throw new Error(f ? `No lines contain “${filter}”. Clear the filter to see everything.` : 'SNB returned no data for this cube and period. Check the cube ID.');
  const pre = SOURCES.snb.presets.find(p => p[1] === cube);
  const note = series.length > 24 ? `Showing 24 of ${series.length} lines. Use “Only lines containing” to narrow it.` : '';
  return { title: pre ? pre[0] : `SNB ${cube}`, url, note, used:`SNB cube ${cube}${f ? `, lines containing “${filter}”` : ''}`, series: series.slice(0,24) };
}

/* ---------- NBP (National Bank of Poland): FX mid rates, table A, and gold ---------- */
function addDays(iso, n){ const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0,10); }
async function fetchNbp(code, start){
  start = start ? (start.length === 7 ? start + '-01' : start) : yearsAgo(3);
  const gold = code === 'GOLD', step = gold ? 360 : 90, end = today();
  let points = [], from = start, firstUrl = '';
  while(from <= end){
    const to = addDays(from, step) < end ? addDays(from, step) : end;
    const url = gold ? `${SOURCES.nbp.base}/cenyzlota/${from}/${to}/?format=json` : `${SOURCES.nbp.base}/exchangerates/rates/A/${code}/${from}/${to}/?format=json`;
    firstUrl = firstUrl || url;
    try{
      const j = await getJSON(url);
      if(gold) points = points.concat(j.map(o => [o.data, num(o.cena)]));
      else points = points.concat((j.rates || []).map(o => [o.effectiveDate, num(o.mid)]));
    }catch(e){ if(!/HTTP 404/.test(e.message)) throw e; }   // 404 = no quotes in that window
    from = addDays(to, 1);
  }
  if(!points.length) throw new Error(`NBP returned no data for ${code}. Check the currency code (table A).`);
  return { title: gold ? 'Gold, PLN per gram (NBP)' : `${code}/PLN, NBP mid rate`, url: firstUrl, used:`NBP table A ${code}`, series:[{ name: gold ? 'Gold PLN/g' : `${code}/PLN`, points }] };
}

/* ---------- GUS DBW (Statistics Poland knowledge databases), experimental ----------
   The response format is detected at run time rather than hard-coded, because field names are Polish and may change. */
let gusBase = null, gusCat = null, gusPer = null;
async function gusGet(path){
  if(CFG.gusProxy){ const url = CFG.gusProxy + '?p=' + encodeURIComponent(path); return { j: await getJSON(url), url }; }
  const h = gusKey() ? { 'X-ClientId': gusKey() } : {};
  const bases = gusBase ? [gusBase] : SOURCES.gus.bases;
  let last;
  for(const b of bases){ try{ const j = await getJSON(b + path, h); gusBase = b; return { j, url: b + path }; }catch(e){ last = e; } }
  throw last;
}
const arrOf = j => Array.isArray(j) ? j : (Object.values(j || {}).find(v => Array.isArray(v) && v.length && typeof v[0] === 'object') || []);
const findKey = (row, res) => { const ks = Object.keys(row || {}); for(const re of res){ const k = ks.find(x => re.test(x)); if(k) return k; } return null; };
async function gusCatalogue(){
  if(gusCat) return gusCat;
  const saved = store.get('gusCat', null);
  if(saved && saved.date && (Date.now() - saved.date) < 7*864e5){ gusCat = saved.rows; return gusCat; }
  let rows = [];
  for(let page = 0; page < 8; page++){
    const { j } = await gusGet(`/variable/variable-section-periods?ile-na-stronie=5000&numer-strony=${page}&lang=en`);
    const a = arrOf(j); rows = rows.concat(a);
    if(a.length < 5000) break;
  }
  if(!rows.length) throw new Error('GUS returned an empty variable list.');
  const r0 = rows[0];
  const K = { v: findKey(r0,[/^id[-_]?zmienn/i,/variable[-_]?id/i]), vn: findKey(r0,[/nazwa[-_]?zmienn/i,/variable[-_]?name/i]),
              s: findKey(r0,[/^id[-_]?przekr/i,/section[-_]?id/i]), sn: findKey(r0,[/nazwa[-_]?przekr/i,/section[-_]?name/i]),
              p: findKey(r0,[/^id[-_]?okres/i,/period[-_]?id/i]) };
  if(!K.v || !K.s) throw new Error('GUS changed its response format; the variable list could not be read.');
  const groups = new Map();
  for(const r of rows){
    const id = `${r[K.v]}|${r[K.s]}`;
    if(!groups.has(id)) groups.set(id, { v:String(r[K.v]), s:String(r[K.s]), name:String(r[K.vn] || ''), section:String(r[K.sn] || ''), periods:new Set() });
    if(K.p && r[K.p] != null) groups.get(id).periods.add(String(r[K.p]));
  }
  gusCat = [...groups.values()].map(g => ({ ...g, periods:[...g.periods] }));
  store.set('gusCat', { date: Date.now(), rows: gusCat });
  return gusCat;
}
async function gusPeriods(){
  if(gusPer) return gusPer;
  const { j } = await gusGet('/dictionaries/periods-dictionary?page=1&page-size=5000&lang=en');
  const a = arrOf(j), k = a[0] ? { id: findKey(a[0],[/^id[-_]?okres/i,/^id$/i,/period[-_]?id/i]), n: findKey(a[0],[/nazwa/i,/name/i,/opis/i,/symbol/i]) } : {};
  gusPer = new Map(a.map(o => [String(o[k.id]), String(o[k.n] || '')]));
  return gusPer;
}
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const MONTHS_PL = ['stycz','lut','mar','kwie','maj','czerw','lip','sierp','wrze','październ','listopad','grud'];
function gusPeriodInfo(name){
  const n = (name || '').toLowerCase();
  let m = MONTHS.findIndex(x => n.includes(x)); if(m < 0) m = MONTHS_PL.findIndex(x => n.includes(x));
  if(m >= 0) return { kind:'M', idx:m+1 };
  const q = n.match(/\b(i{1,3}|iv|[1-4])\b.*(quarter|kwarta)|(quarter|kwarta).*\b(i{1,3}|iv|[1-4])\b/);
  if(q){ const t = (q[1] || q[4]); const r = {i:1,ii:2,iii:3,iv:4}[t] || +t; return { kind:'Q', idx:r }; }
  if(/year|rok|annual/.test(n)) return { kind:'A', idx:0 };
  return { kind:'?', idx:0, label:name };
}
function gusSearch(cat, text, limit = 30){
  const toks = String(text).toLowerCase().split(/[^a-z0-9ąćęłńóśźż]+/).filter(t => t.length > 2);
  return cat.map(g => { const hay = (g.name + ' ' + g.section).toLowerCase(); return { g, sc: toks.reduce((a,t) => a + (hay.includes(t) ? 1 : 0), 0) }; })
    .filter(x => x.sc > 0).sort((a,b) => b.sc - a.sc || a.g.name.length - b.g.name.length).slice(0, limit).map(x => x.g);
}
async function fetchGus(spec){
  const cat = await gusCatalogue();
  const g = cat.find(x => x.v === String(spec.variable) && x.s === String(spec.section));
  if(!g) throw new Error(`GUS variable ${spec.variable} with section ${spec.section} not found.`);
  const per = await gusPeriods();
  const infos = g.periods.map(p => ({ p, ...gusPeriodInfo(per.get(p)) }));
  const now = new Date(), y1 = now.getFullYear();
  let y0 = parseInt((spec.start || '').slice(0,4), 10) || (infos.some(i => i.kind === 'M') ? y1 - 1 : y1 - 4);
  let calls = [];
  for(let y = y1; y >= y0 && calls.length < 48; y--){
    for(const i of infos.slice().sort((a,b) => b.idx - a.idx)){
      if(y === y1 && i.kind === 'M' && i.idx > now.getMonth() + 1) continue;
      if(y === y1 && i.kind === 'Q' && i.idx > Math.ceil((now.getMonth()+1)/3)) continue;
      calls.push({ y, i });
      if(calls.length >= 48) break;
    }
  }
  const map = new Map(); let firstUrl = '', fails = 0;
  for(const [n, c] of calls.entries()){
    status(`Fetching GUS data ${n+1} of ${calls.length}…`);
    try{
      const { j, url } = await gusGet(`/variable/variable-data-section?id-zmienna=${g.v}&id-przekroj=${g.s}&id-rok=${c.y}&id-okres=${c.i.p}&ile-na-stronie=5000&numer-strony=0&lang=en`);
      firstUrl = firstUrl || url;
      const rows = arrOf(j);
      if(!rows.length) continue;
      const vk = findKey(rows[0],[/^wartosc$/i,/wartosc/i,/^value$/i,/value/i]);
      const dimKeys = Object.keys(rows[0]).filter(k => /nazwa[-_]?pozycj|pozycja|position[-_]?name|nazwa[-_]?wymiar/i.test(k));
      const date = c.i.kind === 'M' ? `${c.y}-${String(c.i.idx).padStart(2,'0')}` : c.i.kind === 'Q' ? `${c.y}-Q${c.i.idx}` : c.i.kind === 'A' ? `${c.y}` : `${c.y} ${c.i.label}`;
      for(const r of rows){
        const k = dimKeys.map(d => r[d]).filter(Boolean).join(', ') || g.name;
        if(!map.has(k)) map.set(k, []);
        let v = num(String(r[vk]).replace(',', '.'));
        if(v !== null && spec.transform === 'minus100') v = Math.round((v - 100) * 1000) / 1000;
        map.get(k).push([date, v]);
      }
      await new Promise(res => setTimeout(res, 220));   // stay under 5 calls per second
    }catch(e){ if(/too many/i.test(e.message)) throw e; fails++; }
  }
  if(!map.size) throw new Error(`GUS returned no data for “${g.name}”${fails ? ` (${fails} requests failed)` : ''}.`);
  const series = [...map.entries()].slice(0, 12).map(([name, points]) => ({ name, points: points.sort((a,b) => a[0] < b[0] ? -1 : 1) }));
  return { title: g.name, url: firstUrl, used:`GUS DBW variable ${g.v}, section ${g.s} (${g.section})${spec.transform === 'minus100' ? ', index minus 100' : ''}`, series };
}

async function resolveGusSpec(spec, q){
  if(spec.variable && spec.section) return spec;
  const cat = await gusCatalogue();
  const hits = gusSearch(cat, `${spec.search || ''} ${spec.want || ''}`, 30);
  if(!hits.length) throw new Error(`GUS found no variable for “${spec.search || spec.want}”.`);
  const ans = parseJSONLoose(await callAI(
    'Pick the single best Statistics Poland variable and section for the request. Prefer the national total (Poland, not regions) and the frequency the request needs. If the values are indices with the previous year = 100 and the request wants a % change, set "transform" to "minus100". Reply with JSON only: {"variable":"id","section":"id","transform":"" or "minus100"}.',
    `Request: ${q}\nMeasure wanted: ${spec.want || spec.label}\n${aiSettings().ailens === 'cb' ? `Analyst lens:\n${cbViewText()}\n` : ''}Candidates (variable id | section id | variable name | section):\n${hits.map(h => `${h.v} | ${h.s} | ${h.name} | ${h.section}`).join('\n')}`, true));
  return { ...spec, variable:String(ans.variable), section:String(ans.section), transform: ans.transform || spec.transform || '' };
}


/* ---------- Analyst lens: the measures central banks and FX analysts watch ----------
   Edit freely. The AI uses this list to choose the headline measure when a question is general
   ("GDP for Norway"), unless the question explicitly asks for something else ("total GDP"). */
const CB_VIEW = [
  { area:'Norway', bank:'Norges Bank', items:[
    'GDP: use GDP Mainland Norway, volume change q/q, seasonally adjusted (SSB 09190). Total GDP includes offshore oil and gas, pipeline transport and ocean shipping, is distorted by commodity volumes and field maintenance, and has no Bloomberg consensus. Mainland GDP is what Norges Bank uses to judge domestic capacity pressure. Only fetch total GDP if the user asks for it explicitly.',
    'Inflation: CPI-ATE (CPI adjusted for tax changes and excluding energy) % y/y is Norges Bank’s main underlying measure (SSB 05327); show headline CPI % y/y (SSB 03013) next to it.',
    'Labour market: unemployment rate, seasonally adjusted (SSB labour force survey 13760).',
    'Rates and FX: policy rate and EUR/NOK from Norges Bank.' ]},
  { area:'Sweden', bank:'Riksbank', items:[
    'Inflation: CPIF % y/y is the Riksbank’s target variable; show CPIF excluding energy % y/y next to it (SCB). Headline CPI only if asked.',
    'GDP: GDP volume change q/q, seasonally and calendar adjusted (SCB quarterly national accounts).',
    'Labour market: unemployment rate, seasonally adjusted (SCB labour force survey).',
    'Rates and FX: policy rate and EUR/SEK from the Riksbank.' ]},
  { area:'Euro area', bank:'ECB', items:[
    'Inflation: HICP % y/y plus core HICP excluding energy, food, alcohol and tobacco % y/y (ECB ICP).',
    'GDP: GDP volume % q/q, seasonally and calendar adjusted (Eurostat namq_10_gdp, geo EA20).',
    'Rates: deposit facility rate is the policy rate that matters; €STR for market rates.' ]},
  { area:'United Kingdom', bank:'Bank of England', items:[
    'Inflation: CPI % y/y plus services CPI % y/y (D7NN), the Bank of England’s key gauge of domestic inflation; core CPI (DKO8) as a third line if useful.',
    'GDP: GDP % q/q (IHYQ).',
    'Labour market: unemployment rate (MGSX).' ]},
  { area:'Poland', bank:'Narodowy Bank Polski (NBP)', items:[
    'Inflation: national CPI % y/y from GUS (the NBP targets CPI at 2.5% ±1 pp), not HICP. Core inflation is published by the NBP and is not in these sources; say so if asked.',
    'GDP: % y/y, not seasonally adjusted, is the headline Poland’s market trades (GUS flash and final). Use q/q seasonally adjusted only if asked.',
    'Activity and labour: industrial output % y/y, average gross wages in the enterprise sector % y/y, registered unemployment rate (GUS).',
    'FX: EUR/PLN from the NBP.' ]},
  { area:'Germany', bank:'ECB (via Bundesbank)', items:[
    'Inflation: HICP % y/y (Eurostat or Bundesbank); German national CPI only if asked.',
    'GDP: GDP volume % q/q, seasonally and calendar adjusted (Eurostat).',
    'Rates: 10-year Bund yield from the Bundesbank is the euro area benchmark.' ]},
  { area:'Other EU countries (e.g. Netherlands, Germany)', bank:'ECB (euro members)', items:[
    'Inflation: HICP % y/y, not the national CPI, because the ECB targets HICP. Core HICP if asked.',
    'GDP: GDP volume % q/q, seasonally and calendar adjusted (Eurostat).' ]}
];
function cbViewText(){
  return CB_VIEW.map(c => `${c.area} (${c.bank}):\n` + c.items.map(i => `  - ${i}`).join('\n')).join('\n');
}

/* ---------- AI ---------- */
const AI_FIELDS = { aiprov:'mistral', mkey:'', mmodel:'mistral-large-latest', magent:'', akey:'', amodel:'claude-sonnet-5-5', aisum:'yes', ailens:'cb' };
function aiSettings(){ const o = {}; for(const k in AI_FIELDS) o[k] = store.get('ai.'+k, '') || (CFG_MAP[k] && CFG[CFG_MAP[k]]) || AI_FIELDS[k]; return o; }
function initAI(){
  const s = aiSettings();
  for(const k in AI_FIELDS){ const el = $('#'+k); el.value = s[k]; el.onchange = () => { store.set('ai.'+k, el.value.trim()); showAIFields(); }; }
  showAIFields();
  $('#askscope').innerHTML = `<option value="auto">Best source (national first)</option><option value="national">National sources only (no Eurostat)</option><option value="nordic">Norway + Sweden (SSB, Norges Bank, SCB, Riksbank)</option>` + Object.entries(SOURCES).map(([id,s]) => `<option value="${id}">Only ${esc(s.label)}</option>`).join('');
  const ex = ['Give me GDP for Sweden','Compare Dutch CPI to Norway','EUR/SEK and EUR/NOK over the last 3 years','UK CPI vs core CPI since 2021','Unemployment in the Netherlands, Sweden and Norway','Riksbank vs Norges Bank policy rate'];
  $('#askex').innerHTML = ex.map(e => `<button class="chip" type="button">${esc(e)}</button>`).join('');
  $('#askex').querySelectorAll('button').forEach(b => b.onclick = () => { $('#askq').value = b.textContent; runAsk(); });
  $('#askgo').onclick = runAsk;
  $('#askq').onkeydown = e => { if(e.key === 'Enter') runAsk(); };
  $('#copyinstr').onclick = e => { e.preventDefault(); fallbackCopy(plannerPrompt(), () => status('Agent instructions copied. Paste them into your agent in Mistral’s console.')); };
}
function showAIFields(){
  const p = $('#aiprov').value;
  document.querySelectorAll('#aiset [data-for]').forEach(el => el.style.display = el.dataset.for.split(' ').includes(p) ? '' : 'none');
}

function scopeRule(scope){
  if(scope === 'national') return 'use only national statistics offices and central banks ("ssb","nb","scb","rb","gus","nbp","snb","ons","bbk","ecb"), never "estat".';
  if(scope === 'nordic') return 'use only "ssb" and "nb" for Norway and "scb" and "rb" for Sweden. Several of these sources may be used in one plan.';
  return `use only source "${scope}" (${SOURCES[scope].label}).`;
}
function plannerPrompt(){
  return `You turn questions about macroeconomic data into a JSON retrieval plan for a data tool. Today is ${today()}.
Reply with JSON only, no prose, in this shape:
{"title": "short chart title", "queries": [ ... ], "note": "one short sentence on assumptions, or empty"}
Every query has "label" (short series name, e.g. "Norway, Mainland GDP % q/q") and "start" (YYYY-MM; default five years before today unless the question says otherwise), plus one of the shapes below.

CHOOSING THE SOURCE
- A question about one country uses that country's own national source, never Eurostat:
  Norway: "ssb" for statistics (GDP, CPI, unemployment, etc.), "nb" for NOK exchange rates and the policy rate.
  Sweden: "scb" for statistics, "rb" for SEK exchange rates, the policy rate and STIBOR.
  Poland: "gus" for statistics, "nbp" for PLN exchange rates (PLN per unit) and gold.
  Germany: "bbk" (Bundesbank) for Bund yields and German series it covers; German HICP and GDP via "estat".
  Switzerland: "snb" for the policy rate, SARON, CHF exchange rates, bond yields and CPI.
  United Kingdom: "ons". Euro area aggregates and EUR exchange rates: "ecb".
  Countries without their own source here (e.g. Netherlands, France, Italy): "estat".
- ALWAYS prefer each country's own national sources, also when comparing countries, because Eurostat is published with a delay. A comparison of Norway and Sweden uses "ssb"/"nb" for Norway and "scb"/"rb" for Sweden, one query per country, never "estat". Mention in "note" if definitions differ between the national sources. Use "estat" only for a country that has no national source here, or when the user explicitly asks for Eurostat or for harmonised (HICP) comparisons.
- If the message contains a SOURCE RESTRICTION line, use only that source. If it can't answer, return {"title":"","queries":[],"note":"short explanation"}.

QUERY SHAPES
1. {"source":"ssb" or "scb","search":"short English search terms for the statistics table","want":"the exact measure in plain words, incl. frequency, unit and adjustment","table":"optional table ID, only if you are certain"}
   The tool searches the table and picks the exact codes itself. Hints for SSB: 09190 quarterly national accounts (GDP and GDP Mainland Norway; Mainland GDP is the usual headline), 03013 CPI, 05327 CPI-ATE, 13760 labour force survey seasonally adjusted. For SCB, use search terms (e.g. "GDP quarterly", "CPIF", "unemployment labour force survey").
1b. {"source":"gus","search":"short English search terms","want":"the exact measure in plain words"}  Statistics Poland. The tool finds the variable itself. Many GUS series are indices with the previous year = 100; the tool converts them to % when the request wants a change.
1c. {"source":"snb","cube":"snbgwdzid","filter":"optional text the line name must contain"}  Swiss National Bank. Cubes: snbgwdzid (SNB policy rate, SARON, daily), devkum (CHF exchange rates, monthly; filter e.g. "EUR 1" or "USD"), plkopr (Swiss CPI), zimoma (money market rates), rendoblim (Confederation bond yields).
1c. {"source":"nbp","currency":"EUR"}  NBP mid rate, PLN per unit; "GOLD" for gold in PLN per gram.
1d. {"source":"bbk","flow":"...","key":"..."}  Bundesbank: 10-year Bund yield BBSIS / D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A.
2. {"source":"estat","dataset":"...","filters":{"dimension":["code", ...]}}
   geo codes: NL, BE, DE, FR, IT, ES, AT, IE, FI, PT, GR, LU, SE, DK, NO, IS, CH, PL, CZ, HU, RO, BG, HR, SK, SI, EE, LV, LT, EA20, EU27_2020. Put several countries in one geo list.
   prc_hicp_minr = HICP monthly rates (unit RCH_A annual rate, RCH_M monthly rate).
   namq_10_gdp = quarterly GDP (unit CLV_PCH_PRE % q/q, CLV_PCH_SM % y/y; na_item B1GQ; s_adj SCA).
   une_rt_m = monthly unemployment rate (unit PC_ACT; s_adj SA; age TOTAL; sex T).
   Leave out dimensions you are unsure of; the tool fills sensible defaults.
3. {"source":"ecb","flow":"...","key":"..."}  EXR / D.{CUR}.EUR.SP00.A (CUR per EUR); deposit facility rate FM / D.U2.EUR.4F.KR.DFR.LEV; euro short-term rate EST / B.EU000A2X2A25.WT; euro-area-country HICP % y/y ICP / M.{CC}.N.000000.4.ANR.
4. {"source":"nb","flow":"...","key":"..."}  EXR / B.{CUR}.NOK.SP (NOK per unit); policy rate IR / B.KPRA.SD.R.
5. {"source":"rb","series":"..."}  SECBREPOEFF policy rate; SEK{CUR}PMI SEK per unit, e.g. SEKEURPMI; SEDP3MSTIBORDELAYC 3-month STIBOR.
6. {"source":"ons","cdid":"..."}  D7G7 CPI % y/y, L55O CPIH % y/y, DKO8 core CPI % y/y, D7NN services CPI % y/y, MGSX unemployment rate, IHYQ GDP % q/q, IHYR GDP % y/y.

Use at most 6 queries. "CPI" for a country with a national source means its national CPI; in a cross-country comparison it means HICP.
${aiSettings().ailens === 'cb' ? `
ANALYST LENS
The user is an FX strategist. Read general questions the way a central banker and FX analyst would: fetch the measure the central bank actually uses, in the form markets trade on (GDP as % q/q seasonally adjusted, inflation as % y/y, rates as levels). If the question explicitly names a different measure ("total GDP", "headline only", "index level"), follow the question. Mention in "note" which measure you chose and why, in a few words.
Preferred measures:
${cbViewText()}` : ''}`;
}

/* Resolve SSB/SCB tables and codes: search the table, then let the AI pick exact codes from the real metadata */
async function resolvePxSpec(spec, q){
  const src = spec.source;
  let table = spec.table, meta = null;
  if(table){ try{ meta = (await pxGet(`/tables/${encodeURIComponent(table)}/metadata?lang=en`, src)).j; }catch(e){ meta = null; } }
  if(!meta){
    const term = spec.search || spec.label || q;
    const { j } = await pxGet(`/tables?query=${encodeURIComponent(term)}&lang=en&pageSize=25`, src);
    const list = (j.tables || []).filter(t => !t.discontinued);
    if(!list.length) throw new Error(`${SOURCES[src].label} found no table for “${term}”.`);
    const pick = parseJSONLoose(await callAI(
      'Pick the single best statistics table for the request. Prefer tables that are still updated (recent last period) and match the requested frequency. Reply with JSON only: {"table":"id"}.',
      `Request: ${q}\nMeasure wanted: ${spec.want || spec.label}\n${aiSettings().ailens === 'cb' ? `Analyst lens (central bank preferred measures):\n${cbViewText()}\n` : ''}Tables (id | title | first to last period):\n${list.map(t => `${t.id} | ${t.label} | ${t.firstPeriod || ''} to ${t.lastPeriod || ''}`).join('\n')}`, true));
    table = String(pick.table || list[0].id);
    meta = (await pxGet(`/tables/${encodeURIComponent(table)}/metadata?lang=en`, src)).j;
  }
  const timeId = (meta.role && meta.role.time && meta.role.time[0]) || meta.id.find(d => /^(tid|time)$/i.test(d));
  const dims = meta.id.filter(d => d !== timeId).map(d => {
    const c = meta.dimension[d].category || {}, codes = catCodes(c);
    return { d, label: meta.dimension[d].label, codes, lines: codes.slice(0,120).map(k => `${k} = ${(c.label && c.label[k]) || k}`) };
  });
  let selection = {};
  const open = dims.filter(x => x.codes.length > 1);
  if(open.length){
    const ans = parseJSONLoose(await callAI(
      'You select codes from a statistics table so it returns exactly the measure requested. Use only codes listed. Pick one code per dimension unless the request needs several (for example several regions). Prefer seasonally adjusted and headline totals when the request does not say otherwise. Reply with JSON only: {"selection":{"dimension_id":["code"]}}.',
      `Request: ${q}\nMeasure wanted: ${spec.want || spec.label}\n${aiSettings().ailens === 'cb' ? `Analyst lens (central bank preferred measures):\n${cbViewText()}\n` : ''}Table ${table}: ${meta.label}\n\n` + open.map(x => `Dimension ${x.d} (${x.label}):\n${x.lines.join('\n')}`).join('\n\n'), true));
    selection = ans.selection || {};
  }
  return { ...spec, table, selection };
}

async function callAI(system, user, wantJSON){
  const s = aiSettings();
  if(s.aiprov === 'anthropic'){
    if(!s.akey) throw new Error('Add your Anthropic API key under AI settings.');
    const r = await fetch('https://api.anthropic.com/v1/messages', { method:'POST',
      headers:{ 'content-type':'application/json', 'x-api-key':s.akey, 'anthropic-version':'2023-06-01', 'anthropic-dangerous-direct-browser-access':'true' },
      body: JSON.stringify({ model:s.amodel, max_tokens:1500, system, messages:[{ role:'user', content:user }] }) });
    if(!r.ok) throw new Error(`Claude returned HTTP ${r.status}. ${(await r.text()).slice(0,200)}`);
    const j = await r.json();
    return j.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
  }
  if(!s.mkey) throw new Error('Add your Mistral API key under AI settings.');
  let url, body;
  if(s.aiprov === 'agent'){
    if(!s.magent) throw new Error('Add your Mistral agent ID under AI settings.');
    url = 'https://api.mistral.ai/v1/agents/completions';
    body = { agent_id:s.magent, messages:[{ role:'user', content:`${system}\n\n---\n${user}` }] };
  } else {
    url = 'https://api.mistral.ai/v1/chat/completions';
    body = { model:s.mmodel, temperature:0.1, messages:[{ role:'system', content:system }, { role:'user', content:user }] };
  }
  if(wantJSON) body.response_format = { type:'json_object' };
  const r = await fetch(url, { method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${s.mkey}` }, body: JSON.stringify(body) });
  if(!r.ok) throw new Error(`Mistral returned HTTP ${r.status}. ${(await r.text()).slice(0,200)}`);
  const j = await r.json();
  const c = j.choices[0].message.content;
  return Array.isArray(c) ? c.map(x => x.text || '').join('') : c;
}
function parseJSONLoose(t){
  t = String(t).replace(/```json|```/g, '').trim();
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  return JSON.parse(a >= 0 ? t.slice(a, b+1) : t);
}

async function runAsk(){
  const q = $('#askq').value.trim();
  if(!q) return status('Type a question first, for example “Give me GDP for Sweden”.', 'error');
  const btn = $('#askgo'); btn.disabled = true;
  try{
    status('Working out which data to fetch…');
    const scope = $('#askscope').value;
    const plan = parseJSONLoose(await callAI(plannerPrompt(), scope === 'auto' ? q : `${q}\n\nSOURCE RESTRICTION: ${scopeRule(scope)}`, true));
    if(!plan.queries || !plan.queries.length) throw new Error(plan.note || 'The AI couldn’t map this question to the available sources. Try rephrasing it.');
    let series = [], used = [], failed = [], firstUrl = '';
    for(let [i, spec] of plan.queries.slice(0,6).entries()){
      status(`Fetching ${i+1} of ${Math.min(6, plan.queries.length)}: ${spec.label || spec.source}…`);
      try{ if(spec.source === 'ssb' || spec.source === 'scb') spec = await resolvePxSpec(spec, q);
        if(spec.source === 'gus') spec = await resolveGusSpec(spec, q);
        const r = await fetchSpec(spec); series = series.concat(r.series); used.push(`${esc(r.used)} <a href="${esc(r.url)}" target="_blank" rel="noopener">request</a>`); firstUrl = firstUrl || r.url; }
      catch(e){ failed.push(`${esc(spec.label || spec.source)}: ${esc(e.message)}`); }
    }
    if(!series.length) throw new Error('None of the series could be fetched. ' + failed.join(' '));
    const res = { title: plan.title || q, sourceLabel:'Ask', url:'', series: series.slice(0,24),
      plan: [...used.map(u => `Used ${u}`), ...failed.map(f => `Failed ${f}`), ...(plan.note ? [esc(plan.note)] : [])],
      fav: { src:'ai', label: q.slice(0,70), params:{ q, scope } } };
    if(aiSettings().aisum === 'yes'){
      status('Writing a short answer…');
      const data = res.series.map(s => `${s.name}: ` + s.points.filter(p => p[1] !== null).slice(-13).map(p => `${p[0]} ${p[1]}`).join('; ')).join('\n');
      try{
        res.answer = await callAI(aiSettings().ailens === 'cb'
          ? 'You are a concise FX strategist. Answer in two to four sentences using only the data provided. Lead with the measure the central bank watches, quote the latest values with their dates and the direction of travel, and say in one clause why it matters for the central bank (capacity pressure, inflation persistence). Do not forecast, do not add numbers that are not in the data, and reply in the language of the question.'
          : 'You are a concise macro analyst. Answer the question in two to four sentences using only the data provided. Quote the latest values with their dates and note the direction of travel. Reply in the language of the question. Do not add numbers that are not in the data.', `Question: ${q}\n\nData (most recent observations):\n${data}`, false);
      }catch(e){ res.answer = `The data loaded, but the written answer failed: ${e.message}`; }
    }
    lastResult = res; renderResult(res);
    status(failed.length ? `Loaded ${series.length} series; ${failed.length} failed (details in the answer card).` : '');
  }catch(e){ status(e.message, 'error'); }
  finally{ btn.disabled = false; }
}

renderTabs(); renderForm(); renderFavs(); initAI();

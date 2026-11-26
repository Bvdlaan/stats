/* Copy this file to config.js and fill in what you need. config.js is git-ignored. */
window.MDL_CONFIG = {
  provider: '',          // 'mistral', 'agent' or 'anthropic'
  mistralKey: '',
  mistralModel: '',
  mistralAgentId: '',
  anthropicKey: '',
  anthropicModel: '',
  riksbankKey: '',
  snbProxy: 'snb-proxy.php',  // needed for SNB (node serve.js locally, snb-proxy.php when hosted)
  gusProxy: '',          // 'gus-proxy.php' when hosted, key then lives in a .env above the web root
  gusKey: ''             // GUS DBW key, only for local use
};

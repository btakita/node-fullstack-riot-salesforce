var domEnv = require('dom.env')
  , authorizeUrl = require('./salesforce.authorizeUrl')
  , logPrefix = 'salesforce/dom.login'
  ;
module.exports = function login(params, size) {
  console.info(logPrefix);
  var url = authorizeUrl(domEnv, Object.assign({}, domEnv.salesforce.oauthData, params))
    , size2 = size || {}
    , width = size2.width || 912
    , height = size2.height || 700
    , left = (screen.width / 2) - (width / 2)
    , top = (screen.height / 2) - (height / 2)
    ;
  localStorage.setItem('sf_oauth_url', url); // Mainly for testing purposes.
  // This is stubbed in tests
  return domEnv.popup(url, null, 'location=yes,toolbar=no,status=no,menubar=no,width='+width+',height='+height+',top='+top+',left='+left);
};

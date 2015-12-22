var domEnv = require('dom.env')
  , riot = domEnv.riot
  , SalesforceStore = require('./salesforce.store')
  , logPrefix = 'salesforce/dom.salesforce.mount'
  ;
module.exports = function(params, fn) {
  console.info(logPrefix, params);
  var salesforce = domEnv.salesforce = new SalesforceStore(domEnv, params.salesforce);
  domEnv.stores.addStore(salesforce);
  if (fn) fn(params);
  riot.mount('salesforce-login');
};

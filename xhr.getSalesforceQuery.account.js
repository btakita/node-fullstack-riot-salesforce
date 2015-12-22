var xhrGetSalesforceQuery = require('./xhr.getSalesforceQuery')
  , accountSelect = 'SELECT Id,Name,RecordTypeId,Website,TickerSymbol FROM Account'
  , logPrefix = 'salesforce/xhr.getSalesforceQuery.account'
  ;
function xhrGetSalesforceQueryAccount(env, conditions, fn) {
  console.log(logPrefix);
  var query = accountSelect+' WHERE '+conditions+' LIMIT 50';
  xhrGetSalesforceQuery(
    env,
    {query: query},
    env.salesforce.authorizationHeader(),
    xhrDone
  );
  function xhrDone(err, json) {
    if (err) {
      fn(err);
    } else {
      fn(null, json);
    }
  }
}
module.exports = xhrGetSalesforceQueryAccount;

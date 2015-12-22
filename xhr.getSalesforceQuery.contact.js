var xhrGetSalesforceQuery = require('./xhr.getSalesforceQuery')
  , contactSelect = 'SELECT Id,Name,FirstName,LastName,Title,Email,Phone,MobilePhone,Description,Contact.Account.Id,Contact.Account.Name,Contact.Account.Website,Contact.Account.TickerSymbol FROM Contact'
  , logPrefix = 'salesforce/xhr.getSalesforceQuery.contact'
  ;
function xhrGetSalesforceQueryContact(env, conditions, fn) {
  var query = contactSelect+' WHERE '+conditions+' LIMIT 50';
  console.trace(logPrefix, env.salesforce.authorizationHeader(), query);
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
module.exports = xhrGetSalesforceQueryContact;
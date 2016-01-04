var recordTypes;
module.exports = function(env) {
  if (!recordTypes) {
    load(env);
  }
  return recordTypes;
};
function load(env) {
  var Cell = env.Cell
    , xhrGetSalesforceQuery = require('./xhr.getSalesforceQuery')
    , query = 'SELECT Id,Name FROM RecordType'
    , isLoggedIn
    , logPrefix = 'salesforce/salesforce.recordTypes'
    ;
  recordTypes = Cell();
  recordTypes.remember = remember;
  recordTypes.forget = forget;
  function remember() {
    console.log(logPrefix+'|remember');
    isLoggedIn = env.salesforce.isLoggedIn;
    isLoggedIn.send(isLoggedInChange).on('change', isLoggedInChange);
    return recordTypes;
  }
  function isLoggedInChange(isLoggedIn2) {
    console.log(logPrefix+'|isLoggedInChange', isLoggedIn2);
    if (isLoggedIn2 && recordTypes() == null) {
      console.log(logPrefix+'|isLoggedInChange|2');
      xhrGetSalesforceQuery(
        env,
        {query: query},
        env.salesforce.authorizationHeader(),
        xhrGetSalesforceQueryDone
      );
    }
  }
  function xhrGetSalesforceQueryDone(err, json) {
    console.log(logPrefix+'|xhrGetSalesforceQueryDone');
    if (err) {
      console.log(logPrefix+'|xhrGetSalesforceQueryDone|err', err);
      env.page.statusError({text: 'Error querying Salesforce. Please re-connect to Salesforce.', log: err});
    } else {
      console.log(logPrefix+'|xhrGetSalesforceQueryDone|success', json);
      recordTypes(JSON.parse(json).records);
    }
  }
  function forget() {
    console.log(logPrefix+'|forget');
    if (isLoggedIn) isLoggedIn.off('change', isLoggedInChange);
  }
}
var logPrefix = 'salesforce/xhr.getSalesforceSearch';
function xhrGetSalesforceSearch(env, search, fn) {
  var XMLHttpRequest = env.xhr
    , xhrRequest = env.xhrRequest
    , xhr = new XMLHttpRequest()
    , url = env.salesforce.searchUrl({q: 'FIND{'+search+'}'})
    ;
  console.log(logPrefix, url);
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Authorization',  env.salesforce.authorizationHeader());
  xhr.setRequestHeader('Accept', 'application/json');
  xhrRequest(xhr, fn);
  xhr.send();
}
module.exports = xhrGetSalesforceSearch;

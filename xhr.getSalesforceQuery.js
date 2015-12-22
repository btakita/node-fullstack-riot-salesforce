var logPrefix = 'salesforce/xhr.getSalesforceQuery';
module.exports = function xhrGetSalesforceQuery(env, params, authorizationHeader, fn) {
  var XMLHttpRequest = env.xhr
    , xhr = new XMLHttpRequest()
    , xhrRequest = env.xhrRequest
    , url = env.salesforce.queryUrl(params)
    ;
  console.log(logPrefix, url, params);
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Authorization', authorizationHeader);
  xhr.setRequestHeader('Accept', 'application/json');
  xhrRequest(xhr, fn);
  xhr.send();
};
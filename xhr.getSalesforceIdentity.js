var logPrefix = 'salesforce/xhr.getSalesforceIdentity';
// TODO: Handle salesforce-refresh-token
module.exports = function xhrGetSalesforceIdentity(env, params, authorizationHeader, fn) {
  console.log(logPrefix, params);
  var XMLHttpRequest = env.xhr
    , xhrRequest = env.xhrRequest
    , orgId = params.orgId
    , userId = params.userId
    , xhr = new XMLHttpRequest()
    , url = 'https://login.salesforce.com/id/'+orgId+'/'+userId
    ;
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Authorization', authorizationHeader);
  xhr.setRequestHeader('Accept', 'application/json');
  xhrRequest(xhr, fn);
  xhr.send();
};
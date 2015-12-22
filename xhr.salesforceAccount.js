var logPrefix = 'salesforce/xhr.salesforceAccount';
module.exports = function xhrSalesforceAccount(env, method, params, authorizationHeader, fn) {
  var XMLHttpRequest = env.xhr
    , xhrRequest = env.xhrRequest
    , xhr = new XMLHttpRequest()
    , url = env.salesforce.accountUrl(params)
    ;
  console.log(logPrefix, url, params);
  xhr.open(method.toUpperCase(), url, true);
  xhr.setRequestHeader('Authorization', authorizationHeader);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhrRequest(xhr, fn);
  var params2 = Object.assign({}, params);
  delete params2.Id;
  xhr.send(JSON.stringify(params2));
};
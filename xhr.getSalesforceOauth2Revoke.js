var revokeUrl = require('./salesforce.revokeUrl');
module.exports = function(env, accessToken) {
  var XMLHttpRequest = env.xhr
    , request = new XMLHttpRequest()
    ;
  request.open('GET', revokeUrl(env, accessToken), true);
};
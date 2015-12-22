module.exports = function(env, token) {
  console.info('salesforce/salesforce.revokeUrl');
  var hashToQuery = env.hashToQuery;
  return "https://login.salesforce.com/services/oauth2/revoke?" + hashToQuery({token: token});
};

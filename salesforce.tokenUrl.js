var logPrefix = 'salesforce/salesforce.tokenUrl';
module.exports = function(env, params) {
  console.info(logPrefix);
  var query = env.hashToQuery(params);
  return 'https://login.salesforce.com/services/oauth2/token'+(query&&('?'+query))||'';
};

module.exports = function authorizeUrl(env, params) {
  var hashToQuery = env.hashToQuery
    , rand = Math.random().toString(36).substring(2)
    , params2 = Object.assign({
        response_type: 'code',
        state: 'sf.popup.'+rand
      }, params || {})
    ;
  console.info('salesforce/salesforce.authorizeUrl', JSON.stringify(params2));
  return 'https://login.salesforce.com/services/oauth2/authorize?'+hashToQuery(params2);
};

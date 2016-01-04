var recordTypes2 = require('./salesforce.recordTypes')
  , xhrGetSalesforceOauth2Revoke = require('./xhr.getSalesforceOauth2Revoke')
  , xhrSalesforceAccount2 = require('./xhr.salesforceAccount')
  , xhrGetSalesforceQueryAccount2 = require('./xhr.getSalesforceQuery.account')
  , xhrGetSalesforceQueryContact2 = require('./xhr.getSalesforceQuery.contact')
  , xhrGetSalesforceSearch2 = require('./xhr.getSalesforceSearch')
  , xhrSalesforceContact2 = require('./xhr.salesforceContact')
  , apiVersion = require('./api.version')
  , logPrefix = 'salesforce/salesforce.store'
  ;
var SalesforceStore = function(env, params) {
  console.log(logPrefix);
  env.riot.observable(this);
  var self = this
    , Cell = env.Cell
    , deepEqual = env.deepEqual
    , hashToQuery = env.hashToQuery
    , isLoggedIn = Cell()
    , salesforceAuthorizationData = Cell().on('set', isLoggedInRefresh)
    , oauthData = {
        client_id: params.client_id,
        redirect_uri: params.redirect_uri
      }
    , recordTypes = recordTypes2(env)
    ;
  var salesforceAuthorizationJson = localStorage.getItem('salesforceAuthorization');
  salesforceAuthorizationData((salesforceAuthorizationJson && JSON.parse(salesforceAuthorizationJson)) || {});
  Object.defineProperties(self, {
    oauthData: { get: function() { return Object.assign({}, oauthData); } },
    salesforceAuthorizationData: { get: function() { return salesforceAuthorizationData; } },
    id: { get: function() { return id; } },
    isLoggedIn: { get: function() { return isLoggedIn; } },
    recordTypes: { get: function() { return recordTypes; } },
    xhrSalesforceAccount: { get: function() { return xhrSalesforceAccount; } },
    xhrGetSalesforceQueryAccount: { get: function() { return xhrGetSalesforceQueryAccount; } },
    xhrGetSalesforceQueryContact: { get: function() { return xhrGetSalesforceQueryContact; } },
    xhrGetSalesforceSearch: { get: function() { return xhrGetSalesforceSearch; } },
    xhrSalesforceContact: { get: function() { return xhrSalesforceContact; } },
    proxyAuthorizationHeaders: { get: function() { return proxyAuthorizationHeaders; } },
    salesforceLogout: { get: function() { return salesforceLogout; } },
    salesforceOrgId: { get: function() { return salesforceOrgId; } },
    salesforceUserId: { get: function() { return salesforceUserId; } },
    accessToken: { get: function() { return accessToken; } },
    instanceUrl: { get: function() { return instanceUrl; } },
    tokenType: { get: function() { return tokenType; } },
    authorizationHeader: { get: function() { return authorizationHeader; } },
    accountUrl: { get: function() { return accountUrl; } },
    contactUrl: { get: function() { return contactUrl; } },
    serviceUrl: { get: function() { return serviceUrl; } },
    refreshToken: { get: function() { return refreshToken; } },
    queryUrl: { get: function() { return queryUrl; } },
    searchUrl: { get: function() { return searchUrl; } },
  });
  env.on('salesforceAuthorization', salesforceAuthorization);
  function id(params) {
    console.log(logPrefix+'|id');
    var params2 = assignParams(params);
    return params2.id;
  }
  function accessToken(params) {
    console.log(logPrefix+'|accessToken');
    var params2 = assignParams(params);
    return params2.accessToken || params2.access_token;
  }
  function instanceUrl(params) {
    console.log(logPrefix+'|instanceUrl');
    var params2 = assignParams(params);
    return params2.instanceUrl || params2.instance_url;
  }
  function tokenType(params) {
    console.log(logPrefix+'|tokenType');
    var params2 = assignParams(params);
    return params2.tokenType || params2.token_type;
  }
  function authorizationHeader(params) {
    console.log(logPrefix+'|authorizationHeader');
    var params2 = assignParams(params);
    return tokenType(params2)+' '+accessToken(params2);
  }
  function accountUrl(params) {
    console.log(logPrefix+'|accountUrl');
    var id = params && (params.Id||params.id)
      , suffix = (id && ('/'+id)) || ''
      ;
    return serviceUrl(params)+'/sobjects/Account'+suffix;
  }
  function contactUrl(params) {
    console.log(logPrefix+'|contactUrl');
    var id = params.Id||params.id
      , suffix = (id && ('/'+id)) || ''
      ;
    return serviceUrl(params)+'/sobjects/Contact'+suffix;
  }
  function serviceUrl(params) {
    console.log(logPrefix+'|serviceUrl');
    return instanceUrl(params)+'/services/data/'+apiVersion;
  }
  function refreshToken(params) {
    console.log(logPrefix+'|refreshToken');
    var params2 = assignParams(params);
    return params2.refreshToken || params2.refresh_token;
  }
  function queryUrl(params) {
    console.log(logPrefix+'|queryUrl');
    var params2 = assignParams(params)
      , query = params2.query
      , serviceUrl2 = serviceUrl(params)
      ;
    return serviceUrl2+'/query?'+hashToQuery({q: query});
  }
  function searchUrl(params) {
    console.log(logPrefix+'|searchUrl');
    var serviceUrl2 = serviceUrl(params)
      , url = serviceUrl2+'/search?'+hashToQuery(params)
      ;
    return url;
  }
  function salesforceAuthorization(salesforceAuthorizationData2) {
    console.log(logPrefix+'|salesforceAuthorization', salesforceAuthorizationData2);
    if (!deepEqual(salesforceAuthorizationData2, salesforceAuthorizationData())) {
      console.log(logPrefix+'|salesforceAuthorization|!deepEqual');
      salesforceAuthorizationData(salesforceAuthorizationData2);
      localStorage.setItem('salesforceAuthorization', JSON.stringify(salesforceAuthorizationData2));
      document.cookie = 'sf_loggedin=true;';
      env.trigger('salesforceLogin', salesforceAuthorizationData2);
    }
  }
  function proxyAuthorizationHeaders() {
    return {
      'salesforce-org-id': self.salesforceOrgId(),
      'salesforce-user-id': self.salesforceUserId(),
      'salesforce-access-token': accessToken(),
      'salesforce-token-type': tokenType(),
      'salesforce-refresh-token': self.refreshToken()
    };
  }
  function salesforceLogout() {
    console.log(logPrefix+'|salesforceLogout');
    xhrGetSalesforceOauth2Revoke(env, accessToken());
    salesforceAuthorizationData({});
    localStorage.removeItem('salesforceAuthorization');
    document.cookie = 'sf_loggedin=;';
    env.trigger('salesforceLogout');
  }
  function isLoggedInRefresh() {
    console.log(logPrefix+'|isLoggedInRefresh', accessToken());
    isLoggedIn(!!(accessToken()));
  }
  function salesforceOrgId() {
    var items = (self.id()||'').split('/');
    return items[items.length - 2];
  }
  function salesforceUserId() {
    var items = (self.id()||'').split('/');
    return items[items.length - 1];
  }
  function assignParams(params) {
    return Object.assign({}, salesforceAuthorizationData(), params);
  }
  function xhrSalesforceAccount() {
    return applyEnv(xhrSalesforceAccount2, arguments);
  }
  function xhrGetSalesforceQueryAccount() {
    return applyEnv(xhrGetSalesforceQueryAccount2, arguments);
  }
  function xhrGetSalesforceQueryContact() {
    return applyEnv(xhrGetSalesforceQueryContact2, arguments);
  }
  function xhrGetSalesforceSearch() {
    return applyEnv(xhrGetSalesforceSearch2, arguments);
  }
  function xhrSalesforceContact() {
    return applyEnv(xhrSalesforceContact2, arguments);
  }
  function applyEnv(fn, args) {
    return fn.apply(self, [env].concat(Array.prototype.slice.call(args, 0)));
  }
};
module.exports = SalesforceStore;

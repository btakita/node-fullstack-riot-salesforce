var nodeEnv = require('./node.env')
  , oauthCallbackHtmlEct = require('./oauth-callback.html.ect')
  , request = require('request')
  , tokenUrl = require('./salesforce.tokenUrl')
  , salesforceOauthData = require('./salesforce.oauthData')
  , logPrefix = 'salesforce/http'
  ;
module.exports = function(env) {
  var app = env.app;
  app.get('/salesforce/oauth-callback', getSalesforceOauthCallback);
  function getSalesforceOauthCallback(req, res) {
    console.info(logPrefix+'|getSalesforceOauthCallback', req.query);
    var code = req.query.code;
    if (code) {
      postOauth2Token();
    } else {
      res.status(400).send('Authentication Error');
    }
    function postOauth2Token() {
      var data = salesforceOauthData(env, {
          grant_type: 'authorization_code',
          client_secret: env.sfClientSecret,
          redirect_uri: env.sfCallbackUrl,
          code: req.query.code
        })
        , url = tokenUrl(nodeEnv)
        ;
      console.info(logPrefix+'|getSalesforceOauthCallback|postOauth2Token', url, JSON.stringify(data));
      request({
        method: 'POST',
        url: url,
        form: data,
        headers: {
          'X-Tenfore-Session-Id': req.headers['session-id']
        }
      }, function(err, res2, body) {
        if (err) {
          console.error(logPrefix+'|getSalesforceOauthCallback|POST token|err', err);
          res.status(500).send(err);
        } else {
          console.info(logPrefix+'|getSalesforceOauthCallback|POST token|success', body);
          res.status(200).send(oauthCallbackHtmlEct({data: body}));
        }
      });
    }
  }
};

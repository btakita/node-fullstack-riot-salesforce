<salesforce-login>
  <a class="login" href="#" onclick="{login}" if="{ !isLoggedIn }">
    <img src="/images/logo198.png" style="height:15px; margin-right:5px; vertical-align: middle;">Connect to Salesforce
  </a>
  <a class="logout" href="#" onclick="{logout}" if="{ isLoggedIn }">
    Logout
  </a>
  <div class="logged-in-as">
  </div>
  
  <style scoped>
    :scope {
      display: block;
    }
    .login, .logout {
      letter-spacing: -.15;
    }
    .login {
      color: #109ad7;
    }
    .login:hover, .login:focus {
      color: #43bcf1;
      opacity: .5;
    }
    .logout {
      color: #565656;
    }
    .logout:hover, .logout:focus {
      color: #7c7c7c;
    }
  </style>

  <script>
    var self = this
      , domEnv = require('dom.env')
      , $ = domEnv.$
      , salesforce = domEnv.salesforce
      , login = require('./dom.login')
      , $login
      , $logout
      , active = 'active'
      , tagName = 'salesforce-login'
      , logPrefix = 'salesforce/'+tagName+'.tag'
      ;
    domEnv.tagInit(tagName, self, opts);
    self.on('mount', mount);
    self.on('unmount', unmount);
    function mount() {
      console.log(logPrefix+'|mount');
      salesforce.isLoggedIn.send(isLoggedInChange).on('change', isLoggedInChange);
    }
    function unmount() {
      console.log(logPrefix+'|unmount');
      salesforce.isLoggedIn.off('change', isLoggedInChange);
    }
    function isLoggedInChange(isLoggedIn) {
      console.log(logPrefix+'|isLoggedInChange', isLoggedIn);
      self.isLoggedIn = isLoggedIn;
      self.update();
    }
    self.login = function() {
      console.log(logPrefix+'|login');
      login();
    };
    self.logout = function() {
      console.log(logPrefix+'|logout');
      salesforce.salesforceLogout();
    };
  </script>
</salesforce-login>

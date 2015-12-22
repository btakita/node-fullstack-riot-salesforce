module.exports = function(env) {
  return Object.assign.apply(Object, [{
    client_id: env.sfClientId,
    redirect_uri: env.sfCallbackUrl
  }].concat(Array.prototype.slice.call(arguments, 1)));
};
angular.module('app')
  .factory('TokenService', TokenService);

TokenService.$inject = [];

function TokenService() {

  var service = {
    removeToken: removeToken,
    getToken: getToken,
    setToken: setToken,
    addId: addId
  };

  function removeToken() {
    localStorage.removeItem('token');
    // removing user id as well
    localStorage.removeItem('user_id')
  }

  function getToken() {
    var token = localStorage.getItem('token');
    if (token) {
      // check if expired, remove if it is
      var payload = JSON.parse(atob(token.split('.')[1]));
      // JWT's exp is expressed in seconds, not milliseconds, so convert Date.now()
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      }
    }
    return token;
  }

  function setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  function addId(id) {
    if (id) {
      localStorage.setItem('user_id', id);
    }
  }

  return service;
}

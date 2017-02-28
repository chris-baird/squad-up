angular.module('app')
  .factory('UserService', userService);

userService.$inject = ['$http', 'TokenService'];

function userService($http, TokenService) {

  var service = {
    login,
    logout,
    signup,
    getUser,
    isLoggedIn,
    userGames
  };

  function login(credentials) {
    return $http.post('/api/users/login', credentials);
  }

  function logout() {
    TokenService.removeToken();
  }

  function signup(userData) {
    return $http.post('/api/users', userData);
  }

  function getUser() {
    return getUserFromToken();
  }

  function isLoggedIn() {
    return !!getUserFromToken();
  }

  function userGames(callback) {
    $http({
      url: 'api/users/games',
      method: 'GET'
    }).then(function(res) {
      callback(res);
    }).catch(function(err) {
      callback(err);
    })
  }

  return service;

  // helper functions

  function getUserFromToken () {
    var token = TokenService.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }

}

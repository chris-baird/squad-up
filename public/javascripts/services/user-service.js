angular.module('app')
  .factory('UserService', userService);

userService.$inject = ['$http', 'TokenService', '$q'];

function userService($http, TokenService, $q) {

  var service = {
    login,
    logout,
    signup,
    getUser,
    isLoggedIn,
    userGames,
    deleteGame
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
    var def = $q.defer();
    $http({
      url: 'api/users/games',
      method: 'GET'
    }).then(function(res) {
      def.resolve(res);
    }).catch(function(err) {
      def.reject(err);
    })
    return def.promise;
  }

  return service;

  function getUserFromToken () {
    var token = TokenService.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }

  function deleteGame(game_id, callback) {
    $http({
      url: '/api/games/' + game_id + '/',
      method: 'DELETE'
    }).then(function(response) {
      callback(response);
    }).catch(function(error) {
      callback(error);
    })
  }

}

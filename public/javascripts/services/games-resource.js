angular.module('app')
.factory('GameService', GameService);

GameService.$inject = ['$resource'];

function GameService($resource) {
  return $resource(
    '/api/games/:id',
    {id: '@_id'},
    {
      forUser: {
        method: 'GET',
        url: '/api/users/games',
        isArray: true
      }
    }
  );
}

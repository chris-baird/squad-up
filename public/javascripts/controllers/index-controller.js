angular.module('app')
.controller('IndexController', IndexController);

IndexController.$inject = ['$state', 'GameService', '$scope', 'UserService'];

function IndexController($state, GameService, $scope, UserService) {
  $scope.games = GameService.query();
}

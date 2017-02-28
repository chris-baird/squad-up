angular.module('app')
.controller('GamesController', GamesController);

GamesController.$inject = ['$state', 'GameService', '$scope'];

function GamesController($state, GameService, $scope) {
  var vm = this;

  $scope.games = GameService.query();

  vm.addGame = function(gameName, system, lang, desc, playTime, micReq, gamerId, user) {
    GameService.save({
      gameName: vm.gameName,
      system: vm.system,
      lang: vm.lang,
      desc: vm.desc,
      playTime: vm.playTime,
      micReq: vm.micReq === 'yes' ? true : false,
      gamerId: vm.gamerId,
      user: user
    }, function(data) {
      $state.go('home');
    });
  };

  vm.deleteGame = function (game) {
    console.log('clicked');
    game.$delete(function() {
      $scope.games.splice($scope.games.findIndex(t => t._id), 1);
    });
  };
}


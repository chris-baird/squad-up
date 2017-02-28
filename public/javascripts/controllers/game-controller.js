angular.module('app')
.controller('GamesController', GamesController);

GamesController.$inject = ['$state', 'GameService', '$scope'];

function GamesController($state, GameService, $scope) {
  var vm = this;

  $scope.games = GameService.query();

  // vm.delGame = function(game) {
  //   game.$delete(function() {
  //     vm.games.splice(vm.games.findIndex(t => t._id === game._id), 1);
  //   });
  // };

  vm.addGame = function(gameName, system, lang, desc, playTime, micReq, gamerId, user) {
    GameService.save({
      gameName: vm.gameName,
      system: vm.system,
      lang: vm.lang,
      desc: vm.desc,
      playTime: vm.playTime,
      micReq: vm.micReq,
      gamerId: vm.gamerId,
      user: user
    }, function(data) {
      $state.go('home');
    });
  };
}


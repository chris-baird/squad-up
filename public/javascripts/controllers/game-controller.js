angular.module('app')
.controller('GamesController', GamesController);

GamesController.$inject = ['$state', 'GameService', '$scope', 'UserService'];

function GamesController($state, GameService, $scope, UserService) {
  var vm = this;

  vm.games = GameService.forUser();

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
      $state.go('mygames');
      window.location.reload();
    });
  };

  vm.deleteGame = function(game_id) {
    UserService.deleteGame(game_id, function(data) {
      window.location.reload();
    });
  };
}


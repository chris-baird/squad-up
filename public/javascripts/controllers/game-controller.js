angular.module('app')
.controller('GamesController', GamesController);

GamesController.$inject = ['$state', 'GameService', '$scope', 'UserService'];

function GamesController($state, GameService, $scope, UserService) {
  var vm = this;

  $scope.games = GameService.query();

  //$scope.userGames = function() {
    // UserService.userGames(function(data) {
    //   $scope.user_games = data;
    // })
  //}

  UserService.userGames(function(data) {
    $scope.user_games = data;
    console.log()
  })

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
    });
  };

  vm.deleteGame = function(game_id) {
    UserService.deleteGame(game_id, function(data) {
      //$scope.user_games.splice($scope.user_games.findIndex(t => data.data._id), 1);
      // var el = angular.element(document.querySelector('game-' + game_id));
      // console.log(el);
      // el.remove();
      // console.log("hey");
      // $state.go('mygames');
      window.location.reload();
    });
  };
}


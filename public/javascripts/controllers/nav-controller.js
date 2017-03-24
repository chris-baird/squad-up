angular.module('app')
.controller('NavController', NavController);

NavController.$inject = ['$timeout', '$state', 'UserService', 'GameService', 'TokenService'];

function NavController($timeout, $state, UserService, GameService, TokenService) {
  var vm = this;

  vm.filterMic = 'all';
  vm.filterSystem = 'all';

  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;

  GameService.query(function(games) {
    vm.uniqueSystems = Object.keys(games.reduce((acc, game, idx, arr) => {
      if (!acc[game.system]) acc[game.system] = true;
      return acc;
    }, {}));
  });

  vm.logout = function() {
    TokenService.removeToken();
    $state.go('home');
  };

  vm.isState = function(state) {
    return $state.current.name === state;
  };

  vm.addGame = function(gameName, system, lang, desc, playTime, micReq, gamerId, user) {
    console.log('triggered');
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
      window.location.reload();
    });
  };

  vm.filter = function() {
    return function(game) {
      if (game) {
        var mic = vm.filterMic === 'all' || (game.micReq && vm.filterMic === 'yes') || (!game.micReq && vm.filterMic === 'no');
        var system = vm.filterSystem === 'all' || (game.system === vm.filterSystem);
        return mic && system;
      }
    };
  }

}

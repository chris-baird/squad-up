angular.module('app')
.controller('NavController', NavController);

NavController.$inject = ['$state', 'UserService', 'GameService', 'TokenService'];

function NavController($state, UserService, GameService, TokenService) {
  var vm = this;

  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;

  vm.logout = function() {
    // UserService.logout();
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
      $state.go('mygames');
      window.location.reload();
    });
  };

}

angular.module('app')
.controller('NavController', NavController);

NavController.$inject = ['$state', 'UserService'];

function NavController($state, UserService) {
  var vm = this;

  vm.logout = function() {
    UserService.logout();
    $state.go('home');
  };

  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;

}

angular.module('app')
.controller('UserController', UserController);

UserController.$inject = ['$state', 'UserService', 'TokenService'];

// setting user id to local storage in here

function UserController($state, UserService, TokenService) {
  var vm = this;

  vm.signup = function() {
    UserService.signup(vm.user).then(function(user) {
      $state.go('home');
    });
    vm.user = {};
  };

  vm.login = function() {
    UserService.login(vm.user).then(function(user) {
      $state.go('home');
    }, function() {
      $state.go('home');
    });
    vm.user = {};
  };

}

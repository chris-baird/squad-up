angular.module('app')
.controller('IndexController', IndexController);

IndexController.$inject = ['$state', 'GameService', '$scope', 'UserService', 'EmailService'];

function IndexController($state, GameService, $scope, UserService, EmailService) {
  var vm = this;
  $scope.games = GameService.query();
  $scope.selectedSystem = $scope.games.system;

  $scope.setEmail = function(user_email, user_name) {
    $scope.user_email = user_email;
    $scope.user_name = user_name;
  }

  vm.sendEmail = function(email) {
    EmailService.save({
      to: email,
      subject: vm.subject,
      text: vm.text
    },function(email) {
    });
  }



}



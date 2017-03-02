angular.module('app')
.controller('IndexController', IndexController);

IndexController.$inject = ['$state', 'GameService', '$scope', 'UserService', 'EmailService'];

function IndexController($state, GameService, $scope, UserService, EmailService) {
  var vm = this;
  $scope.games = GameService.query();

  $scope.setEmail = function(user_email) {
    $scope.user_email = user_email;
  }

  vm.sendEmail = function(email) {
    EmailService.save({
      to: email,
      subject: vm.subject,
      text: vm.text
    },function(email) {
      // console.log(email);
    });
  }

}



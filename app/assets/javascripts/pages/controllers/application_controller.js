// This File file is an appropriate place for initialization code,
// an application controller, as well as services & declarations
// that will be used across the app.

var app = angular.module("Todo", ["ngResource"]);

this.ApplicationController = function($scope) {

  // These flash messages are at the application scope so that they can 
  // be used be lower level controllers.
  $scope.ERROR_MESSAGE_CLASS = "error-message";
  $scope.EMPTY_MESSAGE_CLASS = "empty-message";
  $scope.SUCCESS_MESSAGE_CLASS = "success-message";

  $scope.setFlashMessage = function(message,messageClass) {
    $scope.message = message; 
    $scope.messageClass = messageClass;
  }
  $scope.setFlashMessage("",$scope.EMPTY_MESSAGE_CLASS);
}




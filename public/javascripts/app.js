angular.module('comment', [])
.controller('MainCtrl', [
  '$scope',
  function($scope){
    $scope.test = 'Hello world!';
  }
]);

$scope.messages = [];

$scope.addMessage = function() {
      
      $scope.messages.push({title:$scope.subject-line,destination:$scope.address,message:$scope.message-text,date:$scope.date-time});
      $scope.address='';

	$scope.subject-line='';
      $scope.message-text='';
    };

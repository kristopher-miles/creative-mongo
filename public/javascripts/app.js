angular.module('emailer', [])
.controller('MainCtrl', [
  '$scope','$http',
   function($scope,$http){
	$scope.messages = []
   


	$scope.addMessage = function() {
	  $scope.messages.push({title:$scope.formContent.subject,destination:$scope.formContent.address,message:$scope.formContent.messageText,date:$scope.formContent.dateTime});
      	  $scope.address='';
      	
     	};

  }
]);

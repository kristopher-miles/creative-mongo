angular.module('emailer', [])
.controller('MainCtrl', [
  '$scope','$http',
   function($scope,$http){
	

         $scope.messages = []
   



	 $scope.create = function(message) {
   		 return $http.post('/messages', message).success(function(data){
             console.log("pushed message subject: "+message.subject);
    			  $scope.messages.push(data);
   		 });
 	 };	

	$scope.addMessage = function() {

	if ($scope.formContent === ''){return;}
	console.log('In addMessage');
	$scope.create({
		title:$scope.formContent.subject,
		destination:$scope.formContent.address,
		message:$scope.formContent.messageText,
		date:$scope.formContent.dateTime});
        
        $scope.formContent.address='';
 		$scope.formContent.subject = '';
 		$scope.formContent.messageText ='';
      	
     	};
        $scope.getAll = function() {
                return $http.get('/messages').success(function(data){
                        angular.copy(data, $scope.messages);
                });
        };
        $scope.getAll();
       

  }
]);

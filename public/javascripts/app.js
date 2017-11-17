angular.module('emailer', [])
.controller('MainCtrl', [
  '$scope','$http',
   function($scope,$http){
	

         $scope.messages = []
	$scope.formContent = {};
         


	 $scope.create = function(message) {

		console.log("entered create");
		console.log("Created:"+JSON.stringify(message));
   		 return $http.post('/messages', message).success(function(data){
             console.log("pushed message subject: "+message.subject);
    			  $scope.messages.push(data);
   		 });
 	 };	

	$scope.addMessage = function() {

	if ($scope.formContent === ''){return;}
	console.log('In addMessage');
	console.log("Subject is: "+$scope.formContent.subject);
	var message = {
                title:$scope.formContent.subject,
                destination:$scope.formContent.address,
                message:$scope.formContent.messageText,
                date:$scope.formContent.dateTime};

	$scope.create(message);
        
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

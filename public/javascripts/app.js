angular.module('emailer', [])
.controller('MainCtrl', [
  '$scope','$http',
   function($scope,$http){
	

         $scope.messages = []
	$scope.formContent = {};
       

	var date_string = ""+new Date().toJSON().split("T")[0]+"T";
	var hours = "";
	var working_date = new Date().setSeconds(0);
	
	hours += new Date().toLocaleTimeString().split(" ")[0];
	var output = hours.split(":")[0];
	output+=":"+hours.split(":")[1];
	
	if(output.length<5){
		console.log("appending time string.");
		date_string+="0";
	}
	date_string +=output;
	
	
	console.log(date_string); 
	  $scope.formContent.dateTime = date_string;	

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
		console.log("Updating message queue.");
                return $http.get('/messages').success(function(data){
                        angular.copy(data, $scope.messages);
                });
        };
        $scope.getAll();
       

   
  }
]);

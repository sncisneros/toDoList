var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', 
	function($scope, $http){
		
		var refresh = function(){
			console.log("message from controller");
				$http.get('/todolist').then(function(response){
					console.log("Got Data!");
			
			$scope.todolist = response.data;
		});
	};
	
	refresh();
	
	$scope.add = function(){
		console.log($scope.todo);
			$http.post('/todolist', $scope.todo).then(function(response){//use then instead of success!
				console.log(response);
				refresh();//once refreshed we get response back and it logs it
			});
	};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/todolist/' + id).then(function(response){
			refresh();
		});
	};
	
	$scope.edit = function(id){
		console.log("id:" + id);
		$http.get('/todolist/' + id).then(function(response){
			$scope.todo = response.data;
		});
	};
	
	//use .then instead of .succeed
	$scope.update = function(){
		console.log($scope.todo);
		$http.put('/todolist/' + $scope.todo._id, $scope.todo).then(function(response){
			refresh();
		});
	};
	
	$scope.complete = function (id){
		console.log("id:" + id);
		$http.post('/todolist/' + id).then(function(response){			
			refresh();
		});
		
    };
	
	$scope.change = function(){
		var x = document.getElementById("stat");
		x.style.color = "green";
	};
	

	
	
	$scope.deselect = function(){
		$scope.todo = "";
	}
	

}]);
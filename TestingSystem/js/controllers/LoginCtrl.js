
	angular
		.module('app.controllers')
		
		/*The Login controller:*/
		.controller('LoginCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
			
			$scope.goToNext = function() {
				
				$rootScope.user = {
					name: $scope.user.name,
					email: $scope.user.email || null
				};
				
				$location.path('/');
			};
		}]);
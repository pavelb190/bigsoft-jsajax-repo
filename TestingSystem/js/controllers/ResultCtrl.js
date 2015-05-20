
	angular
		.module('app.controllers')
		
		.controller('ResultCtrl', ['$scope', '$rootScope', '$modalInstance', '$location', 'percent', 'caption', 'bodyText', 'buttonText', function($scope, $rootScope, $modalInstance, $location, percent, caption, bodyText, buttonText) {
			
			$scope.caption = caption;
			$scope.bodyText = bodyText;
			$scope.buttonText = buttonText;
			
			$scope.ok = function() {
				
				if (percent !== 100) {
					
					$modalInstance.close();
				}
				else {
					
					$modalInstance.close();
					
					$rootScope.user = undefined;
				}
			};
		}]);

	angular
		.module('app.controllers')
		
		/* The Main Testing controller of app: */
		.controller('TestingCtrl', ['$scope', '$rootScope', '$modal', '$location', 'quiz', function($scope, $rootScope, $modal, $location, quiz) {
			
			$rootScope.$watch('user', function(val) {
				
				if (!angular.isDefined($rootScope.user)) {
					
					$location.path('/login');
				}
				else {
					
					quiz.get('JavaScript', function(data) {
						
						$rootScope.quiz = data;
					});
				}
			});
			
			var calcTotalResult = function() {
				
				var _chapters = $rootScope.quiz.chapters,
					//for Total counting:
					_totalResult = [];
				
				angular.forEach(_chapters, function(chapter, title) {
					
					var _summator = {
						count: chapter.questions.length,
						minStab: chapter.minimumStability,
						res: chapter.result,
						
						//Percentage:
						perc: (function() {
							
							return (chapter.result * 100 / chapter.questions.length);
						})()
					};
					
					_totalResult.push(_summator);
				});
				
				return (function() {
						
						var _total = 0;
						
						for(var i = 0; i < _totalResult.length; i++) {
							
							_total += _totalResult[i]['perc'];
						}
						
						return (_total /= _totalResult.length);
					})();
			};
			
			$scope.$on('testingIsComplete', function() {
				
				var _prcRes = calcTotalResult();
				
				var modalResultInstance = $modal.open({
					animation: true,
					templateUrl: 'js/templates/result.html',
					controller: 'ResultCtrl',
					resolve: {
						percent: function() {
							
							return _prcRes;
						},
						caption: function() {
							
							if (_prcRes === 100) {
								
								return "It was Amazing!!! - You're the best!!";
							}
							else if (_prcRes > 50) {
								
								return "Congratulations, " + $rootScope.user.name + "!";
							}
							else{
								
								return "Sorry... " + $rootScope.user.name;
							}
						},
						bodyText: function() {
							
							return _prcRes + "%";
						},
						buttonText: function() {
							
							return (_prcRes === 100 ? 'OK': "Close");
						}
					}
				});
			});
			
			$scope.userQuit = function() {
				
				$rootScope.user = undefined;
			};
		}]);
	
	(function() {
		
		var app = angular.module('TestingSystem', []);
		
		app.controller('TestingController', ['$http', '$rootScope', function($http, $rootScope) {
			$http
				.get('test-questions/JavaScript.json')
				.success(function(data, sts, hdrs, cfg) {
					$rootScope.test = data;
					
					//Set unavailable chapters...:
					angular.forEach($rootScope.test.chapters, function(chapter, k) {
						//but the first..:
						chapter.available = (chapter.level > 1 ? false : true);
					});
				})
				.error(function(data, sts, hdrs, cfg) {
					alert('[Getting test questions.] Some error has occured!');
				});
		}]);
		
		app.controller('TestController', ['$scope', '$rootScope', function($scope, $rootScope) {
			
			$scope.current = false;	//current test for using;
			$scope.cqIdx = null;	//current question-index in question's array;
			$scope.result = false;	//current test result;
			
			$scope.beginTest = function(test) {
				$scope.current = test;
				$scope.cqIdx = 0;
				$scope.result = 0;
				
				angular.forEach($rootScope.test.chapters[test].questions, function(quest, i) {
					//Clear answers for questions;
					delete quest.answered;
				});
				
				$rootScope.test.chapters[test].hasBegun = true;
				
				$rootScope.test.chapters[test].completed = false;
			};
			$scope.continueTest = function(test) {
			
				$scope.current = test;
				
				$scope.cqIdx = (function() {
					var _quests = $rootScope.test.chapters[test].questions;
					for(var i = 0; i < _quests.length; i++) {
						if (typeof _quests[i].answered === 'undefined') {
							return i;
						}
					}
					return 0;
				})();
			};
			$scope.getQuestion = function(idx) {
				
				return $rootScope.test.chapters[$scope.current].questions[idx] || null;
			};
			$scope.applyAnswer = function() {
				
				var _rightAnswer = $rootScope.test.chapters[$scope.current].questions[$scope.cqIdx].rightAnswer,
					_answered = $rootScope.test.chapters[$scope.current].questions[$scope.cqIdx].answered;
				
				if (_rightAnswer === _answered) {
					
					$scope.result++;
				}
				if ($scope.cqIdx === $rootScope.test.chapters[$scope.current].questions.length - 1) {
					
					$rootScope.test.chapters[$scope.current].currResult = $scope.result;
					
					//Iterate through the all chapters:
					var chapters = $rootScope.test.chapters,
						//current level:
						currLvl = $rootScope.test.chapters[$scope.current].level;
					//Set available the next level...:
					for(var chapter in chapters) {
						
						if ($scope.result >= chapters[$scope.current].minimumStability && chapters[chapter].level === currLvl+1) {
							
							chapters[chapter].available = true;
							
							//Exit from loop;
							break;
						}
					}
					
					$rootScope.test.chapters[$scope.current].completed = true;
				}
				else {
					
					$scope.cqIdx++;
				}
				//return ($rootScope.test.chapters[$scope.current].questions[iQst].answered = ans) && true;
			};
			$scope.quitTest = function() {
				
				alert('Quitted!');
			};
			$scope.hasBegun = function(test) {
			
				return $rootScope.test.chapters[test].hasBegun || false;
			};
			$scope.hasMinimumStability = function() {
				
				return $scope.result >= $rootScope.test.chapters[$scope.current].minimumStability;
			};
			$scope.isCompleted = function(test) {
			
				return $rootScope.test.chapters[test].completed || false;
			};
			$scope.testResult = function() {
				
			};
		}]); //.filter('firstQuestion', function() {});
		
		app.controller('AnswersController', ['$scope', '$rootScope', function($scope, $rootScope) {
			//for checkboxes:
			$scope.addAnswer = function(i) {
				
			};
			//for radios:
			$scope.setAnswer = function(test, cqIdx, i) {
				
				$rootScope.test.chapters[test].questions[cqIdx].answered = i;
			};
		}]);
	})();
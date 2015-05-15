
	angular
		.module('app.controllers', [])
		//The App-Controllers:
		//The Main controller of app:
		.controller('TestingCtrl', ['$scope', '$rootScope', 'Quiz', function($scope, $rootScope, Quiz) {
			
			Quiz.get('JavaScript', function(data) {
				
				$rootScope.quiz = data;
			});
		}])
		.controller('ChapterCtrl', ['$scope', '$modal', '$rootScope', function($scope, $modal, $rootScope) {
			
			//$scope.cqIdx = 0;
			//$scope.result = false;
			
			var _setNextChapterAvailable = function(chptr, availble) {
				
				var _chapters = $rootScope.quiz.chapters,
					_curLvl = _chapters[chptr].level;
				
				for(var chapter in _chapters) {
					
					//alert(_chapters[chapter].level + " " + _curLvl);
					
					if (_chapters[chapter].level == _curLvl+1) {
						
						_chapters[chapter].available = availble;
					}
					else if (_chapters[chapter].level > _curLvl+1) {
						
						_chapters[chapter].available = false;
					}
				}
			};
			
			$scope.showTestForm = function(chptr) {
				
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'js/templates/testForm.html',
					controller: 'TestCtrl',
					//size: 'lg',
					resolve: {
						chapter: function() {
							
							return chptr;
						}
					}
				});
				
				modalInstance.result.then(function(reslt) {
					
					$rootScope.quiz.chapters[chptr].result = reslt;
					
					$rootScope.$watch('quiz.chapters[chptr].result', function() {
						
						_setNextChapterAvailable(chptr, $scope.hasMinimumStability(chptr));
					});
				});
			};
			
			$scope.getResult = function(chptr) {
				
				return $rootScope.quiz.chapters[chptr].result;
			};
			
			$scope.getQuestionCount = function(chptr) {
				
				return $rootScope.quiz.chapters[chptr].questions.length;
			};
			
			$scope.isCompleted = function(chptr) {
				
				return $rootScope.quiz.chapters[chptr].isCompleted;
			};
			
			$scope.hasMaxResult = function(chptr) {
				
				return ($rootScope.quiz.chapters[chptr].result === $rootScope.quiz.chapters[chptr].questions.length)
			};
			
			$scope.hasMinimumStability = function(chptr) {
				
				return ($rootScope.quiz.chapters[chptr].result >= $rootScope.quiz.chapters[chptr].minimumStability);
			};
		}])
		.controller('TestCtrl', ['$scope', '$rootScope', '$modalInstance', 'chapter', function($scope, $rootScope, $modalInstance, chapter) {
			
			//$scope.time = $rootScope.quiz.chapters[chapter].time || null;
			
			$scope.chapter = chapter;
			
			$scope.cqIdx = 0;
			$scope.result = 0;
			
			$scope.isCompleted = false;
			
			$scope.$watch('isCompleted', function(cmplted) {
				
				if (cmplted) {
					
					$modalInstance.close($scope.result);
				}
				
				$rootScope.quiz.chapters[chapter].isCompleted = cmplted;
			});
			
			$scope.getQuestion = function(idx) {
				
				return $rootScope.quiz.chapters[chapter].questions[idx] || null;
			};
			
			var _checkAnswer = function(answr) {
				
				return (answr === $rootScope.quiz.chapters[chapter].questions[$scope.cqIdx].rightAnswer);
			};
			
			var _toNextQuestion = function() {
				
				if ($scope.cqIdx < $rootScope.quiz.chapters[chapter].questions.length - 1) {
					
					$scope.cqIdx++;
				}
				else {
					
					$scope.isCompleted = true;
				}
			};
			
			$scope.applyAnswer = function(answred) {
				
				$rootScope.quiz.chapters[chapter].questions[$scope.cqIdx].answered = answred;
				
				if (_checkAnswer(answred)) {
					
					$scope.result++;
				}
				
				_toNextQuestion();
			};
			
			$scope.skipQuestion = function() {
				
				$rootScope.quiz.chapters[chapter].questions[$scope.cqIdx].answered = null;
				
				_toNextQuestion();
			};
			
			$scope.getQuestionCount = function(chptr) {
				
				return $rootScope.quiz.chapters[chptr].questions.length;
			};
			
			$scope.getNumber = function(num) {
				
				var _arr = new Array(num);
				
				for(var i = 0; i < _arr.length; i++) {
					
					_arr[i] = i;
				}
				
				return _arr;
			};
			
			$scope.cancel = function() {
				
				$modalInstance.dismiss('cancel');
			};
		}])
		.directive('progressBar', [function() {
			
			return {
				template: '<div style="float: left; text-align: left; width: 100%; margin-bottom: 3px;">' +
						//'{{getNumber(4)}}' +
						'<table style="width: 100%;" border="0">' +
							'<tr style="height: 4px;">' +
								'<td ng-class="{\'skipped\': getQuestion($index).answered === null, \'completed\': getQuestion($index).answered === getQuestion($index).rightAnswer, \'failed\': (getQuestion($index).answered !== undefined && getQuestion($index).answered !== null) && getQuestion($index).answered !== getQuestion($index).rightAnswer}" ng-repeat="i in getNumber(getQuestionCount(chapter))"></td>' +
							'</tr>' +
						'</table>' +
					'</div>'
			};
		}])
		//Controller of one section of the Test:
		.controller('TestController', ['$scope', '$modal', '$rootScope', function($scope, $modal, $rootScope) {
			
			$scope.current = false;	//current test for using;
			$scope.cqIdx = null;	//current question-index in question's array;
			$scope.result = false;	//current test result;
			
			$scope.resultShowed = false;	//toggle of showing of the testing result;
			
			$scope.$watch('resultShowed', function() {
				
				$scope.buttonResultsText = ($scope.resultShowed ? 'Скрыть' : 'Результаты');
			});
			
			$scope.beginTest = function(test) {
				
				$scope.current = test;
				$scope.cqIdx = 0;
				$scope.result = 0;
				
				$scope.resultDisabled = true;
				
				angular.forEach($rootScope.test.chapters[test].questions, function(quest, i) {
					
					//Clear missings and answers for questions;
					delete quest.missing;
					delete quest.answered;
				});
				
				$rootScope.test.chapters[test].hasBegun = true;
				
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'js/templates/testForm.html',
					controller: 'TestController'
				});
				
				$rootScope.test.chapters[test].completed = false;
				
				delete $scope.answered;
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
			$scope.checkAnswer = function(qIdx) {
				
				var _rightAnswer = $rootScope.test.chapters[$scope.current].questions[qIdx].rightAnswer,
					_answered = $rootScope.test.chapters[$scope.current].questions[qIdx].answered;
				
				return (_answered === _rightAnswer);
			};
			//Private:
			function toNextQuestion() {
				
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
			}
			$scope.applyAnswer = function() {
				
				var _rightAnswer = $rootScope.test.chapters[$scope.current].questions[$scope.cqIdx].rightAnswer,
					_answered = $rootScope.test.chapters[$scope.current].questions[$scope.cqIdx].answered;
				
				if (_answered === _rightAnswer) {
					
					$scope.result++;
				}
				else {
					
					$scope.resultDisabled = false;
				}
				//Flag for knowing that no missing all test.
				$scope.answered = true;
				
				toNextQuestion();
			};
			$scope.skipQuestion = function() {
				
				$rootScope.test.chapters[$scope.current].questions[$scope.cqIdx].missing = true;
				
				toNextQuestion();
			};
			$scope.quitTest = function() {
				
				alert('Quitted!');
			};
			$scope.hasBegun = function(test) {
			
				return $rootScope.test.chapters[test].hasBegun || false;
			};
			$scope.hasMaxResult = function() {
			
				return ($scope.result === $rootScope.test.chapters[$scope.current].questions.length);
			};
			$scope.hasMinimumStability = function() {
				
				return $scope.result >= $rootScope.test.chapters[$scope.current].minimumStability;
			};
			$scope.isCompleted = function(test) {
			
				return $rootScope.test.chapters[test].completed || false;
			};
			$scope.testResult = function() {
				
				$scope.resultShowed = !$scope.resultShowed;
			};
		}])
		//Controller of answers:
		.controller('AnswersController', ['$scope', '$rootScope', function($scope, $rootScope) {
			//for checkboxes:
			$scope.addAnswer = function(i) {
				
			};
			//for radios:
			$scope.setAnswer = function(test, cqIdx, i) {
				
				$rootScope.test.chapters[test].questions[cqIdx].answered = i;
			};
		}]);

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
			
			var _showTestForm = function(chptr) {
				
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
			
			$scope.beginTest = function(chptr) {
				
				var _quests = $rootScope.quiz.chapters[chptr].questions;
				
				for(var i = 0; i < _quests.length; i++) {
					
					delete _quests[i].answered;
				}
				
				$rootScope.quiz.chapters[chptr].result = null;
				
				_showTestForm(chptr);
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
		.controller('TestCtrl', ['$scope', '$interval', '$rootScope', '$modalInstance', 'chapter', function($scope, $interval, $rootScope, $modalInstance, chapter) {
			
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
			
			$rootScope.$on('timerExpired', function() {
				
				$scope.isCompleted = true;
				//$modalInstance.close($scope.result);
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
			
			$scope.getTimeoutValue = function(chptr) {
				
				return $rootScope.quiz.chapters[chptr].time || null;
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
		}]);
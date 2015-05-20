
	angular
		.module('app.controllers')
		
		/* The controller of certain Test: */
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
			
			(function() {
				
				//shuffle function:
				var _shuffleArr = function(arr) {
					
					for(var i = 0, x, j = 0; i < arr.length; i++, j = Math.floor(Math.random()*i)) {
						
						x = arr[i]; arr[i] = arr[j]; arr[j] = x;
					}
					
					return arr;
				};
				
				var _questions = $rootScope.quiz.chapters[chapter].questions;
				
				//do shuffle all answers:
				for(var i = 0; i < _questions.length; i++) {
					
					for(var j = 0; j < _questions[i].answers.length; j++) {
						
						_questions[i].answers = _shuffleArr(_questions[i].answers);
					}
				}
				
			})();
			
			$scope.getQuestion = function(idx) {
				
				return $rootScope.quiz.chapters[chapter].questions[idx] || null;
			};
			
			var _checkAnswer = function(answr) {
				
				return ($rootScope.quiz.chapters[chapter].questions[$scope.cqIdx].answers[answr].isRight);
				//return (answr === $rootScope.quiz.chapters[chapter].questions[$scope.cqIdx].rightAnswer);
			};
			
			$scope.rightAnswer = function(cIdx) {
				
				var _answrs = $rootScope.quiz.chapters[chapter].questions[cIdx].answers;
				
				for(var i = 0; i < _answrs.length; i++) {
					
					if (_answrs[i].isRight) {
						
						return i;
					}
				}
				
				return undefined;
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
		}]);
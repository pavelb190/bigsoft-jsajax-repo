
	angular
		.module('app.controllers')
		
		/* The Chapter controller: */
		.controller('ChapterCtrl', ['$scope', '$modal', '$rootScope', function($scope, $modal, $rootScope) {
			
			//$scope.cqIdx = 0;
			//$scope.result = false;
			
			var _setNextChapterAvailable = function(chptr, availble) {
				
				var _chapters = $rootScope.quiz.chapters,
					_curLvl = _chapters[chptr].level;
				
				for(var chapter in _chapters) {
					
					if (_chapters[chapter].level == _curLvl+1) {
						
						_chapters[chapter].available = availble;
					}
					else if (_chapters[chapter].level > _curLvl+1) {
						
						_chapters[chapter].available = false;
					}
				}
			};
			
			var _isLastChapter = function(chptr) {
				
				var _chapters = $rootScope.quiz.chapters,
					_curLvl = _chapters[chptr].level;
				
				for(var chapter in _chapters) {
					
					if (_chapters[chapter].level > _curLvl) {
						
						return false;
					}
				}
				return true;
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
						
						if (_isLastChapter(chptr)) {
							
							$rootScope.$broadcast('testingIsComplete');
						};
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
		}]);
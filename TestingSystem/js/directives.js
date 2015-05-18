
	angular
		.module('app.directives', [])
		
		.directive('timer', ['$interval', '$rootScope', function($interval, $rootScope) {
			
			return {
			
				template: '<span><img class="timer-icon" src="images/chronometer.png"/>{{formatter | date:\'mm:ss\'}}</span>',
				
				scope: {
					time: "@init"
				},
				
				controller: function($scope, $element) {
					
					var _start = ($scope.time ? $scope.time * 60 : null),
						//for Timer:
						timer;
					
					if (_start !== null) {
						
						var _$timerIcon = $($element).find('.timer-icon');
						
						var blinking;
						
						timer = $interval(function() {
							
							if (_start === 0) {
								
								$rootScope.$broadcast('timerExpired');
								
								if (angular.isDefined(blinking)) {
									
									$interval.cancel(blinking);
								}
								
								$interval.cancel(timer);
							}
							
							var _curr = new Date();
							
							_curr.setMinutes(Math.floor(_start / 60));
							
							_curr.setSeconds(_start % 60);
							
							$scope.formatter = _curr;
							
							_$timerIcon.css('display', "inline-block");
							
							_start -= 1;
							
							if (_start < 30) {
								
								$element.addClass('last-minute');
							}
							
							if (_start < 10) {
								
								$element.addClass('last-seconds');
								
								if (!angular.isDefined(blinking)) {
									
									blinking = $interval(function() {
										
										$($element).toggleClass('invisible');
										
									}, 150);
								}
							}
						}, 1000);
					}
					
					$scope.$on('$destroy', function() {
						
						if (angular.isDefined(timer)) {
						
							$interval.cancel(timer);
							
							if (angular.isDefined(blinking)) {
								
								$interval.cancel(blinking);
							}
						}
					});
				}
			};
		}]);
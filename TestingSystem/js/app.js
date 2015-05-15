	
	angular
		.module('TestingSystem',
				[
					'ui.bootstrap',
					'app.filters',
					'app.controllers'
				]
			)
		//The App-Services:
		.service('Quiz', ['$http', function($http) {	//get Quiz;
			
			this.get = function(quiz, succss) {
				
				var _this = this,
					_quiz = {};
				
				$http
					.get('test-questions/' + quiz + '.json')
					.success(function(data, sts, hdrs, cfg) {
						
						_quiz = data;
						
						//Set unavailable chapters...:
						angular.forEach(_quiz.chapters, function(chptr, k) {
							//but the first..:
							chptr.available = (chptr.level > 1 ? false : true);
						});
						
						succss.apply(_this, [_quiz]);
					})
					.error(function(data, sts, hdrs, cfg) {
					
						alert('[Getting test questions.] Some error has occured!');
					});
				
				return _quiz;
			};
		}]);
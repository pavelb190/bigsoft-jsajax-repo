
	angular
		.module('app.services', [])
		
		//The App-Services:
		.service('quiz', ['$http', function($http) {	//get Quiz;
			
			var _quiz = null;
			
			this.get = function(quiz, succss) {
				
				var _this = this;
				
				$http
					.get('test-questions/' + quiz + '.json')
					.success(function(data, sts, hdrs, cfg) {
						
						_quiz = data;
						
						//Set unavailable chapters...:
						angular.forEach(_quiz.chapters, function(chptr, k) {
							//but the first..:
							chptr.available = (chptr.level > 1 ? false : true);
						});
						
						if (angular.isDefined(succss)) {
						
							succss.apply(_this, [_quiz]);
						}
					})
					.error(function(data, sts, hdrs, cfg) {
						
						alert('[Getting test questions.] Some error has occured!');
						
						_quiz = false;
					});
				
				return _quiz;
			};
			
			/*
			this.getQuestions = function(chptr) {
				
				if (null === _quiz) {
					
					throw new Error('Quiz has not been loaded!');
				}
			};
			*/
		}]);
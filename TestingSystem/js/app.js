	
	angular
		.module('TestingSystem',
				[
					'app.filters',
					'app.controllers'
				]
			)
		//The App-Services:
		.service('getQuestionList', ['$http', '$rootScope', function($http, $rootScope) {
		
			/*
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
			*/
			
		}])
		.run(['$rootScope', 'getQuestionList', function($rootScope, getQuestionList) {
			
			//alert(getQuestionList);
		}]);
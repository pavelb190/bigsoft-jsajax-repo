
	angular
		.module('app.controllers', [])
		
		//Custom directive:
		.directive('progressBar', [function() {
			
			return {
				template: '<div style="float: left; text-align: left; width: 100%; margin-bottom: 3px;">' +
						//'{{getNumber(4)}}' +
						'<table style="width: 100%;" border="0">' +
							'<tr style="height: 4px;">' +
								'<td ng-class="{\'skipped\': getQuestion($index).answered === null, \'completed\': getQuestion($index).answered === rightAnswer($index), \'failed\': (getQuestion($index).answered !== undefined && getQuestion($index).answered !== null) && getQuestion($index).answered !== rightAnswer($index)}" ng-repeat="i in getNumber(getQuestionCount(chapter))"></td>' +
							'</tr>' +
						'</table>' +
					'</div>'
			};
		}]);
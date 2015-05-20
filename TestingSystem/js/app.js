	
	var app =
			/* The App's instantiating: */
			angular
				.module('TestingSystem',
						[
							'ui.bootstrap',
							'ngRoute',
							'app.services',
							'app.filters',
							'app.controllers',
							'app.directives'
						]
					)
				.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
					
					$routeProvider
						.when('/login', {
							controller: 'LoginCtrl',
							templateUrl: 'js/partials/login.html'
						})
						.when('/', {
							controller: 'TestingCtrl',
							templateUrl: 'js/partials/main.html'
						})
						.otherwise({
							redirectTo: '/login'
						});
				}]);
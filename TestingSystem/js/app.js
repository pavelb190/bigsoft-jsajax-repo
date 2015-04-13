	
	(function() {
		
		var app = angular.module('TestingSystem', []);
		
		app.controller('TestingController', function() {
			this.questions = questions;
		});
		
		var questions = [
			{
				section: "Introduction",
				questions: [
					{
						question: 'What?'
					},
					{
						question: 'Where?'
					},
					{
						question: 'When?'
					}
				]
			},
			{
				section: "Basics",
				questions: [
					{
						question: 'What2?'
					},
					{
						question: 'Where2?'
					},
					{
						question: 'When2?'
					}
				]
			},
			{
				section: "Advanced",
				questions: [
					{
						question: 'What2?'
					},
					{
						question: 'Where2?'
					},
					{
						question: 'When2?'
					}
				]
			},
			{
				section: "Frameworks",
				questions: [
					{
						question: 'What3?'
					},
					{
						question: 'Where3?'
					},
					{
						question: 'When3?'
					}
				]
			}
		];
	})();
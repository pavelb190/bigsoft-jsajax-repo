
	angular
		.module('app.filters', [])
		//The App-Filters:
		.filter('orderChaptsBy', function() {
			
			return function(itms, fld, revrs) {
				
				var _filtered = [];
				
				angular.forEach(itms, function(item, k) {
					
					item.title = k;
					
					_filtered.push(item);
				});
				
				_filtered.sort(function(a, b) {
					
					return (a[fld] < b[fld] ? -1 : (b[fld] < a[fld] ? 1 : 0));
				});
				
				if (revrs) { _filtered.reverse(); }
				
				return _filtered;
			};
		});
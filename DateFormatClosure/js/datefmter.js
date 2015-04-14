	
	
	/*Date format closure example;*/
	var date = function(dt) {
		//Instantiate internal date object (field);
		var _dt = dt;
		//formatter...
		return function(frmt, separ) {
			var dd = _dt.getDate(),         //the days number;
				mm = _dt.getMonth()+1,      //the month number;
				yyyy = _dt.getFullYear();   //the full year number (four digits);
			
			//Complete month-string: '03' instead '3':
			mm = (""+mm).length < 2 ? ("0"+mm) : mm;
			
			//The Date Patterns:
			switch (frmt) {
				case 'Yyyy-dd-mm':
					return [yyyy, dd, mm].join(separ || '-');
				case 'Yyyy-mm-dd':
					return [yyyy, mm, dd].join(separ || '-');
				case 'mm-dd-Yyyy':
					return [mm, dd, yyyy].join(separ || '-');
				case 'dd.mm.Yyyy':
					//It's a Default pattern..:
				default:
					//default pattern:
					return [dd, mm, yyyy].join(separ || '.');
			};
		};
	};
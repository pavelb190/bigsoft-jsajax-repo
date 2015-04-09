	
	/* For Integers only;*/
	function multiply(a, b) {
		var _a = Math.abs(a),
			_b = Math.abs(b),
		//The Sign of result:
			sign = ((a < 0 && b > 0) || (b < 0 && a > 0) ? "-" : ""),
		//Result:
			multi = 0;
		
		for(var i = 0; i < _a; i++) {
			multi += _b;
		}
		return parseInt(sign+multi);
	}
	
	//Positive values only;
	function fibonacci(n) {
		if (n === 0 || n === 1) { return n;}
		var x = 0,
			y = 1,
			summ = 0;
		for(var i = 2; i <= n; i++) {
			summ = x + y;
			x = y;
			y = summ;
		}
		return summ;
	}
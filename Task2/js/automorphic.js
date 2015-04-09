	
	function isAutomorphic(n) {
		var n_str = ""+n;       //n to string,
			sqr_str = ""+(n*n); //n^2, to string;
			
		return (n_str === sqr_str.substr(sqr_str.length - n_str.length));
	}

	function age_category(age) {
		var _test = parseFloat(age);
		if (!_test) {
			return 'undefined';
		}
		if (age < 13) {
			return 'Детство';
		} else if (age <= 15) {
			return 'Юность';
		} else if (age <= 30) {
			return 'Молодость';
		} else if (age < 60) {
			return 'Зрелость';
		} else {
			return 'Старость';
		}
	}
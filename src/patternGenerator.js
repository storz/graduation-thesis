var patterns = [0,1,2,3];

patterns.forEach(function (first, index, patterns) {
	var newPat = patterns.concat();
	newPat.splice(index, 1)
	newPat.forEach(function (second, index, patterns) {
		var newPat = patterns.concat()
		newPat.splice(index, 1)
		newPat.forEach(function (third, index, patterns) {
			var newPat = patterns.concat()
			newPat.splice(index, 1)
			newPat.forEach(function (fourth, index, patterns) {
				console.log('[' + first + ',' + second + ',' + third + ',' + fourth + '],');
			})
		})
	})
});

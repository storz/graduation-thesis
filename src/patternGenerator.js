var patterns = [0,1,2,3];
var i = 0;


function c(n) {
	if (n === 0) return 'A';
	if (n === 1) return 'B';
	if (n === 2) return 'C';
	if (n === 3) return 'D';
}

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
				console.log(i + ' & ' + c(first) + '→' + c(second) + '→' + c(third) + '→' + c(fourth) + ' \\\\');
				i++;
			})
		})
	})
});

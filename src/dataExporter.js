var fs = require('fs')
	path = require('path');

var scriptDir = path.dirname(process.argv[1]);
var rootDir = path.resolve(scriptDir, '..');

var convert = function (data) {
	return new Buffer(data, 'base64').toString('utf8');
};

var files = fs.readdirSync(rootDir + '/experimentData');
console.log(files);

files.forEach(function (fileName) {
	if (fileName === 'converted') return;
	fs.readFile(rootDir + '/experimentData/' + fileName, 'utf8', function (error, data) {
		if (error) console.log(error);
		var output = convert(data.toString('base64'));
		fs.writeFile(rootDir + '/rawData/' + fileName, output, 'utf8', function () {
			if (error) return console.log('error:' + error);
			console.log('saved:' + fileName);
			fs.rename(rootDir + '/experimentData/' + fileName, rootDir + '/experimentData/converted/' + fileName);
		});
	});
});

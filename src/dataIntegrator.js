var fs   = require('fs'),
	path = require('path'),
	date = require('date-utils'),
	_    = require('underscore');
var scriptDir = path.dirname(process.argv[1]);
var users     = require(scriptDir + '/users.js').users;
var rootDir   = path.resolve(scriptDir, '..');

var files = fs.readdirSync(rootDir + '/rawData');
//console.log(files);
var exData = {};

var allDataHeader = [
	'name', 'id', 'pattern', 'date', 'result', 'notification_result', 'passcode_result', 'cause', 'time', 'days'
]
var allDataOutput = [allDataHeader];
/*
var autoTermOutput = allDataOutput.concat();
var autoCycleOutput = allDataOutput.concat();
var manualOutput = allDataOutput.concat();
var pinOutput = allDataOutput.concat();
*/

files.forEach(function (fileName) {
	if (!fileName.match(/\.json/)) return;
	var userId = fileName.replace(/exData_/, '').replace(/\.json/, '').slice(0, 6);
	var json = fs.readFileSync(rootDir + '/rawData/' + fileName).toString();
	var userData = JSON.parse(json);
	exData[userId] = userData;
	console.log(userId, _.keys(userData));
});

users.forEach(function (user) {
	var userId = user.id.slice(0, 6)
	var eachData = exData[userId];
	var counter = 0;
	for (var pattern in eachData) {
		var startDate = new Date(eachData[pattern][0]['date']);
		eachData[pattern].forEach(function (d) {
			var cause = '';
			if (d.result === 'Failure') {
				if (d.eachResult.notification === d.eachResult.passcode) cause = 'both';
				else if (d.eachResult.notification === 'false') cause = 'notification';
				else cause = 'passcode';
			}
			var hourDiff = startDate.getHoursBetween(new Date(d.date));
			var daysDiff = Math.round(hourDiff/24);
			if (daysDiff === 9) daysDiff = 8;
			var result = [
				'Anonymous',//user.name, NOTICE:Don't show for privacy
				userId,
				pattern,
				d.date,
				(d.result == 'Success') ? 1 : 0,
				d.eachResult.notification,
				d.eachResult.passcode,
				cause,
				d.time,
				daysDiff
			];
			//console.log(userId)
			//console.log(daysDiff, allDataOutput[allDataOutput.length - 1][9]);
			if (pattern == allDataOutput[allDataOutput.length - 1][2] &&
				daysDiff == allDataOutput[allDataOutput.length - 1][9]) return;
			allDataOutput.push(result);
			counter++;
			/*
			switch (pattern) {
				case 'auto_term':
					autoTermOutput.push(result);
					break;
				case 'auto_cycle':
					autoCycleOutput.push(result);
					break;
				case 'manual':
					manualOutput.push(result);
					break;
				case 'pin':
					pinOutput.push(result);
					break;
			}*/
		})
	}
	if (counter === 16) console.log('☑' + userId)
	else console.log('☐' + userId)
});

function convertToCSV (twoDimArr) {
	var rows = [];
	twoDimArr.forEach(function (row) {
		rows.push(row.join(','))
	});
	return rows.join('\n');
}

//console.log(allDataOutput)

fs.writeFile(rootDir + '/drive/full_data.csv', convertToCSV(allDataOutput), 'utf8');
fs.writeFile('/Users/storz/Dropbox/Public/_docs/full_data.csv', convertToCSV(allDataOutput), 'utf8');
/*
fs.writeFile(rootDir + '/docs/auto_term.csv', convertToCSV(autoTermOutput), 'utf8');
fs.writeFile(rootDir + '/docs/auto_cycle.csv', convertToCSV(autoCycleOutput), 'utf8');
fs.writeFile(rootDir + '/docs/manual.csv', convertToCSV(manualOutput), 'utf8');
fs.writeFile(rootDir + '/docs/pin.csv', convertToCSV(pinOutput), 'utf8');
*/

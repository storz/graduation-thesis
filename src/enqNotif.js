var date = require('date-utils');
var _ = require('underscore');
var longjohn = require('longjohn');
var path = require('path');
var users = require(path.dirname(process.argv[1]) + '/users.js').users;
var today = new Date();
console.log('today:', today);

var days = [0,1,3,8];
var allDays = [];
var d = 0;
for(var i = 0; i < 4; i++) {
	for(var j = 0; j < days.length; j++) {
		if (j != 0) d += (days[j] - days[j-1]);
		allDays.push(d);
	}
}
console.log(allDays);

var scheduleName = ['Auto Mode Type Term (Auto 1)', 'Auto Mode Type Cycle (Auto 2)', 'Manual Mode', 'PIN Mode'];
var scheduleDescription = ['何日前から何日間で設定し、鍵が自動で選ばれるもの', '何曜日の何時で設定し、鍵が自動で選ばれるもの', '最初に一つだけ鍵を選ぶもの', 'パスコードが5桁になっているもの'];
var scheduleTable = [
	[0,1,2,3],
	[0,1,3,2],
	[0,2,1,3],
	[0,2,3,1],
	[0,3,1,2],
	[0,3,2,1],
	[1,0,2,3],
	[1,0,3,2],
	[1,2,0,3],
	[1,2,3,0],
	[1,3,0,2],
	[1,3,2,0],
	[2,0,1,3],
	[2,0,3,1],
	[2,1,0,3],
	[2,1,3,0],
	[2,3,0,1],
	[2,3,1,0],
	[3,0,1,2],
	[3,0,2,1],
	[3,1,0,2],
	[3,1,2,0],
	[3,2,0,1],
	[3,2,1,0],
];

var enqueteMailTemplateStr = '<%= name %>様\n\nお世話になっております。\nこのメールは第2周目までの実験を終えている方に送信しています。\n以下のリンクよりアンケートにお答え下さい。\nhttps://docs.google.com/forms/d/1Kboe8GcON9XWepOD-w6LnT6PZSaplDQlZuPkZI5fFVs/viewform\n<%= name %>様は\n1周目: <%= first %>\n2周目: <%= second %>\nで実験を行っています。\nまた、何かご不明な点がある場合はお気軽にご相談下さい。\n残りの実験にもご協力のほど、宜しくお願い申し上げます。\n\n高浪\n';
var enqueteMailTemplate = _.template(enqueteMailTemplateStr);

function printMail(user) {
	var firstIndex = scheduleTable[user.scheduleNo][0];
	var secondIndex = scheduleTable[user.scheduleNo][1];
	var param = {
		name: user.name,
		first: scheduleName[firstIndex] + '(' + scheduleDescription[firstIndex] + ')',
		second: scheduleName[secondIndex] + '(' + scheduleDescription[secondIndex] + ')',
	}
	return enqueteMailTemplate(param);
}

users.forEach(function (user) {
	var schedule = scheduleTable[user.scheduleNo];
	var day = allDays[7]
	var interim = new Date(user.start).addDays(day);
	if (interim < today) {
		console.log(printMail(user));
		console.log('-----------------------------------------')
	}
});

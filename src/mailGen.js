var date = require('date-utils');
var _ = require('underscore');
var longjohn = require('longjohn');
var mail = require('mail').Mail({
	host: 'smtp.gmail.com',
	username: 'satorutakanami@gmail.com',
	password: 'Nostrilium3106',
	insecureAuth: false,
});
var path = require('path');
var users = require(path.dirname(process.argv[1]) + '/users.js').users;
var today = new Date().toFormat('YYYY/MM/DD');
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

var notificationMailTemplateStr = '<%= name %>様\n\nお世話になっております。本日は「<%= mode %>」の第<%= progress %>回目の実験実施日となっております。\n既に実験がお済みでしたらご容赦下さい。\n<% if(isEnd) { %>本日の実験にて、全日程が終了です。\n一ヶ月間、ご協力ありがとうございました。\nなお、後ほどアンケートをお送りさせていただきます。\nご協力のほど、何卒宜しくお願い申し上げます。<% } else { %><% if(nextPattern) { %>なお、本日の実験終了後に「Settings」→「<%= nextPattern %>」を設定し、すぐに初回の実験を行って下さい。<% } else { %>次回実験日は<%= nextDay %>日後の<%= nextDate %>です。<% } %>\n今後共、ご協力のほど、宜しくお願い申し上げます。<% } %>\n\n(このメールは自動送信です)\n--\n--------------------\n高浪 悟\n電気通信大学 情報理工学部\n総合情報学科 高田研究室 B4\n\n080-4289-0584\nsatorutakanami@gmail.com\n--------------------'
var notificationMailTemplate = _.template(notificationMailTemplateStr);

function printNotificationMail(user, progress) {
	var param = {
		name: user.name,
		mode: scheduleName[scheduleTable[user.scheduleNo][Math.floor((progress)/4)]],
		progress: progress % 4 + 1,
		nextDay: allDays[progress + 1] - allDays[progress],
		nextDate: new Date(user.start).addDays(allDays[progress + 1]).toFormat('MM/DD'),
		isEnd: (progress === allDays.length - 1) ? true : false,
		nextPattern: (progress % 4 === 3 && progress !== allDays.length - 1) ? scheduleName[scheduleTable[user.scheduleNo][Math.floor((progress)/4) + 1]] : false
	}
	return notificationMailTemplate(param);
}

function sendMail (to, subject, body) {
	//console.log(body);
	//return;
	try {
		mail.message({
			from: 'satorutakanami@gmail.com',
			to: to,
			subject: '[Notifauth]=?ISO-2022-JP?B?GyRCPEI4MyROJCpDTiRpJDsbKEI=?=(' + today + ')',
		}).body(body).send(function (error) {
			if (error) {
				//throw error;
			}
			else console.log('Sent To ' + to);
		});
	} catch(error) {
		//console.log('Error: ' + error);
	}
}

users.forEach(function (user) {
	var schedule = scheduleTable[user.scheduleNo];
	for (var progress = 0, l = allDays.length; progress < l; progress++) {
		day = allDays[progress];
		var book = new Date(user.start).addDays(day).toFormat('YYYY/MM/DD');
		if (book === today) {
			if (progress > 0) sendMail(
				(_.isArray(user.mail)) ? user.mail : [user.mail],
				'[Notifauth]実験のお知らせ',
				printNotificationMail(user, progress));
			//else printInitialMail(user);
			break;
		}
	}
});

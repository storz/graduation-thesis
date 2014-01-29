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

var enqueteMailTemplateStr = '<%= name %>様\n\nお世話になっております。\nこのメールは4種類全ての実験を終えた方に送信しています。\n長期間にわたるアプリケーションを用いた実験協力、本当にありがとうございました。\n期限付きで申し訳ないのですが1/30までに、以下のリンクより最終アンケートにお答え下さい。今回の実験でこちらからお願いすることは、これで最後になります。\nhttps://docs.google.com/forms/d/1z8TMG74fObb0w5WSB-2WLqovTyOpJe9E2iG3WS9OV5g/viewform\n<%= name %>様は\n1周目: <%= first %>\n2周目: <%= second %>\n3周目: <%= third %>\n4周目: <%= fourth %>\nで実験を行っています。\n<% if (isAnsweredToInterim) { %>中間アンケートの内容と一部重複しているものがありますが、すべての認証手法の実験を終わった上であらためて意見をお聞かせ頂きたく思います。\n自由記述に関しては、同じ内容を書くのは少々面倒かと思われますので、中間アンケートと同じ内容であればその旨を記載して頂ければ大丈夫です。<% } else { %>加えて、中間アンケートにお答え頂いていないようですので、最初のページの質問には全てお答え下さいますよう、何卒よろしくお願い申し上げます。<% } %>\nまた、何かご不明な点がある場合はお気軽にご相談下さい。\n論文が完成次第，改めてお礼のご連絡を差し上げます。\n\n高浪\n';
var enqueteMailTemplate = _.template(enqueteMailTemplateStr);

function printMail(user) {
	var firstIndex = scheduleTable[user.scheduleNo][0];
	var secondIndex = scheduleTable[user.scheduleNo][1];
	var thirdIndex = scheduleTable[user.scheduleNo][2];
	var fourthIndex = scheduleTable[user.scheduleNo][3];
	var param = {
		name: user.name,
		first: scheduleName[firstIndex] + '(' + scheduleDescription[firstIndex] + ')',
		second: scheduleName[secondIndex] + '(' + scheduleDescription[secondIndex] + ')',
		third: scheduleName[thirdIndex] + '(' + scheduleDescription[thirdIndex] + ')',
		fourth: scheduleName[fourthIndex] + '(' + scheduleDescription[fourthIndex] + ')',
		isAnsweredToInterim: user.isAnsweredToInterim
	}
	return enqueteMailTemplate(param);
}

users.forEach(function (user) {
	var schedule = scheduleTable[user.scheduleNo];
	var day = allDays[15]
	var interim = new Date(user.start).addDays(day);
	if (interim < today && !user.isCompleted) {
		console.log(printMail(user));
		console.log('-----------------------------------------')
	}
});

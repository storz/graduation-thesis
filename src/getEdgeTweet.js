var Twitter = require('ntwitter');
var date = require('date-utils');
var today = new Date();

var twitter = new Twitter({
	consumer_key:        'lW2RbLpdtqEDiW5Ru9myw',
	consumer_secret:     'JPb7MkYtoSNSReqosWc7Ncxvtn8XgdU8T9hSDe56Rc',
	access_token_key:    '12107072-MKrjA6BezjxUc4CS1ed53yJ3okUUCM10MKAjtL0bf',
	access_token_secret: 'CZnMfUcrhl4I6Tz9cSuUUPx79uUWM7c2IExDMuALQE'
});

var count = 0;
var param = {screen_name: 'No60996', count: 200, include_rts: false};

var getTweets = function (before) {
	if (before) param.max_id = before;
	twitter.getUserTimeline(param, function (err, data) {
		if (err) throw err;
		if (count > 1000 || data.length == 1) return calcTweetsPerDay(new Date(data[data.length - 1].created_at));
		count += data.length;
		//console.log(data)
		getTweets(data[data.length - 1].id_str);
	});
}

getTweets();

var calcTweetsPerDay = function (created_at) {
	console.log(today)
	console.log(created_at);
	console.log(count, '/', created_at.getDaysBetween(today), '=', count/created_at.getDaysBetween(today));
}

//calcTweetsPerDay(new Date('Sun Nov 24 11:27:53 +0000 2013'));

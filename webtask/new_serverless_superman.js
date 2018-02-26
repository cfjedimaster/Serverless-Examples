'use strict';
const Twit = require('twit');
let T = null; 

module.exports = function (context,cb) {
	console.log('Began Serverless Superman');

	T = new Twit({
		consumer_key:         context.secrets.consumer_key,
		consumer_secret:      context.secrets.consumer_secret,
		access_token:         context.secrets.access_token,
		access_token_secret:  context.secrets.access_token_secret,
		timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
	});

	searchForServerless()
	.then(results => {
		console.log('I got '+results.length+' results');
		if(results.length === 0) {
			return cb(null, {result:0});
		}

		//filter again
		let tweets = filterTweets(results);
		console.log('I now have '+tweets.length+' results');
		if(tweets.length === 0) {
			return cb(null, {result:0});
		}
		
		//now pick one
		let newText = '';
    let chosen = tweets[ Math.floor(Math.random() * (tweets.length))];
    //console.log('chosen is '+JSON.stringify(chosen));
    if(chosen.text.toLowerCase().indexOf('serverless') !== -1) {
      newText = chosen.text.replace(/serverless/ig, "Superman");
    }

		if(newText === '') {
		  console.log('left early cuz newText was blank');
			return cb(null, {result:0});
		}

    console.log('newText='+newText);
    T.post('statuses/update', { status: newText }, function(err, data, response) {
      cb(null, {result:newText});
    });

	})
	.catch(e => {
	  console.log(e);
	});
}

function searchForServerless() {
	return new Promise((resolve, reject) => {

		let now = new Date();
		let datestr = now.getFullYear() + '-'+(now.getMonth()+1)+'-'+now.getDate();

		T.get('search/tweets', { q: 'serverless since:'+datestr, count: 100 }, function(err, data, response) {
			resolve(data.statuses);
		})

	});
}

function filterTweets(tweets) {
		// http://stackoverflow.com/a/7709819/52160
		let diffInMinutes = function(d1,d2) {
			var diffMs = (d1 - d2);
			var diffDays = Math.floor(diffMs / 86400000); // days
			var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
			var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
			return diffMins;
		}

		//if a tweet is older than this in minutes, kill it
		const TOO_OLD = 30;
		
		let now = new Date();
		let result = tweets.filter( (tweet) => {
			//no replies
			if(tweet.in_reply_to_status_id) return false;
			//no RTs
			if(tweet.retweeted_status) return false;

			// http://stackoverflow.com/a/2766516/52160
			let date = new Date(
			tweet.created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,
			"$1 $2 $4 $3 UTC"));

			let age = diffInMinutes(now, date);
			if(age > TOO_OLD) return false;

			if(tweet.text.toLowerCase().indexOf("in my plan ... we are serverless") >= 0) return false;

			return true;
		});

		//now map it
		result = result.map( (tweet) => {
			return {
				id:tweet.id,
				text:tweet.text,
				created_at:tweet.created_at,
				hashtags:tweet.entities.hashtags
			};
		});

		return result;
}
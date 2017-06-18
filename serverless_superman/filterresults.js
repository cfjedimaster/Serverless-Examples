
/*
given an array of tweets, remove ones older than X minutes, and RTs, and replies
also, we remove a shit-ton of stuff from each tweet
*/

//if a tweet is older than this in minutes, kill it
const TOO_OLD = 30;

// http://stackoverflow.com/a/7709819/52160
function diffInMinutes(d1,d2) {
	var diffMs = (d1 - d2);
	var diffDays = Math.floor(diffMs / 86400000); // days
	var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
	return diffMins;
}

function main(args) {
	let now = new Date();

	let result = args.tweets.filter( (tweet) => {
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

	return { tweets:result };
}
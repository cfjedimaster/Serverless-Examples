

composer.sequence(
	// set up parameters for the twitter search
	args => {
		let now = new Date();
		let datestr = now.getFullYear() + '-'+(now.getMonth()+1)+'-'+now.getDate();

		return {
			term:"serverless",
			since:datestr
		}

	},

	// now ask twitter for the results
	'mytwitter/getTweets',

	// twitter's API is missing some stuff, so we filter more and massage
	args => {

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

	},

	//now we select one, if we even got one
	args => {
		let newText = '';

		if(args.tweets.length >= 1) {

	        let chosen = args.tweets[ Math.floor(Math.random() * (args.tweets.length))];
	        if(chosen.text.toLowerCase().indexOf('serverless') !== -1) {
		        newText = chosen.text.replace(/serverless/ig, "Superman");
			}
		}

		return { status:newText };
	},

	//if we got something, tweet it
	composer.if(({status})=> status != '', 'mytwitter/sendTweet')
);




/*
so i have an array of tweets. i pick one by random and replace serverless w/ superman
*/

function main(args) {

	return new Promise( (resolve, reject) => {

		if(args.tweets.length === 0) return reject("No tweets.");

		let chosen = args.tweets[ Math.floor(Math.random() * (args.tweets.length))];
		console.log('i chose '+JSON.stringify(chosen));

		if(chosen.text.toLowerCase().indexOf('serverless') === -1) return reject("No serverless mention");

		//todo - maybe loop to find another one if first item found didn't have the keyword

		let newText = chosen.text.replace(/serverless/ig, "Superman");
		console.log('new text is: '+newText);

		/*
		ok, so the next step it to tweet, for that, i need to pass:
		consumer_key
		consumer_secret
		access_token_key
		access_token_secret
		status
		*/
		resolve({
			consumer_key:args.consumer_key,
			consumer_secret:args.consumer_secret,
			access_token_key:args.access_token_key,
			access_token_secret:args.access_token_secret,
			status:newText
		});

	});

}
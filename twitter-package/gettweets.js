const Twitter = require('twitter');
const request = require('request');

//possibly cache BT
let BEARER_TOKEN = '';

//credit: https://github.com/desmondmorris/node-twitter/issues/112
function getBearerToken(key,secret) {
	
	return new Promise( (resolve, reject) => {

		if(BEARER_TOKEN != '') return resolve(BEARER_TOKEN);
		console.log('getting BT from Twitter');

		let enc_secret = new Buffer(key + ':' + secret).toString('base64');
		let options = {
			url: 'https://api.twitter.com/oauth2/token',
			headers: {'Authorization': 'Basic ' + enc_secret, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
			body: 'grant_type=client_credentials'
		};

		request.post(options, function(e, r, body) {
			if(e) return reject(e);
			let bod = JSON.parse(body);
			let bearer = bod.access_token;
			BEARER_TOKEN = bearer;
			resolve(bearer);
		});

	});

}

/*
main purpose is to generate a search string
form of search:
args.account (to get by account)
args.term (raw term)

more to come maybe
*/
function createSearchString(args) {

	let result = '';
	if(args.term) result += ' '+args.term;
	if(args.account) result += ' from:' + args.account;
	return result;
}

function main(args) {

	
	return new Promise( (resolve, reject) => {

		getBearerToken(args.consumer_key, args.consumer_secret).then( (bearer_token) => {

			let client = new Twitter({
				consumer_key:args.consumer_key,
				consumer_secret:args.consumer_secret,
				bearer_token:bearer_token
			});

			let search = createSearchString(args);
			client.get('search/tweets', {q:search}, function(err, tweets, response) {
				if(err) return reject(err);
				resolve(tweets.statuses);
			});
			
		});





	});

}

exports.main = main;
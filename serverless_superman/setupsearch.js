
/*
I basically set up the args to pass to twitter/search
*/
function main(args) {

	let now = new Date();
	let datestr = now.getFullYear() + '-'+(now.getMonth()+1)+'-'+now.getDate();

	let result = {
		term:"serverless",
		since:datestr,
		consumer_key:args.consumer_key,
		consumer_secret:args.consumer_secret
	}

	return result;

}
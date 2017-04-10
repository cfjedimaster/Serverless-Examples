


function main(args) {

	/*
	only add if no retweeted status
	*/
	let string = args.tweets.reduce( (cur, val) => {
		if(val.text && !val.retweeted_status) cur+=' '+val.text;
		return cur;
	}, '').trim();

	return {
		text:string,
		sentences:false,
		isHTML:true
	}

}

exports.main = main;
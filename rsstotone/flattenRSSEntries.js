

function main(args) {

	let string = args.entries.reduce( (cur, val) => {
		if(val.description) cur+=val.description;
		return cur;
	}, '\n').trim();

	return {
		text:string,
		sentences:false,
		isHTML:true
	}

}

exports.main = main;
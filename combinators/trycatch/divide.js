function main(args) {

	if(args.error == null) args.error = false;

	if(!args.error) {
		return {result:1}
	} else {
		throw new Error('Oh Crap');
	}

}
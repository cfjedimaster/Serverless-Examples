function main(args) {

    if(!args.name) args.name = 'Nameless';
	let result = {
		string:'Hello '+args.name
	}

	return {
		result:result
	}

}

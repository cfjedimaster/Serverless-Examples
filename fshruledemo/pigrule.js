function main(args) {

	//remove 1.
	let text = args.rule.replace(/[0-9]+\. /,'');

	return {
		input:text
	}

}
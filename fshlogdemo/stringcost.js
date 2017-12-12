function main(args) {
	// I return the 'cost' of a string
	let cost = 0;

	if(args.input) {
		cost = args.input.length * 1000;
	}

	return { cost:cost };

}
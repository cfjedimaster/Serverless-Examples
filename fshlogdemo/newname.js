function main(args) {
	let name = '';

	if(args.title) name = args.title + ' ';

	if(Math.random() < 0.5) {
		name += 'Ray';
	} else {
		name += 'Jay';
	}

	return { name:name };
}
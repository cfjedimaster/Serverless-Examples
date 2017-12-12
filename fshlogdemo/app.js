

composer.sequence(
	'safeToDelete/newname',
	args => ({input: args.name.toUpperCase()}),
	'safeToDelete/stringcost'
);



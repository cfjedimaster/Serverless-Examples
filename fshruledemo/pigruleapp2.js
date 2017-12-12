
composer.sequence(
	'safeToDelete/rule',
	args => ({input: args.rule.replace(/[0-9]+\. /,'')}),
	'safeToDelete/pig'
);




/*
composer.sequence(
	composer.retain('watson/tone'), 
	composer.retain(
		composer.sequence(p => p.params, 'watson/pi')
	),
	p => ({pi:p.result, tone:p.params.result})
);
*/

/*
composer.try(
    'safeToDelete/tendividedby',
    args => ({result:'invalid input'})
);
*/

composer.sequence(
    composer.try(
        'safeToDelete/tendividedby',
        args => ({result:'invalid input'})
    ),
    'safeToDelete/final'        
)
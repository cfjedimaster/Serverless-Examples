
/*
Credit: Olivier Tardieu
http://researcher.ibm.com/researcher/view.php?person=us-tardieu
composer.sequence(composer.retain(a), composer.retain(composer.sequence(p => p.params, b), p => Object.assign(p.result, p.params.result), c)

*/

/*
composer.sequence(
	composer.retain('watson/tone'), 
	composer.retain(
		composer.sequence(p => p.params, 'watson/pi')
	),
	p => Object.assign(p.result, p.params.result)
);
*/

composer.sequence(
	composer.retain('watson/tone'), 
	composer.retain(
		composer.sequence(p => p.params, 'watson/pi')
	),
	p => ({pi:p.result, tone:p.params.result})
);


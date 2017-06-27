/*
For an action X
Taking all the activations I can get in one pull
Up from optional time Y
If the success rate is below Z% (default 100), 
return true
else return false

action: action to check
from: ms since epoch to start from, defaults to forever
rate: numeric value 0-100, defaults to 100
*/

const openwhisk = require('openwhisk');
// last time i checked, this was 200
const MAX_LIMIT = 200;

function main(args) {
	console.log(args.action);
	const ow = openwhisk();

	if(!args.action) {
		return {
			error:'Action argument not specified.'
		};
	}

	if(!args.from) {
		args.from = 0;
	}

	if(!args.rate) {
		args.rate = 100;
	}

	console.log(`Checking action ${args.action} starting at time ${args.from} and expecting a success rate of ${args.rate}%`);

	let status = false;

	return new Promise( (resolve, reject) => {
		ow.activations.list({
			name:args.action,
			limit:MAX_LIMIT,
			since:args.from,
			docs:true
		}).then((results) => {
			//early out
			if(results.length === 0) resolve({status:status});
			let total = results.length;

			let totalGood = results.reduce( (acc, val) => {
				if(val.response.success) return ++acc;
				return acc;
			},0);
			let successRate = Math.floor(totalGood/total*100);
			console.log(`${total} activations, ${totalGood} good, for a rate of ${successRate}%`);
			if(successRate < args.rate) status = true;
			resolve({status:status});
		});
	});

}
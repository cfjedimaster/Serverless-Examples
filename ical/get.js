const rp = require('request-promise');
const ical = require('ical.js');

function flattenEvent(e) {
	let event = {};
	for(let i=0;i<e[1].length;i++) {
		let prop = e[1][i];
		event[prop[0]] = prop[3];
		//console.log('e',prop);
	} 
	return event;
}

exports.main = (args) => {

	return new Promise((resolve, reject) => {
		rp(args.url).then((txt) => {
			try {
				let parsed = ical.parse(txt);
				let events = parsed[2];

				let result = [];
				events.forEach(e => result.push(flattenEvent(e)));
				resolve({events:result});
			} catch(e) {
				console.log(e);
				reject(e);
			}
		})
		.catch((e) => {
			reject(e);	
		});
	});
}


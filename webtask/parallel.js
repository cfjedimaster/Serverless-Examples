'use strict';

const rp = require('request-promise');

module.exports = function (options, cb) {
	console.log('compiler called', options.script);
	// assume its a json array
	let seq = JSON.parse(options.script);

	return cb(null, (context, req, res) => {

		let promises = [];

		// def not 100% sure
		let proto = req.headers['x-forwarded-proto']
		? req.headers['x-forwarded-proto']
		: 'https';
		let baseUrl = `${proto}://${req.headers.host}/`;
		console.log('new testand b='+baseUrl);

		seq.forEach(u => {
			promises.push(rp(baseUrl+u));
		});

		Promise.all(promises).then(result => {
			
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result));
		})
		.catch(e => {
			console.log('error');
			console.log(e);
		});

	});

};
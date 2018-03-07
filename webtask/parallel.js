'use strict';

const rp = require('request-promise');

module.exports = function (options, cb) {
	console.log('compiler called', options.script);
	// assume its a json array
	let seq = JSON.parse(options.script);

	seq = ['https://www.raymondcamden.com','https://www.cnn.com'];

	return cb(null, (context, req, res) => {

		console.log('entered CB');
		let promises = [];

		seq.forEach(u => {
			promises.push(rp(u));
		});
		console.log('pushed '+promises.length+' items');
		Promise.all(promises).then(result => {
			console.log('in the All for fetching them all.');
			console.log('result should be an arr i think? ',result.length);
			console.log('test', req.url);
			/*
			for(var x in req) {
				console.log('req',x);
			}
			*/
			let proto = req.headers['x-forwarded-proto']
            ? req.headers['x-forwarded-proto']
            : 'https';
			let baseUrl = `${proto}://${req.headers.host}/${req.x_wt.container}/`;
			console.log('new test proto='+proto+' and b='+baseUrl);
			
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result));
		})
		.catch(e => {
			console.log('error');
			console.log(e);
		});

	});

};
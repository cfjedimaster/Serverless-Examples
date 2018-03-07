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
			res.setHeader('Content-Type', 'application/json');
			for(x in res) {
				console.log('RES:'+x);
			}
			res.send(JSON.stringify(result));
		})
		.catch(e => {
			console.log('error');
			console.log(e);
		});

	});

};
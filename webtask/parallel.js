'use strict';

const rp = require('request-promise');

module.exports = function (options, cb) {
	console.log('compiler called', options.script);
	// assume its a json array
	let seq = JSON.parse(options.script);

	seq = ['https://www.raymondcamden.com','https://www.cnn.com'];

	let promises = [];

	seq.forEach(u => {
		promises.push(rp(u));
	});

	Promise.all(promises).then(result => {
		console.log('in the All for fetching them all.');
		console.log('result should be an arr i think? ',result.length);

		return cb(null, function (context, req, res) {
			res.send('new test');
			//cb(null, result);
		});
	
	}).catch(e => {
		console.log('Error, sad face...');
		console.log(e);
		cb(e);
	});

};
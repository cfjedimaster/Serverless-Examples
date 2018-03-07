'use strict';
module.exports = function (options, cb) {
	console.log('compiler called', options.script);
	// assume its a json array
	let seq = JSON.parse(options.script);

	return cb(null, function (cb) {
		cb(null, "I was sent "+seq.length+" items.");
	});
};
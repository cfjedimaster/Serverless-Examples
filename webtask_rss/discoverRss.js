'use strict';

const request = require('request');
const cheerio = require('cheerio');

module.exports = function(context, cb) {
	let url = '';
	if(context.body && context.body.url) url = context.body.url;
	if(context.query && context.query.url) url = context.query.url;
	if(url === '') cb(new Error('URL parameter not passed.'));

	request(url, (err, req, body) => {

		let $ = cheerio.load(body);
		let link = $('link[rel="alternate"][type="application/rss+xml"]');
		if(link.length === 1) {
			return cb(null, {result:link.attr('href')});
		}

		link = $('link[rel="alternate"][type="application/atom+xml"]');
		if(link.length === 1) {
			return cb(null, {result:link.attr('href')});
		}

		cb(null, { result:'' });

	});

}


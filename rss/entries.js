const request = require('request');
const parseString = require('xml2js').parseString;

function main(args) {

	return new Promise((resolve, reject) => {

		request.get(args.rssurl, function(error, response, body) {
			if(error) return reject(error);

			parseString(body, function(err, result) {
				if(err) return reject(err);
                resolve({entries:result.rss.channel[0].item});
			});

		});

	});
}

exports.main = main;

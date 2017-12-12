const request = require('request');
const parseString = require('xml2js').parseString;

function main(args) {

	return new Promise((resolve, reject) => {

		if(!args.rssurl) {
			reject({error:"Argument rssurl not passed."});
		}

		request.get(args.rssurl, function(error, response, body) {
			if(error) return reject(error);

			parseString(body, {explicitArray:false}, function(err, result) {
				if(err) return reject(err);
                resolve({entries:result.rss.channel.item});
			});

		});

	});
}

exports.main = main;

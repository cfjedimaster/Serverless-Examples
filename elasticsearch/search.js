
var elasticsearch = require('elasticsearch');

/*
required args:
url, username, password
index, type, body (json for search) or q
*/

function main(args) {

	let client = new elasticsearch.Client({
		host:args.url,
		httpAuth:args.username + ':' + args.password
	});

	return new Promise( (resolve, reject) => {

		let search = {
			index: args.index,
			type: args.type
		}

		if(args.q) {
			search.q = args.q;
		} else if (args.body) {
			searc.body = args.body;
		}

		client.search(search).then(function (resp) {
			resolve(resp);
		}, function (err) {
			reject(err);
		});


	});
}

exports.main = main;
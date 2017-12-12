
var elasticsearch = require('elasticsearch');

/*
required args:
url, username, password

body: array of items, see: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-bulk
index: default index
*/

function main(args) {

	console.log('running Bulk');
console.log('args', JSON.stringify(args));
	let client = new elasticsearch.Client({
		host:args.url,
		httpAuth:args.username + ':' + args.password
	});

	let apiArgs = {body:args.body};
	if(args.index) apiArgs.index = args.index;

	return new Promise( (resolve, reject) => {
		client.bulk(apiArgs).then(function (resp) {
			resolve(resp);
		}, function (err) {
			reject(err);
		});


	});
}

exports.main = main;
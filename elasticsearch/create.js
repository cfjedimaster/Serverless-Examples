
var elasticsearch = require('elasticsearch');

/*
required args:
url, username, password
index, type, body (json for content) 
id is optional (for updates)
*/

function main(args) {

    if(args.id) args.id = '';

	let client = new elasticsearch.Client({
		host:args.url,
		httpAuth:args.username + ':' + args.password
	});

	return new Promise( (resolve, reject) => {
		client.create({
            index:args.index,
            type:args.type,
            body:args.body,
            id:args.id
        }).then(function (resp) {
			resolve(resp);
		}, function (err) {
			reject(err);
		});


	});
}

exports.main = main;
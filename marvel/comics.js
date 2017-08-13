const request = require('request-promise');
const crypto = require('crypto');

const API = 'http://gateway.marvel.com/v1/public/comics?';

function main(args) {

	let url = API + `&apikey=${args.api_key}`;

	//Add optional filters
	if(args.limit) url += `&limit=${args.limit}`;
	if(args.format) url += `&format=${encodeURIComponent(args.format)}`;
	if(args.formatType) url += `&formatType=${encodeURIComponent(args.formatType)}`;
	if(args.dateRange) url += `&dateRange=${args.dateRange}`;
	//lots more go here

	let ts = new Date().getTime();
	let hash = crypto.createHash('md5').update(ts + args.private_key + args.api_key).digest('hex');
	url += `&ts=${ts}&hash=${hash}`;

	return new Promise((resolve, reject) => {

		let options = {
			url:url,
			json:true
		};

		request(options).then((result) => {
			resolve({result:result});
		})
		.catch((err) => {
			reject({error:err});
		});
	});

}
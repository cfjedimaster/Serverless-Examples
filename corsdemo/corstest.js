function main(args) {

    if(!args.name) args.name = 'Nameless';
	let result = {
		string:'Hello '+args.name
	}

	return {
		headers: { 
			'Access-Control-Allow-Origin':'*',
			'Content-Type':'application/json'
		}, 
		statusCode:200,
		body: new Buffer(JSON.stringify(result)).toString('base64')
	}

}

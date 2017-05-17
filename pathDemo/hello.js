function main(args) {

	if(args.__ow_path && args.__ow_path.length) {
		/*
		support /name/X only
		*/
		let parts = args.__ow_path.split('/');
		if(parts.length === 3 && parts[1].toLowerCase() === 'name') {
			args.name = parts[2];
		}
	}

	console.log('path='+args.__ow_path);

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
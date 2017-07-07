
function main(args) {
	return new Promise((resolve, reject) => {

		/*
		ok, so if #1 doesn't tie with #2, return "1 or maybe a 2"
		if it ties, return "1 or 2"
		*/
		let message = '';
		if(args.tags[0].score !== args.tags[1].score) {
			message = `I think this is a ${args.tags[0].class}. But it may be a ${args.tags[1].class}.`;
		} else {
			message = `I think this is a ${args.tags[0].class} or a ${args.tags[1].class}.`;
		}
		console.log('Message to send via SMS: '+message);

		resolve({
			headers:{
				'Content-Type':'text/xml'
			},
			body:'<Response><Message>'+message+'</Message></Response>'
		});

	});
}
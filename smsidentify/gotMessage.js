
const twilio = require('twilio');

function main(args) {

    var client = new twilio(args.accountSid, args.authToken);

	/*
	2 results.
	if they sent a picture, we pass the picture on as a result so it gets sent to the next action. 
	if they sent 2+, we ignore them.

	if they didn't send a picture, we do a text back saying we need a picture
	*/

	const badBody = `To use this service, send me an image. Thanks and have a nice day, human!`;
	const goodBody = `I got your picture. I'm working on identifying it now!`;

	return new Promise( (resolve, reject) => {

		if(Number(args.NumMedia) === 0) {
			console.log('no media, tell the user whatup');
			client.messages.create({
				body: badBody,
				to: args.From,  
				from: args.To
			})
			.then((message) => {
				resolve({error:'No image to identify'});
			})
			.catch(err => {
				console.log(err);
				reject({error:err});
			});
			
		} else {
			console.log('resolving image url of '+args.MediaUrl0);
			client.messages.create({
				body: goodBody,
				to: args.From,  
				from: args.To
			})
			.then((message) => {
				resolve({imageUrl:args.MediaUrl0, from:args.From, to:args.To});
			})
			.catch(err => {
				console.log(err);
				reject({error:err});
			});		
		}

	});

}
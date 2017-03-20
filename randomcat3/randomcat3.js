let alexaVerifier = require('alexa-verifier');

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function randomName() {
	var initialParts = ["Fluffy","Scruffy","King","Queen","Emperor","Lord","Hairy","Smelly","Most Exalted Knight","Crazy","Silly","Dumb","Brave","Sir","Fatty"];
	var lastParts = ["Sam","Smoe","Elvira","Jacob","Lynn","Fufflepants the III","Squarehead","Redshirt","Titan","Kitten Zombie","Dumpster Fire","Butterfly Wings","Unicorn Rider"];
	return initialParts[getRandomInt(0, initialParts.length-1)] + ' ' + lastParts[getRandomInt(0, lastParts.length-1)]
};

function main(args) {

	return new Promise(function(resolve, reject) {

		let signaturechainurl = args.__ow_headers.signaturecertchainurl;
		let signature =  args.__ow_headers.signature;
		let body = new Buffer(args.__ow_body,'base64').toString('ascii');
		let request = JSON.parse(body).request;

		alexaVerifier(signaturechainurl, signature, body, function(err) {
			console.log('in verifier cb');
			if(err) {
				console.log('err? '+JSON.stringify(err));
				reject(err);
			} else {
				if(!request.intent) request.intent = {name:'randomName'};
				let intent = request.intent;

				let text = 'Your random cat is ';


				if(intent.name === 'randomName') {
					text += randomName();
				} else if(intent.name === 'nameWithPrefix') {
					let prefix = request.intent.slots.prefix.value;
					text += prefix +' '+ randomName();
				}

				var response = {
				"version": "1.0",
				"response" :{
					"shouldEndSession": true,
					"outputSpeech": {
						"type": "PlainText",
						"text": text
						}
					}
				}

				resolve(response);

			}
		});


		/*

		*/

	});

}

exports.main = main;
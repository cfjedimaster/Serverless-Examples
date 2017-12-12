

function main(args) {


	if(args.request.type === 'IntentRequest' && ((args.request.intent.name === 'AMAZON.StopIntent') || (args.request.intent.name === 'AMAZON.CancelIntent'))) {
		let response = {
		"version": "1.0",
		"response" :{
			"shouldEndSession": true,
			"outputSpeech": {
				"type": "PlainText",
				"text": "Bye!"
				}
			}
		}

		return {response:response};
	}

	//Default response object
	let response = {
		"version":"1.0",
		"response":{
			"outputSpeech": {
				"type":"PlainText"
			},
			"shouldEndSession":true
		}
	};
	
	//treat launch like help
	let intent;
	if(args.request.type === 'LaunchRequest') {
		intent = 'AMAZON.HelpIntent';
	} else {
		intent = args.request.intent.name;
	}

	// two options, help or do horo
	if(intent === "AMAZON.HelpIntent") {
		
		response.response.outputSpeech.text = "I give you a completely scientifically driven, 100% accurate horoscope. Honest.";
	
	} else {
		let horoscope = require('./getHoroscope').create();
		response.response.outputSpeech.text  = horoscope;
		//console.log('Response is '+JSON.stringify(response));
	}

	return response;

}

exports.main = main;
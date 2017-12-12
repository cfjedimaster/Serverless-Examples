
const MAX = 100;
const MIN = 1;

function main(args) {

	//handle exit early
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

	//treat launch like help
	let intent;
	if(args.request.type === 'LaunchRequest') {
		intent = 'AMAZON.HelpIntent';
	} else {
		intent = args.request.intent.name;
	}

	//Default response object
	let response = {
		"version":"1.0",
		"response":{
			"outputSpeech": {
				"type":"PlainText"
			}
		}
	};

	//copy session over
	if("session" in args && "attributes" in args.session) {
		response.sessionAttributes = args.session.attributes;
	} else response.sessionAttributes = {};
	
	if(intent === "AMAZON.HelpIntent") {

		response.response.shouldEndSession = true;
		response.response.outputSpeech.text = "I'm a number guessing game. Say 'Start a New Game' to begin.";

	} else if(intent === "start") {

		//pick a random #
		let chosen = pickNumber();
		console.log('random number '+chosen+' selected');

		//store in session
		response.sessionAttributes.chosen = chosen;
		//also track # of guesses
		response.sessionAttributes.guesses = 0;
		

		//keep session open
		response.response.shouldEndSession = false;

		response.response.outputSpeech.text = "I've selected a random number!";
		
		//now prompt the user
		response.response.reprompt = {
			"outputSpeech":{
				"type": "PlainText",
				"text": "What number do you guess?"
			}
		};
		
	} else if(intent === "numberguess") {

		/*
		possible the user skipped starting a new game and just guessed a number, 
		if so, default:
		*/
		if(!response.sessionAttributes.chosen) {
			response.sessionAttributes.chosen = pickNumber();
			response.sessionAttributes.guesses = 0;
		}

		let guess = args.request.intent.slots.guess.value;
		console.log('user guessed '+guess);

		//increment guesses
		++response.sessionAttributes.guesses;
		
		if(guess == response.sessionAttributes.chosen) {
			response.response.shouldEndSession = true;
			//reset to a new number
			response.sessionAttributes.chosen = pickNumber();
			response.response.outputSpeech.text = "You guessed right, congratulations! It took you " +
			response.sessionAttributes.guesses + " guesses!";
		} else {
			response.response.shouldEndSession = false;
			response.response.outputSpeech.text = "Sorry, you guessed wrong. Try again!";

			//now prompt the user
			response.response.reprompt = {
				"outputSpeech":{
					"type": "PlainText",
					"text": "What number do you guess?"
				}
			};
		}
				
	} 

	console.log('returning '+JSON.stringify(response));
	return response;
}

function pickNumber() {
	return Math.floor(Math.random() * (MAX-MIN+1))+MIN;
}


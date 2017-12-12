const HELP_MSG = `
I support three commands. You can ask me for status, set DEFCON to 1 through 5, or ask me to attack a city.
`;

function main(args) {
	/*
	if(args.request.type !== 'IntentRequest') {
		//just end silently
		return {};
	}
	*/

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
	
	let response = {
		"version":"1.0",
		"response":{
			"shouldEndSession":false,
			"outputSpeech": {
				"type":"PlainText"
			}
		}
	};

	//we keep the session open except for help, so we need to reprompt;
	let reprompt = {
		"outputSpeech":{
			"type": "PlainText",
			"text": "What would you like to do next?"
		}
	};

	// todo - right now it is always true, remove if pass cert
	let useReprompt = true;

	//copy session over
	if("session" in args) {
		response.sessionAttributes = args.session.attributes;
	} else response.sessionAttributes = {};

	if(intent === "AMAZON.HelpIntent") {
		response.response.outputSpeech.text = HELP_MSG.trim();
	} else if(intent === "status") {
		/*
		check if we have defcon
		*/
		let status = 'Here is your status report. ';
		if("session" in args && "attributes" in args.session) {
			//it's possible we have the session stuff but have done nothing
			let doneSomething = false;
			if("defcon" in args.session.attributes) {
				status += ` You are currently at DEFCON ${args.session.attributes.defcon}.`;
				doneSomething = true;
			}
			if("totalCities" in args.session.attributes && args.session.attributes.totalCities > 0) {
				let citystr = args.session.attributes.totalCities>1?"cities":"city";

				status += ` You have attacked ${args.session.attributes.totalCities} ${citystr} killing approximately ${args.session.attributes.totalKilled} souls.`;
				doneSomething = true;
			}

			if(!doneSomething) status += ' You have yet to do anything interesting.';
		} else {
			status += ' You have yet to do anything interesting.';
		}
		status += ' What would you like to do next?';
		response.response.outputSpeech.text = status;
	} else if(intent === "defcon") {
		//Simulator turns 1 into null, lets simplify
		if(!args.request.intent.slots.defconlevel.value) args.request.intent.slots.defconlevel.value = 1;
		let defcon = args.request.intent.slots.defconlevel.value;
		console.log('DEFCON req was '+defcon);
		if(!response.sessionAttributes) response.sessionAttributes = {};
		response.sessionAttributes.defcon=defcon;
		
		
		response.response.outputSpeech.text = `DEFCON has now been set to ${defcon}. `;
		response.response.outputSpeech.text += " What next, commander?";
		
	} else if(intent === "attack") {

		// first, only allow nukes in defcon 1
		if(!("session" in args) || !("attributes" in args.session) || !("defcon" in args.session.attributes) || args.session.attributes.defcon != 1) {
			response.response.outputSpeech.text = "You are unable to fire nuclear missiles until DEFCON has been set to level 1. What next?";
			
		} else {

			let city = args.request.intent.slots.city.value;

			console.log('bombing '+city);
			/*
			ok, check for totalCities, totalKilled values
			*/
			let totalCities = args.session.attributes.totalCities?++args.session.attributes.totalCities:1;
			let totalKilled = args.session.attributes.totalKilled?args.session.attributes.totalKilled:0;
			console.log('totalCities='+totalCities+' totalKilled = '+totalKilled);

			response.sessionAttributes.totalCities = totalCities;
			let killed = getPopulation(city);
			response.sessionAttributes.totalKilled = totalKilled += killed;
			
			let rnd = Math.random();
			if(rnd < 0.3) {

				response.response.outputSpeech.text = `You have attacked the city of ${city} sending ${killed} souls to a fiery death of doom and destruction. Congratulations.`;
				
			} else if(rnd < 0.6) {

				response.response.outputSpeech.text = `Your nuclear missile cast a beautiful arc through the sky as it flew towards ${city}, eventually killing over ${killed} citizens.`;
				
			} else {

				response.response.outputSpeech.text = `The poor city of ${city} had no idea what was headed it's way. Now over ${killed} people are dead.`;
				
			}

			response.response.outputSpeech.text += ' What shall I do next?';

		}
	}

	if(useReprompt) {
		response.response["reprompt"] = reprompt;
	}

	console.log('returning '+JSON.stringify(response));
	return response;
}

function getPopulation(city) {
	//todo - try a geo api
	let max = 1500000;
	let min = 1000;
	return Math.floor(Math.random() * (max-min+1))+min;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWeather() {
	let responses = [
		"Go outside and look up in the sky you fucking idiot!",
		"Hot, cold, who the fuck cares, you're probably too lazy to go outside anyway!",
		"Look out a god damn window."
	];
	return responses[getRandomInt(0, responses.length-1)];
}

function getFallback() {
	let responses = [
		"I have no idea what you fucking said, idiot.",
		"Eh? Speak up - I can't hear you over the sound of you being stupid."
	];
	return responses[getRandomInt(0, responses.length-1)];
}

function getFortune() {
	let responses = [
		"You're going to die",
		"You will die horribly in a massive wreck where you shit your pants.",
		"You will die alone and miserable.",
		"You have no future."
	];
	return responses[getRandomInt(0, responses.length-1)];
}

function getHelp() {
	let responses = [
		"Damn right you need help.",
		"You are far beyond any help.",
		"I'd rather eat my own vomit."
	];
	return responses[getRandomInt(0, responses.length-1)];
}

function getName() {
	let responses = [
		"Fuck you, that's my name!"
	];
	return responses[getRandomInt(0, responses.length-1)];
}

function main(params) {
	let intent = '';
	if(params.request && params.request.intent) intent = params.request.intent.name;
	console.log(`intent=${intent}`);

	let text = '';

	switch(intent) {

		case "AMAZON.SearchAction<object@WeatherForecast>": 
			text = getWeather();
			break;
		
		case "name":
			text = getName();
			break;

		case "fortune":
			text = getFortune();
			break;

		case "AMAZON.HelpIntent":
			text = getHelp();
			break;

		//Fallback intent basically
		default: 
			text = getFallback();
		
	}

	var response = {
		"version": "1.0",
		"response": {
			"shouldEndSession": true,
			"outputSpeech": {
				"type": "PlainText",
				"text": text
			}
		}
	}

	return response;

}
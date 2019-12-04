function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWeather() {
	let responses = [
		"Go outside and look up in the sky you fucking idiot!",
		"Hot, cold, who the fuck cares, you're probably too lazy to go outside anyway!"
	];
	return responses[getRandomInt(0, responses.length-1)];
}

function main(params) {
	//console.log('called', JSON.stringify(params.request));
	let intent = '';
	if(params.request && params.request.intent) intent = params.request.intent.name;
	console.log(`intent=${intent}`);

	let text = '';

	switch(intent) {

		case "AMAZON.SearchAction<object@WeatherForecast>": 
			text = getWeather();
			break;
		
		//Fallback intent basically
		default: 
			text = 'I have no idea what you fucking said, idiot.';
		
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
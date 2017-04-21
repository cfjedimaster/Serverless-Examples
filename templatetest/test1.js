const Handlebars = require('handlebars');
const fs = require('fs');

let template = '';

function main(args) {

	if(template === '') {
		template = Handlebars.compile(fs.readFileSync(__dirname+'/templates/cats.html', 'utf-8'));
		console.log('loaded template from fs');
	}

	let data = {
		title:"A list of cats",
		cats:[
			"Lilith",
			"Sinatra",
			"Luna",
			"Pig",
			"Cracker"
		]
	}

	let html = template(data);

	return { body:html };
}

exports.main = main;
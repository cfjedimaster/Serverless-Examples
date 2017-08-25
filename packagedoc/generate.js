const openwhisk = require('openwhisk');
const handlebars = require('handlebars');
const fs = require('fs');

if(process.argv.length === 2) {
	console.log('Usage: generate <<package>> <<outputfile>> (outputfile defaults to output.html');
	process.exit(1);
}
let package = process.argv[2];

let output='./output.html';

if(process.argv.length === 4) output = process.argv[3];

console.log('Attempt to generate docs for '+package);

const api_key = process.env['__OW_API_KEY'];
let options = {apihost: 'openwhisk.ng.bluemix.net', api_key: api_key};
let ow = openwhisk(options);

ow.packages.get(package).then(result => {
	let html = generateHTML(result, package);
	fs.writeFileSync(output, html);
	
	console.log('Output written to '+output);
}).catch(err => {
	if(err.statusCode === 401) {
		console.error('Invalid API Key used.');
		process.exit(1);
	} else if(err.statusCode === 403) {
		console.error('Invalid package, or one you do not have access to.');
		process.exit();
	}
	console.log('Unhandled Error:', err);
});

function generateHTML(package, name) {
	let templateSource = fs.readFileSync('./template.html','utf-8');
	let template = handlebars.compile(templateSource);

	let s = '';

	/*
	Do a bit of normalization.
	*/
	package.description = '';
	package.annotations.forEach((anno) => {
		if(anno.key === 'description') {
			package.description = anno.value;
		}
		if(anno.key === 'parameters') {
			/*
			So the main package ob's parameters is names+values(defaults), this is possible more descriptive
			so we use this to enhance the main params.
			Note - there is also a case where a annotation parameter isn't in the main list. I noticed
			wsk package get x --summary *would* include the annotation so we'll copy it over.
			*/
			anno.value.forEach((param) => {
				//attempt to find existing
				let found = package.parameters.findIndex((origparam) => origparam.key === param.name);
				if(found === -1) {
					let newParam = {
						key:param.name,
						value:''
					}
					package.parameters.push(newParam);
					found = package.parameters.length-1;
				}
				//copy over description, required, type. Not bindtime
				if(param.description) package.parameters[found].description = param.description;
				if(param.type) package.parameters[found].type = param.type;
				if(param.required) package.parameters[found].required = param.required;
			});
		}
	});

	//work on actions
	package.actions.sort((a, b) => {
		if(a.name < b.name) return -1;
		if(a.name > b.name) return 1;
		return 0;
	});
	package.actions.forEach((action) => {
		action.annotations.forEach((anno) => {
			if(anno.key === 'description') action.description = anno.value;
			if(anno.key === 'parameters') action.parameters = anno.value;
			if(anno.key === 'sampleInput') action.sampleInput = JSON.stringify(anno.value, null, '\t');
			if(anno.key === 'sampleOutput') action.sampleOutput = JSON.stringify(anno.value, null, '\t');
		});
	});

	//feeds *seems* to be the exact same as actions, I'm copying and pasting for now, but may later make it one thing
	package.feeds.sort((a, b) => {
		if(a.name < b.name) return -1;
		if(a.name > b.name) return 1;
		return 0;
	});
	package.feeds.forEach((feed) => {
		feed.annotations.forEach((anno) => {
			if(anno.key === 'description') feed.description = anno.value;
			if(anno.key === 'parameters') feed.parameters = anno.value;
			if(anno.key === 'sampleInput') feed.sampleInput = JSON.stringify(anno.value, null, '\t');
			if(anno.key === 'sampleOutput') feed.sampleOutput = JSON.stringify(anno.value, null, '\t');
		});
	});

	return template({package:package, name:name}); 
}
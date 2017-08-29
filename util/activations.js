#!/usr/bin/env node

// 2 args supported, either pass <<name>> or <<name> <<limit>>. Limit defaults to 30.

const openwhisk = require('openwhisk');
const chalk = require('chalk');

const api_key = process.env['__OW_API_KEY'];
if(!api_key) {
	console.error('Environment variable __OW_API_KEY not present.');
	process.exit();
}

let options = {apihost: 'openwhisk.ng.bluemix.net', api_key: api_key};
let ow = openwhisk(options);

let activationOptions = {
	docs:true,
	limit:30
}

if(process.argv.length >= 3) activationOptions.name = process.argv[2];
if(process.argv.length >= 4) activationOptions.limit = process.argv[3];

console.log('ID'.padEnd(32)+' '+'Name'.padEnd(32)+' '+'Date'.padEnd(15)+' Result');

ow.activations.list(activationOptions).then(result => {
	result.forEach(act => {
		let id = act.activationId;
		let name = act.name;
		let start = dtFormat(new Date(act.start));
		let result = act.response.success;
		let resultStr = chalk.green('true');
		if(!result) {
			resultStr = chalk.red('false');
		}
		console.log(`${id} ${name.padEnd(32)} ${start.padEnd(15)} ${resultStr}`);
	});
});

function dtFormat(d) {
	let result = '';
	result += d.getMonth()+1;
	result += '/';
	result += d.getDate();
	result += '/';
	result += d.getFullYear().toString().substr(2,2);
	result += ' ';
	result += zpad(d.getHours()) + ':' + zpad(d.getMinutes());
	return result;
}

function zpad(s) {
	if(s.toString().length === 1) return '0'+s;
	return s;
}
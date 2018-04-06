'use strict';

const request = require('request');

module.exports = function(context, cb) {
	//first, gather the form fields
	console.log(context.body)
	let form = context.body;
	
	checkForm(context.body, context.secrets.recaptcha)
	.then(result => {
		console.log('result was '+JSON.stringify(result.errors));		

		if(result.errors.length) {
			cb(null, {status: false, errors:result.errors});
		} else {
			// we'd also email the results here, or store them, or something
			cb(null, {status: true});
		}

	});

}

/* simple validation routine, returns an array of errors */
function checkForm(f, recaptchaKey) {
	return new Promise((resolve, reject) => {

		let errors = [];
		if(!f.name || f.name.trim() === '') errors.push("Name required.");
		if(!f.email || f.email.trim() === '') errors.push("Email required.");
		// could add email validation here

		request.post(' https://www.google.com/recaptcha/api/siteverify', {
			form:{
				secret:recaptchaKey,
				response:f.recaptcha
			}
		}, (err, resp, body) => {
			if(!JSON.parse(body).success) {
				errors.push('You did not fill out the recaptcha or resubmitted the form.');
			}
			resolve({errors:errors});

		});

	});
}

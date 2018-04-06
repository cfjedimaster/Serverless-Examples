'use strict';

module.exports = function(context, cb) {
	//first, gather the form fields
	console.log(context.body)
	let form = context.body;
	let errors = checkForm(context.body);

	if(errors.length) {
		cb(null, {status: false, errors:errors});
	} else {
		// we'd also email the results here, or store them, or something
		cb(null, {status: true});
	}
}

/* simple validation routine, returns an array of errors */
function checkForm(f) {
	let errors = [];
	if(!f.name || f.name.trim() === '') errors.push("Name required.");
	if(!f.email || f.email.trim() === '') errors.push("Email required.");
	// could add email validation here
	return errors;
}

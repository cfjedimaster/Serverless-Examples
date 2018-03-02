'use strict';

module.exports = function(context, cb) {
	//first, gather the form fields
	let form = context.body;
	console.log(form);
	cb(null, {form:form})
}

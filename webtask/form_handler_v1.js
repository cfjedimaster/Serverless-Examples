module.exports = function(context, cb) {

	//first, gather the form fields
	console.log(context.body);
	cb(null, {form:context.body})
}

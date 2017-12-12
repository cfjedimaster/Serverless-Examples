
function main(args) {
	if(!args.message) args.message = 'Nameless';
	let message = args.message;
	return {
		statusCode:200,
		body:'Hello from OW: '+message
	}
}
/*
exports.helloWorld = function helloWorld(req, res) {
  var message = req.body.message;
  res.status(200).send('Hello from Google: ' + message);
};
*/
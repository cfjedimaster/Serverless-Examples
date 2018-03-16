const source = `'use strict';
const allowedRef = ['rhetorical-collar.surge.sh'];

function createMiddleware() {

	return function middleware(req, res, next) {
		let referrer = req.webtaskContext.headers['referer'];
		console.log('referrer is '+referrer);

		allowedRef.forEach(ref => {
			if(referrer.indexOf(ref) >= 0) return next();
		});

  		const error = new Error('invalid referer');
        error.statusCode = 401;
        next(error);
  }
}

module.exports = createMiddleware;
`;

module.exports = function(ctx, req, res) {
	console.log('factory running');
	res.writeHead(200, {'content-type': 'application/javascript'});
	res.end(source);
};
module.exports = function(context, req, res) {
	res.writeHead(301, {'Location': 'https://www.raymondcamden.com' });
	res.end();
//	return res.redirect('https://www.raymondcamden.com');
}
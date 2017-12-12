var str = require('string-to-stream');
var multipart = require('parted').multipart;
var fs = require('fs');

function main(args) {

	return new Promise((resolve, reject) => {
		let decoded = new Buffer(args.__ow_body,'base64');
		let newStream = str(decoded);

		var options = {
			limit: 30 * 1024,
			diskLimit: 30 * 1024 * 1024
		};

		console.log('Making parser');
		var parser = new multipart(args.__ow_headers["content-type"], options), parts = {};
		parser.on('error', function(err) {
			console.log('parser error', err);
		});

		parser.on('part', function(field, part) {
			// temporary path or string
			parts[field] = part;
		});

		parser.on('data', function() {
		console.log('%d bytes written.', this.written);
		});

		parser.on('end', function() {
			console.log(parts);

			var file = fs.readFileSync(parts.file1);
			var base64File = new Buffer(file).toString('base64');

			resolve({
				statusCode: 200,
				headers: { 'Content-Type': 'image/png' },
				body: base64File
			});


		});

		newStream.pipe(parser);


	});

		
}

exports.main = main;

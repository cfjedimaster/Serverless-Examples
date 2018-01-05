const rp = require('request-promise');
const parseString = require('xml2js').parseString;

function main(args) {
	if(!args.key || !args.id) {
		throw new Error('Key and ID arguments are required.');
	}

	return new Promise((resolve, reject) => {
		let url = `https://www.goodreads.com/book/show/${args.id}.xml?key=${args.key}`;
		rp({
			url:url
		})
		.then(res => {
			parseString(res, {explicitArray:false, mergeAttrs:true}, function(err, result) {
                    if(err) {
                        reject(err);
                    } else {
						/*
						one again, massage a bit
						*/
						let finalResult = result.GoodreadsResponse.book.similar_books.book;
						resolve({result:finalResult});
                    }
                });


		});
	});
}
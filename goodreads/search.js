const rp = require('request-promise');
const parseString = require('xml2js').parseString;

function main(args) {
	//todo - support specifying field
	if(!args.key || !args.search) {
		throw new Error('Key and Search arguments are required.');
	}

	return new Promise((resolve, reject) => {
		let url = `https://www.goodreads.com/search/index.xml?key=${args.key}&q=${encodeURIComponent(args.search)}`;
		rp({
			url:url
		})
		.then(res => {

			parseString(res, {explicitArray:false, mergeAttrs:true}, function(err, result) {
                    if(err) {
                        reject(err);
                    } else {
						/*
						further massage the data, I think xml2js may actually support this
						*/
						let initialBooks = result.GoodreadsResponse.search.results.work;

						let books = initialBooks.map(b => {

							return {
								average_rating:b.average_rating,
								original_publication_day:b.original_publication_day['_'],
								original_publication_month:b.original_publication_month['_'],
								original_publication_year:b.original_publication_year['_'],
								ratings_count:b.ratings_count['_'],
								id:b.best_book.id['_'],
								image_url:b.best_book.image_url,
								author:b.best_book.author.name,
								small_image_url:b.best_book.small_image_url,
								title:b.best_book.title
							}
							
						});

                        resolve({result:books});
                    }
                });

		});
	});
}
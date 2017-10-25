

function main(args) {

	/*
	create a new array of:
		url
		description
		pubDate
		title
	*/
	let entries = args.entries.map( (entry) => {
		return {
			url:entry.link,
			body:entry.description,
			published:entry.pubDate,
			title:entry.title
		};
	});

	/*
	ok, now we need to prep it for the bulk action
	PREPARE THE BULK!!!

	ex: 
	{ index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
     // the document to index
    { title: 'foo' },
	*/
	let bulk = [];

	entries.forEach( (e) => {
		let action = {"index":{"_type":"entry", "_id":e.url}};
		let document = e;
		bulk.push(action);
		bulk.push(document);
	});

	return {
		body:bulk,
		index:'blogcontent'
	}

}

exports.main = main;
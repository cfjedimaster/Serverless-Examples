/*
Responsible for sending an image up to Watson and returning the tags.
*/

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

function main(args) {

	let result = {};

	let visual_recognition = new VisualRecognitionV3({
		api_key: args.api_key,
		version_date: '2016-05-20'
	});

	var params = {
    	url: args.imageUrl
    };
	
	return new Promise((resolve, reject) => {
		console.log('Entered identify, looking for '+args.imageUrl);
		visual_recognition.classify(params, (err, res) => {
			if (err) { 
				reject({error:err});
			} else {
				//array of tags
				let tags = res.images[0].classifiers[0].classes;
				console.log('got these tags', tags);
				/*
				ok, given that we have N tags, each has a class (label) and score. Let's sort by score first
				*/
				tags = tags.sort((one,two) => {
					if(one.score > two.score) return -1;
					if(one.score === two.score) return 0;
					return 1;
				});
				result.tags = tags;
				console.log('leaving with '+JSON.stringify(result));
				resolve(result);
			}

		});

	});

}
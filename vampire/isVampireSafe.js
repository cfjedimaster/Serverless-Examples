const rp = require('request-promise');

// https://api.sunrise-sunset.org/json?lat=30.224090&lng=-92.019843
function main(args) {

	if(!args.lat || !args.lng) {
		return { error:'Parameters lat and lng are required.' };
	}

	return new Promise((resolve, reject) => {
		let now = new Date();
		let url = `https://api.sunrise-sunset.org/json?lat=${args.lat}&lng=${args.lng}&formatted=0`;
		let options = {
			uri:url,
			json:true
		};

		rp(options).then(result => {
			let data = result.results;
			/*
			if now < data.sunrise || now > data.sunset
			*/
			let sunrise = new Date(data.sunrise);
			let sunset = new Date(data.sunset);
			//console.log('before sunrise '+sunrise, (now < sunrise));
			//console.log('after sunset ' +sunset, (now > sunset));
			
			resolve({result:(now < sunrise || now > sunset)});
		}).catch(err => {
			reject({error:err});
		});

	});

}
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

function main(args) {

	//allow overrides
	if(args['pi.username']) args.username = args['pi.username'];
	if(args['pi.password']) args.password = args['pi.password'];

	let personality_insights = new PersonalityInsightsV3({
		username: args.username,
		password: args.password,
		version_date: '2016-10-19'
	});

	return new Promise( (resolve, reject) => {
			personality_insights.profile({
				text: args.text,
				consumption_preferences: true
			},
			function (err, response) {
				if (err) reject(err);
				else resolve(response);
			});
	});

}

exports.main = main;
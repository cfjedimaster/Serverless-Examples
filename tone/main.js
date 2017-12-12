<<<<<<< HEAD
var watson = require('watson-developer-cloud');

function main(args) {

    var tone_analyzer = watson.tone_analyzer({
=======
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

function main(args) {

	//allow overrides
	if(args['tone.username']) args.username = args['tone.username'];
	if(args['tone.password']) args.password = args['tone.password'];

    var tone_analyzer = new ToneAnalyzerV3({
>>>>>>> 148ed1a53925d60adfe2eebbea16bf14a9591922
        username: args.username,
        password: args.password,
        version: 'v3',
        version_date: '2016-05-19'
    });

    /*
    supported args (documented here: https://github.com/watson-developer-cloud/node-sdk/blob/master/tone-analyzer/v3.js)
    text (required)
    tones
    sentences
    isHTML

    */
    return new Promise( (resolve, reject) => {
        console.log('args',JSON.stringify(args));
        tone_analyzer.tone(args, (err, tone) => {
            if(err) return reject(err);
            return resolve(tone);
        });

    });
}

exports.main = main;
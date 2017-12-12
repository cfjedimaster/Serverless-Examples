var watson = require('watson-developer-cloud');

function main(args) {

    var tone_analyzer = watson.tone_analyzer({
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
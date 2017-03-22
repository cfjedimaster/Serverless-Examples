var watson = require('watson-developer-cloud');

function main(args) {
    console.log('called');
    console.log(JSON.stringify(args));
    var tone_analyzer = watson.tone_analyzer({
        username: args.username,
        password: args.password,
        version: 'v3',
        version_date: '2016-05-19'
    });

    return new Promise( (resolve, reject) => {

        tone_analyzer.tone({text:args.text}, (err, tone) => {
            if(err) return reject(err);
            return resolve(tone);
        });

    });
}

exports.main = main;
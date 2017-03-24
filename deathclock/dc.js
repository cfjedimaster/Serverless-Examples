let alexaVerifier = require('alexa-verifier');

//life expectancy for Americans, rounded down
const LIFE_MAX = 78;

const DAYS_MAX = LIFE_MAX * 365;

function getDeathDay(d) {
    let date = new Date(d);
    let now = new Date();

    if(date > now) return -1;

    //ok, first get day diff
    // http://stackoverflow.com/a/3224854/52160
    let timeDiff = Math.abs(now.getTime() - date.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    //console.log('diffDays', diffDays);
    let daysLeft = DAYS_MAX - diffDays;
    let secondsLeft = daysLeft * 24 * 60 * 60;
    //console.log('now.getDate', now.getDate());

    let deathDay = new Date(now.valueOf());
    deathDay.setDate(deathDay.getDate() + daysLeft);
    //console.log('deathDay', deathDay);
    deathDay = new Intl.DateTimeFormat('en-US',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        ).format(deathDay);
    return {
        deathDay:deathDay,
        secondsLeft:secondsLeft
    };
}

function main(args) {

    return new Promise(function(resolve, reject) {

        let signaturechainurl = args.__ow_headers.signaturecertchainurl;
        let signature =  args.__ow_headers.signature;
        let body = new Buffer(args.__ow_body,'base64').toString('ascii');
        let request = JSON.parse(body).request;

        alexaVerifier(signaturechainurl, signature, body, function(err) {
            console.log('in verifier cb');
            if(err) {
                console.log('err? '+JSON.stringify(err));
                reject(err);
            } else {
                console.log(request);
                if(!request.intent) request.intent = {name:'intro'};
                let intent = request.intent;

                let text = "";

                let response;

                if(intent.name === "intro") {
                    text = "When is your birthday, including the year?";

                    response = {
                    "version": "1.0",
                    "response" :{
                        "shouldEndSession": false,
                        "outputSpeech": {
                            "type": "PlainText",
                            "text": text
                            },
                        "reprompt": {
                            "outputSpeech":{
                                "type": "PlainText",
                                "text": text
                                }
                            }
                        }
                    }
                    
                } else if(intent.name === "birthday") {
                    let bday = intent.slots.bday.value;
                    let result = getDeathDay(bday);
                    if(result === -1) {
                        text = "You should be dead already!";
                    } else {
                        text = "You will die on " + result.deathDay + 
                        ". That will be in "+result.secondsLeft + " seconds.";
                    }

                    response = {
                    "version": "1.0",
                    "response" :{
                        "shouldEndSession": true,
                        "outputSpeech": {
                            "type": "PlainText",
                            "text": text
                            }
                        }
                    }
 
               }

                resolve(response);

            }
        });

    });

}

exports.main = main;



/*
hard coded secret
*/
const secret = require('./creds.json');
const jwt = require('jsonwebtoken');

/*
args.token, passed in
*/
function main(args) {

    return new Promise( (resolve, reject) => {

        let decoded = jwt.verify(args.token, secret.key, (err,decoded) => {

            if(err) {
                console.log('err',err);
                reject({
                    name:err.name,
                    message:err.message,
                    stack:err.stack
                });
            } else {
                //pass args, minus token
                delete args.token;
                resolve(args);
            }

        });

    });

}

exports.main = main;
const jwt = require('jsonwebtoken');
const creds = require('./creds.json');

function main(args) {

    return new Promise((resolve, reject) => {
        let decoded = jwt.verify(args.token, creds.secret, (err,decoded) => {
            if(err) {
                console.log('err',err);
                reject({
                    name:err.name,
                    message:err.message,
                    stack:err.stack
                });
            } else {
                //passthrough, except token
                delete args.token;
                resolve(args);
            }

        });


    });

}

exports.main = main;
const jwt = require('jsonwebtoken');
const creds = require('./creds.json');

function main(args) {
    return new Promise((resolve, reject) => {

        if(!args.username || !args.password) reject({message:'Invalid auth'});
        // hard coded auth
        if(args.username !== 'admin' || args.password !== 'letmein') reject({message:'Invalid auth'});

        let token = jwt.sign(args.username, creds.secret);
        resolve({
            token:token
        });

    });

}

exports.main = main;
let alexaVerifier = require('alexa-verifier');

function main(args) {

     return new Promise(function(resolve, reject) {

        let signaturechainurl = args.__ow_headers.signaturecertchainurl;
        let signature =  args.__ow_headers.signature;
        let body = new Buffer(args.__ow_body,'base64').toString('ascii');
        let request = JSON.parse(body).request;

        alexaVerifier(signaturechainurl, signature, body, function(err) {
            if(err) reject(err);
            resolve(JSON.parse(body));
        });

    });
    
}

exports.main = main;


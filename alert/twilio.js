/*
as args, needs:
accountSid
authToken
to 
from

*/
const twilio = require('twilio');

function main(args) {

    var client = new twilio(args.accountSid, args.authToken);
    let body = `The action, ${args.action}, has fallen beneath its desired success rate. Take action!`;

    return new Promise((resolve, reject) => {
        client.messages.create({
            body: body,
            to: args.to,  
            from: args.from
        })
        .then((message) => {
            resolve({result:1});
        })
        .catch(err => {
            console.log(err);
            reject({error:err});
        });
        
    });
}
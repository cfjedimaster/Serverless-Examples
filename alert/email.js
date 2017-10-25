/*
requires:
    email (will be used for to/from)
    action (name)
    sgkey (sendgrid key)

I send a hard coded message saying args.action has failed

Note - since we can't do conditional actions in sequences, this
action leaves early if status:false
*/

const helper = require('sendgrid').mail;

function main(args) {

    if(!args.status) return {result:0};

	let SG_KEY = args.SG_KEY;

	let from_email = new helper.Email('raymondcamden@gmail.com');
	let to_email = new helper.Email(args.email);
	let subject = 'Failure Rate Alert: '+args.action;

    let mainTemplate = `
The action, ${args.action}, has fallen beneath its desired success rate.
Take action!
`;

    let mailContent = new helper.Content('text/html', mainTemplate);
    let mail = new helper.Mail(from_email, subject, to_email, mailContent);

    let sg = require('sendgrid')(SG_KEY);
    
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    return new Promise((resolve, reject) => {
        sg.API(request, function(error, response) {
            if(error) {
                console.log('error in sg', error.response.body);
                reject({error:error.message}) 
            } else {
                resolve({result:1});
            }
        });

    });

}
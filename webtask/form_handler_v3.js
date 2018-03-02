'use strict';


const helper = require('sendgrid').mail;
const RECIPS = ["raymondcamden@gmail.com","ray@camdenfamily.com"];

module.exports = function(context, req, res) {
	//first, gather the form fields
	let form = context.body;

	let from = RECIPS[0];
	let to = RECIPS[0];

	//let the form specify a from
	if(form._from) {
		from = form["_from"];
	}

	if(form["_to"]) {
		if(RECIPS.indexOf(form["_to"]) === -1) {
			cb("Invalid _to address: "+form["_to"]);
		} else {
			to = form["_to"];
		}
	}

	let subject = form["_subject"] || 'Form Submission';

	let next = form["_next"] || context.headers.referer;

	//Generate the text
	let date = new Date();
    let content = `
Form Submitted at ${date}
--------------------------------
`;

    for(let key in form) {
        //blanket ignore if _*
        if(key.indexOf("_") != 0) {
            content += `
${key}:         ${form[key]}
`;
        }
    }
	
	//fire off the request to send an email - we don't want the user to wait so this is fire and forget
	sendEmail(to,from,subject,content, context.secrets.sg_key)
	.then(() => {
		res.writeHead(301, {'Location': next });
		res.end();
	}).catch(e => {
		// handle error
	});

}

function sendEmail(to, from, subject, body, key, cb) {

	let to_email = new helper.Email(to);
	let from_email = new helper.Email(from);
    let mailContent = new helper.Content('text/plain', body);
    let mail = new helper.Mail(from_email, subject, to_email, mailContent);
	let sg = require('sendgrid')(key);

	var request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON()
	});
        
	return new Promise((resolve, reject) => {
		sg.API(request, function(error, response) {
			if(error) {
				console.log(error.response.body);
				reject(error.response.body);
			} else {
				console.log('good response from sg');
				resolve();
			}
		});
	});

}

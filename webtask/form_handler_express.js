'use strict';

const app = new (require('express'))();
const wt = require('webtask-tools');
const bodyParser = require('body-parser');
const helper = require('sendgrid').mail;

const DEFAULT_FROM = 'raymond.camden@auth0.com';
const TO = 'raymond.camden@auth0.com';
const SUBJ = 'Stormtrooper Form Submission';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function (req, res) {
    res.end(FORM_HTML);
});

app.post('/', function (req, res) {
	console.log('req.body', req.body);

	let form = req.body;

	let from = DEFAULT_FROM;
	let to = TO;

	//let the form specify a from
	if(form._from) {
		from = form['_from'];
	}

    let subject = SUBJ;

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

	sendEmail(to,from,subject,content, req.webtaskContext.secrets.sg_key)
	.then(() => {
        let fullUrl = 'https://' + req.get('host') + req.originalUrl;
        console.log(fullUrl);
		res.writeHead(301, {'Location': fullUrl+'/thanks' });
		res.end();
	}).catch(e => {
		// handle error
	});
    
});

app.get('/thanks', function (req, res) {
    console.log('running thanks');
    res.end(THANKS_HTML);
});

module.exports = wt.fromExpress(app);

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

const FORM_HTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    </head>
    <body>

        <div class="container">
            <h2>New Stormtrooper Recruitment Form</h2>

            <form method="post" action="https://wt-c2bde7d7dfc8623f121b0eb5a7102930-0.run.webtask.io/form_handler_express">
                
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" name="name" id="name" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="_from" id="email" required>
                </div>

                <div class="form-group">
                    <label for="acc">Current Accuracy</label>
                    <select name="acc" id="acc" class="form-control" required>
                        <option></option>
                        <option>Sharp Shooter!</option>
                        <option>Reasonable Accuracy</option>
                        <option>I can hit anything except a rebel</option>
                    </select>
                </div>


                <div class="form-group">
                    <label for="emp">The Empire is...</label>
                    <select name="emp" id="emp" class="form-control" required>
                        <option></option>
                        <option>Awesome!</option>
                        <option>Totally Not Evil!</option>
                        <option>Whatever "Better than Awesome" is!</option>
                    </select>
                </div>


                <div class="form-group">
                    <label for="why">Why you want to join the Stormtrooper ranks:</label>
                    <textarea name="why" id="wh" class="form-control" required></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit (No, seriously, submit!)</button>

            </form>

        </div>
    </body>
</html>
`;

const THANKS_HTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    </head>
    <body>

        <div class="container">
            <h2>New Stormtrooper Recruitment Form</h2>

            <p>
            Thank you for filling out the form. We really care about you. Honest.
            </p>

        </div>
    </body>
</html>
`;
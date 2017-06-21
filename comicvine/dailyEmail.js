const helper = require('sendgrid').mail;

function main(args) {
	let SG_KEY = args.SG_KEY;
	let char = args.character;

	let from_email = new helper.Email('raymondcamden@gmail.com','Raymond Camden');
	let to_email = new helper.Email('raymondcamden@gmail.com','Raymond Camden');
	let subject = 'Your Daily Comic Book Character: '+char.name;

	/*
	Generate the HTML for the email first.
	*/
	let friendsTemplate = '';
	let enemiesTemplate = '';
	let powersTemplate = '';
	let teamsTemplate = '';
	let creatorsTemplate = '';

	//need to find female (don't think a default exists)
	let defaultMaleImage = 'https://comicvine.gamespot.com/api/image/scale_large/1-male-good-large.jpg';
	let image = '';
	if(!char.image) {
		image = defaultMaleImage;
	} else if(char.image && !char.image.super_url) {
		image = defaultMaleImage;
	} else {
		image = char.image.super_url;
	}

	return new Promise( (resolve, reject) => {
	

		let publisher = 'None';
		if(char.publisher && char.publisher.name) publisher = char.publisher.name;

		/*
		If no description, copy deck over. deck can be blank too though
		also sometimes its <br/>, sometimes <p>.</p>
		*/
		if(char.description && (char.description === '<br/>' || char.description === '<p>.</p>')) delete char.description;

		if(!char.description && !char.deck) {
			char.description = 'No description.';
		} else if(!char.description) {
			char.description = char.deck;
		}

		if(char.character_friends.length) {
			friendsTemplate = `<h2">Friends</h2><ul>`;
			char.character_friends.forEach((friend) => {
				friendsTemplate += `<li><a href="${friend.site_detail_url}">${friend.name}</a></li>`;
			});
			friendsTemplate += '</ul>';
		} 

		if(char.character_enemies.length) {
			enemiesTemplate = `<h2>Enemies</h2><ul>`;
			char.character_enemies.forEach((enemy) => {
				enemiesTemplate += `<li><a href="${enemy.site_detail_url}" target="_new">${enemy.name}</a></li>`;
			});
			enemiesTemplate += '</ul>';
		} 

		if(char.powers.length) {
			powersTemplate = `<h2>Powers</h2><ul>`;
			char.powers.forEach((power) => {
				powersTemplate += `<li>${power.name}</li>`;
			});
			powersTemplate += '</ul>';
		} 

		if(char.teams.length) {
			teamsTemplate = `<h2>Teams</h2><ul>`;
			char.teams.forEach((team) => {
				teamsTemplate += `<li><a href="${team.site_detail_url}" target="_new">${team.name}</a></li>`;
			});
			teamsTemplate += '</ul>';
		} 

		if(char.creators.length) {
			creatorsTemplate = `<h2>Creators</h2><ul>`;
			char.creators.forEach((creator) => {
				creatorsTemplate += `<li><a href="${creator.site_detail_url}" target="_new">${creator.name}</a></li>`;
			});
			creatorsTemplate += '</ul>';
		} 

		let mainTemplate = `
		<html>
		<head>
		<meta name="viewport" content="width=device-width">
		</head>
		<body style="background-color: #ffeb3b;padding: 10px">

		<h1>${char.name}</h1>
		<p>
			<strong>Publisher:</strong> ${publisher}<br/>
			<strong>First Issue:</strong> <a href="${char.first_issue.site_detail_url}" target="_new">${char.first_issue.volume.name} ${char.first_issue.issue_number} (${char.first_issue.cover_date})</a><br/>
		</p>

		<a href="${char.site_detail_url}" target="_new"><img style="max-width:500px" title="Character Image" src="${image}"></a>
		<p>${char.description}</p>

		${creatorsTemplate}
		${powersTemplate}
		${teamsTemplate}
		${friendsTemplate}
		${enemiesTemplate}

		</body>
		</html>
		`;

		let mailContent = new helper.Content('text/html', mainTemplate);
		let mail = new helper.Mail(from_email, subject, to_email, mailContent);

		let sg = require('sendgrid')(SG_KEY);
		
		var request = sg.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: mail.toJSON()
		});

		sg.API(request, function(error, response) {
			if(error) {
				console.log('error in sg', error.response.body);
				reject({error:error.message}) 
			} else {
				console.log('it should be well');
				resolve({success:1});
			}
		});

	});

}
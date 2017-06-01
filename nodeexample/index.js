const express = require('express');
const app = express();

const dataService = require('./dataService');
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);

// 3 simple routes, /index.html is served via static

app.get('/cats', (req, res) => {
	/*
	imagine calling a db to fetch a list of cats and then render it.
	*/
	dataService.getCats().then((cats) => {
		let result = '<h2>Cats</h2><ul>';
		cats.forEach((cat) => {
			result += '<li>'+cat+'</li>';
		});
		result += '</ul>';
		res.send(result);
	});
}); 

app.get('/dogs', (req, res) => {
	/*
	imagine calling a db to fetch a list of dogs and then render it.
	*/
	dataService.getDogs().then((dogs) => {
		let result = '<h2>Dogs</h2><ul>';
		dogs.forEach((dog) => {
			result += '<li>'+dog+'</li>';
		});
		result += '</ul>';
		res.send(result);
	});
}); 

app.listen(app.get('port'), () => {
	console.log('Running on http://localhost:' + app.get('port'));
});

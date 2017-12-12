function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function randomName() {
	var initialParts = ["Fluffy","Scruffy","King","Queen","Emperor","Lord","Hairy","Smelly","Most Exalted Knight","Crazy","Silly","Dumb","Brave","Sir","Fatty"];
	var lastParts = ["Sam","Smoe","Elvira","Jacob","Lynn","Fufflepants the III","Squarehead","Redshirt","Titan","Kitten Zombie","Dumpster Fire","Butterfly Wings","Unicorn Rider"];
	return initialParts[getRandomInt(0, initialParts.length-1)] + ' ' + lastParts[getRandomInt(0, lastParts.length-1)]
};
 
function randomColor() {
	var colors = ["Red","Blue","Green","Yellow","Rainbow","White","Black","Invisible"];
	return colors[getRandomInt(0, colors.length-1)];
}
 
function randomGender() {
	var genders = ["Male","Female"];
	return genders[getRandomInt(0, genders.length-1)];
}
 
function randomAge() {
	return getRandomInt(1, 15);
}
 
function randomBreed() {
	var breeds = ["American Shorthair","Abyssinian","American Curl","American Wirehair","Bengal","Chartreux","Devon Rex","Maine Coon","Manx","Persian","Siamese"];
	return breeds[getRandomInt(0, breeds.length-1)];
}

function randomPic() {
	var w = getRandomInt(100,400);
	var h = getRandomInt(100,400);
	return `http://placekitten.com/${w}/${h}`;
}

function isWebInvocation(request) {
	if(request.__ow_method) return true;
	return false;
}

function getRequestType(request) {
	//basically sniff the Accept header
	let header = request.__ow_headers.accept;
	console.log('header', header);
	//try to normalize a bit, just caring about a few
	if(header.indexOf('text/html') >= 0) return 'html';
	if(header.indexOf('image/jpeg') >= 0) return 'image';
	if(header.indexOf('application/json') >= 0) return 'json';
	//fall out to json
	return 'json';
}

function main(args) {
	console.log('cats args: '+JSON.stringify(args));

	let cat = {
		name:randomName(),
		color:randomColor(),
		gender:randomGender(),
		age:randomAge(),
		breed:randomBreed(),
		picture:randomPic()
	};

	if(!isWebInvocation(args)) {
		return { cat: cat};
	}

	console.log('not a regular invoke');
	let type = getRequestType(args);
	console.log('type is '+type);

	switch(type) {

		case 'html': 
			return {html:`
				<h1>${cat.name}</h1>
				My cat, ${cat.name}, is ${cat.gender} and ${cat.age} years old.<br/>
				It is a ${cat.breed} and has a ${cat.color} color.<br/>
				<img src="${cat.picture}">
				`
			};
			break;


		case 'image':
			return {
				headers:{location:cat.picture},
				code:302
			};
			break;

		case 'json':
			return cat;
			break;
	
	}

}
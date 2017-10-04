const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

function getAdjective() {
	return adjectives[randRange(0,adjectives.length-1)];
}

function getNoun() {
	return nouns[randRange(0,nouns.length-1)];
}

function getSign() {
	return signs[randRange(0,signs.length-1)];
}


function getFinancialString() {
	let options = [
		"Today is a good day to invest. Stock prices will change. ",
		"Today is a bad day to invest. Stock prices will change. ",
		"Investments are a good idea today. Spend wisely before the " + getAdjective() + " " + getNoun() + " turns your luck! ",
		"Save your pennies! Your " + getNoun() + " is not a safe investment today. ",
		"Consider selling your " + getNoun() + " for a good return today. ",
		"You can buy a lottery ticket or a " + getNoun() + ". Either is a good investment. "
	];
	return options[randRange(1,options.length-1)];
}

function getRomanticString() {
	let options = [
		"Follow your heart like you would follow a "+getAdjective() + " " + getNoun() + ". It won't lead you astray. ",
		"You will fall in love with a " + getSign() + " but they are in love with their " + getNoun() + ". ",
		"Romance is not in your future today. Avoid it like a " + getAdjective() + " " + getNoun() + ". ",
		"Romance is blossoming like a " + getAdjective() + " " + getNoun() + "! ",
		"Avoid romantic engagements today. Wait for a sign - it will resemble a " +getAdjective() + " " + getNoun() + ". ",
		"Love is in the air. Unfortunately not the air you will be breathing. "
	];
	return options[randRange(1,options.length-1)];
}

function getRandomString() {
	var options = [
		"Avoid talking to a " + getSign() + " today. They will vex you and bring you a " + getNoun() + ". ",
		"Spend time talking to a " + getSign() + " today. They think you are a " + getNoun() + "! ",
		"Dont listen to people who give you vague advice about life or your " + getNoun() + ". ",
		"Today you need to practice your patience. And your piano. ",
		"Meet new people today. Show them your " + getNoun() + ". ",
		"Your spirits are high today - but watch our for a " + getAdjective() + " " + getNoun() + ". ",
		"Your sign is in the third phase today. This is important. ",
		"Your sign is in the second phase today. This is critical. ",
		"Something big is going to happen today. Or tomorrow. ",
		"Something something you're special and important something something." ,
		"A " + getAdjective() + " " + getNoun() + " will give you important advice today. ",
		"A " + getAdjective() + " " + getNoun() + " has it out for you today. ",
		"Last Tuesday was a good day. Today - not so much. ",
		"On the next full moon, it will be full. ",
		"Today is a bad day for work - instead focus on your " + getNoun() + ". ",
		"Today is a good day for work - but don't forget your " + getNoun() + ". ",
		"A dark stranger will enter your life. They will have a " + getAdjective() + " " + getNoun() + ". "
	];
	return options[randRange(1,options.length-1)];
}

function randRange(minNum, maxNum) {
	return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

let nouns, adjectives;

function create(args) {

	//see if we have a cache noun list
	if(!nouns) {
		nouns = require('./nouns');
	}
	if(!adjectives) {
		adjectives = require('./adjectives');
	}

	let horoscope = "";
	horoscope += getRandomString();
	horoscope += getFinancialString();
	horoscope += getRomanticString();
	horoscope += "\n\n";
	horoscope += "Your lucky numbers are " + randRange(1,10) + ", " + randRange(1,10) + ", and " + getNoun() + ".";
	return horoscope;

}

exports.create = create;

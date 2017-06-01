module.exports = {

	getCats:function() {
		return new Promise((resolve) => {
			let cats = ["Robin", "Cracker", "Luna", "Pig"];
			resolve(cats);
		});
	},
	getDogs:function() {
		return new Promise((resolve) => {
			let cats = ["Cayenne", "Panda Express", "Kimchee"];
			resolve(cats);
		});
	},
	
}
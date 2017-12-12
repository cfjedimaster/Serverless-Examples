const openwhisk = require('openwhisk');
const options = {
	apihost:'openwhisk.ng.bluemix.net',
	api_key:'super_secret_key_no_one_will_guess'
}
const ow = openwhisk(options);

function getCats() {
//	return ow.actions.invoke({name:'safeToDelete/getcats',blocking:true,result:true});
	return new Promise((resolve, reject) => {
		ow.actions.invoke({name:'safeToDelete/getcats',blocking:true,result:true}).then((result)=>{
			resolve(result.cats);
		});
	});
}

function getDogs() {
	return new Promise((resolve) => {
		let cats = ["Cayenne", "Panda Express", "Kimchee"];
		resolve(cats);
	});
}

module.exports = { getCats, getDogs }
let $status;
const API = 'https://openwhisk.ng.bluemix.net/api/v1/web/rcamden@us.ibm.com_My%20Space/safeToDelete/isVampireSafe.json';
const GOOD = `<p>It is totally safe to be outside as a vampire. Happy Hunting!</p>`;
const BAD = `<p>Sorry, the sun is up. Stay indoors!</p>`;

document.addEventListener('DOMContentLoaded', init, false);
function init() {

	$status = document.querySelector('#status');

	//First, get location
	navigator.geolocation.getCurrentPosition(gotLoc,locErr);

}

function locErr(e) {
	console.log('location error', e);
	$status.innerHTML = `
	<p>
	You need to let this app know your location in order for it to work. Or maybe you did
	and somethig else went wrong. I'm truly sorry.
	</p>`;
}

function gotLoc(pos) {
	console.log('position',pos.coords);

	fetch(API+'?lat='+pos.coords.latitude+'&lng='+pos.coords.longitude).then((res) => {
		return res.json();
	}).then((res) => {
		console.log(res);
		if(res.result === true) {
			$status.innerHTML=GOOD;
		} else {
			$status.innerHTML=BAD;
		}
	});
}
document.addEventListener('DOMContentLoaded', init, false);

let $search, $searchBtn, $results;
let searchAPI = 'https://openwhisk.ng.bluemix.net/api/v1/web/rcamden@us.ibm.com_My%20Space/default/rssSearch.http?q=';

function init() {
	console.log('ready to listen to your every need...');
	$search = document.querySelector('#search');
	$searchBtn = document.querySelector('#searchBtn');
	$results = document.querySelector('#results');

	$searchBtn.addEventListener('click', doSearch, false);
}

function doSearch() {
	//clear results always
	$results.innerHTML = '';

	let value = $search.value.trim();
	if(value === '') return;
	fetch(searchAPI + encodeURIComponent(value)).then( (resp) => {
		resp.json().then((results) => {
			console.log(results);
			if(!results.length) {
				$results.innerHTML = '<p>Sorry, I found nothing for that.</p>';
				return;
			}

			let result = '<ul>';
			results.forEach((entry) => {
				result += `
<li><a href="${entry.url}">${entry.title}</a><br/>
${entry.context}</li>
				`;
			});
			result += '</ul>';
			$results.innerHTML = result;
		});
	});
}
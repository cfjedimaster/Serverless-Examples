const api = 'https://openwhisk.ng.bluemix.net/api/v1/web/ray@camdenfamily.com_dev/meetup/search.json?radius=global&category=34&omit=description,organizer,category,urlname,score&country=US';

let $keyword, $submitBtn, $resultItems;

$(document).ready(function() {

    $('#searchForm').on('submit', doSearch);
    $keyword = $('#search');
    $submitBtn = $('#submitBtn');
    $resultItems = $('#resultItems');

});

function doSearch(e) {
    e.preventDefault();
    $resultItems.html('');

    console.log('Ok, search against Meetup');
    let keyword = $keyword.val();
    console.log(keyword);

    //todo: leave if no search

    $submitBtn.attr('disabled','disabled');
    let url = api + '&text='+encodeURIComponent(keyword);
    $resultItems.html('<i>Searching...</i>');

    $.get(url).then((resp) => {
        $submitBtn.removeAttr('disabled');
        console.log(resp);
        if(resp.result.length === 0) {
            $resultItems.html('<p>Sorry, but there were no results.</p>');
            return;
        }
        let s = `<p>I found ${resp.result.length} match(es).</p>`;
        resp.result.forEach((item) => {
            let itemHtml = `
<h2>${item.name}</h2>
<p>
<a href="${item.link}#" target="_new">${item.link}</a><br/>
Members: ${item.members}<br/>
Address: ${item.city}, ${item.state}
</p>
            `;
            s += itemHtml;
            console.dir(item);
        });
        $resultItems.html(s);
    });
}
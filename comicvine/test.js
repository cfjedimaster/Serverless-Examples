const rp = require('request-promise');
const fs = require('fs');

let image = 'https://comicvine.gamespot.com/api/image/scale_large/1-male-good-large.jpg';

var options = {
    uri: image,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    encoding:null
};

rp(options).then((body) => {
	let b64 = new Buffer(body, 'binary').toString('base64');
    console.log(b64);
    fs.writeFileSync('./test.jpg', new Buffer(body, 'binary'));
}).catch((err) => {
    console.log('in err');
    console.log(err);
});

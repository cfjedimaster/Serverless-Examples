const express = require('express');
const app = express();
const openwhisk = require('openwhisk');

app.use(express.static('public'));

const NodeCache = require('node-cache');
const activationCache = new NodeCache();

let ow = openwhisk();

app.set('port', process.env.PORT || 3000);

app.get('/activations', function(req, res) {
    console.log('ts',req.query.ts);
    let options = {
        docs:true,
        limit:50
    };
    if(req.query.ts) options.since = req.query.ts;
    ow.activations.list(options).then(result => {
        let response = result.map(r => {
            activationCache.set(r.activationId, r);
            return {
                id:r.activationId,
                name:r.name,
                success:r.response.success,
                ts:r.start,
                duration:r.duration
            }
        });
        console.log('i got '+result.length+ ' activations');
        if(result.length) {
            timestamp = result[0].start+1;
        } else {
            if(req.query.ts) timestamp = req.query.ts;
            else timestamp = 0;
        }
        res.send({activations:response,ts:timestamp});
    });
});

app.get('/activation/:id', function(req, res) {
    console.log('load activation '+req.params.id);
    let activation = activationCache.get(req.params.id);
    console.log(activation);
    if(activation) res.send(activation);
});

app.listen(app.get('port'), function() {
    console.log('Express running on http://localhost:' + app.get('port'));
});

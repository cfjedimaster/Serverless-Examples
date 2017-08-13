const openwhisk = require('openwhisk');

function main(args) {
    let myActivation = process.env.__OW_ACTIVATION_ID;
    let ow = openwhisk();
    console.log('try to load '+myActivation);

    return new Promise((resolve, reject) => {

        setTimeout(function() {

            try {
                ow.activations.get({activation:myActivation}).then(activation => {
                    resolve({result:activation});
                }).catch(err => {
                    console.log('in error', err);
                    reject({err:err});  
                });
            } catch(e) {
                console.log('main catch',e);
                reject({err:e});
            }
        
        }, 1000);

    });

}
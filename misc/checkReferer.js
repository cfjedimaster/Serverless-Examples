const allowedRef = ['grieving-skate.surge.sh'];

function main(args) {

    let referrer = args.__ow_headers.referer;
    let ok = false;
    allowedRef.forEach(ref => {
        if(referrer.indexOf(ref) >= 0) ok = true;
    });

    if(ok) {
        return { args:args };
    } else {
        throw new Error('Invalid Referrer');
    }

}
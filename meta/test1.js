
function main(args) {

    let result = {};

    for(let key in process.env) {
        if(key.indexOf('__OW_') === 0) {
            result[key] = process.env[key];
        }
    }

    return {
        result:result
    }

}
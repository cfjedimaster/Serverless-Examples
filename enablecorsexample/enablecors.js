/*
Written by Stephen J. Fink (http://researcher.watson.ibm.com/researcher/view.php?person=us-sjfink)
*/

/**
 * This action simply echos it's input set an Allow-Origin CORS policy
 */
function main(params) {
    var domain = params.domain ? params.domain : '*';
    return {
        headers: {
                     'Access-Control-Allow-Origin':domain,
                     'Content-Type':'application/json'
                 },
        statusCode:200,
        body: new Buffer(JSON.stringify(params)).toString('base64')
    }
}
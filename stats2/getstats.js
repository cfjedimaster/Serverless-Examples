#!/usr/bin/env node
const openwhisk = require('openwhisk');
const creds = require('./creds.json');

const ow = openwhisk({
    apihost: creds.apihost, 
    api_key: creds.api_key}
);

//used to max out the number of activations we fetch
const MAX_ACTS = 2000;

const chalk = require('chalk');

if(process.argv.length == 2) {
    process.stdout.write(chalk.blue('Usage: ./index.js <<actionname>>\n'));
    process.exit();
}

const action = process.argv[2];
process.stdout.write(chalk.blue('Fetching data for action '+action+'..'));

let results = {
    total:0,
    duration:0,
    fastduration:99999999,
    slowduration:0,
    successful:0,
    firstInvocation:'',
    lastInvocation:''
};

/*
Going to store dates in an array and sort. Right now the package is returning
items reverse date sorted, but its not documented and may change in the future.
*/
let dates = [];

let activations = [];
function getAllActivations(cb,acts,skip) {
    if(!acts) acts=[];
    if(!skip) skip=0;
    process.stdout.write(chalk.blue('.'));
    ow.activations.list({limit:200, name:action, docs:true, skip:skip}).then(result => {
        if(result.length === 0 || acts.length >= MAX_ACTS) return cb(acts);
        acts = acts.concat(result);
        getAllActivations(cb,acts,skip+200);
    });
}

getAllActivations((result) => {
    
    results.total = result.length;
    result.forEach((act) => {
        results.duration += act.duration
        if(act.duration < results.fastduration) results.fastduration = act.duration;
        if(act.duration > results.slowduration) results.slowduration = act.duration;
        if(act.response.success) results.successful++;
        dates.push(act.start);  
    });

    dates.sort((a,b) => {
        if(a < b) return -1;
        if(a === b) return 0;
        if(a > b) return 1;
    });

    results.firstInvocation = new Date(dates[0]);
    results.lastInvocation = new Date(dates[dates.length-1]);
       
    results.avgduration = Number((results.duration/results.total).toFixed(2));
    results.successfulperc = Number((results.successful/results.total*100).toFixed(2));

    let finalResult = `
Total Number of Invocations:    ${results.total}
Total Successful:               ${results.successful} (${results.successfulperc}%)
First Invocation:               ${results.firstInvocation}
Last Invocation:                ${results.lastInvocation}
Total Duration (ms):            ${results.duration}
Quickest Duration (ms):         ${results.fastduration}
Slowest Duration (ms):          ${results.slowduration}
Average Duration (ms):          ${results.avgduration}
`;
    process.stdout.write(chalk.green(finalResult));
    //console.log(results);

});

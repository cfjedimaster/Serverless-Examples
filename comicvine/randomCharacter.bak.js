const rp = require('request-promise');

let apiUrl = `https://www.comicvine.com/api/characters?api_key=${key}&format=json&field_list=aliases,deck,description,first_appeared_in_issue,image,real_name,name,id,publisher&limit=1&offset=`;

/*
Hard coded but changes on the fly
*/
let totalChars = 100000;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main(args) {

    return new Promise( (resolve, reject) => {
        
        console.log('current max is '+totalChars);

        var options = {
            uri: 'https://www.comicvine.com/api/characters',
            qs: {
                api_key: key,
                format:'json',
                field_list:'aliases,deck,description,first_appeared_in_issue,image,real_name,name,id,publisher',
                limit:1,
                offset:getRandomInt(0,totalChars)
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        };

        rp(options)
        .then(function(json) {
            //update totalChars
            totalChars = json.number_of_total_results;
            resolve({result:json.results[0]});
        })
        .catch(function(err) {
            console.log('error in rp');
            reject({error:err});
        });
            
    });
}

--- ROUND TWO ---

const rp = require('request-promise');

let apiUrl = `https://www.comicvine.com/api/characters?api_key=${key}&format=json&field_list=aliases,deck,description,first_appeared_in_issue,image,real_name,name,id,publisher&limit=1&offset=`;

/*
Hard coded but changes on the fly
*/
let totalChars = 100000;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main(args) {

    return new Promise( (resolve, reject) => {
        
        console.log('current max is '+totalChars);

        var options = {
            uri: 'https://www.comicvine.com/api/characters',
            qs: {
                api_key: key,
                format:'json',
                field_list:'aliases,deck,description,first_appeared_in_issue,image,real_name,name,id,publisher,api_detail_url',
                limit:1,
                offset:getRandomInt(0,totalChars)
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        };

        let character;

        rp(options)
        .then(function(json) {
            //update totalChars
            totalChars = json.number_of_total_results;
            //look up details now
            character = json.results[0];
            return rp({
                uri:character.api_detail_url,
                qs:{
                    api_key:key,
                    format:'json',
                    field_list:'birth,character_enemies,character_friends,creators,powers,teams'
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            });
        })
        .then(function(json) {
            console.log('in second then');
            character.detail = json.results;
            resolve({character:character});
        })
        .catch(function(err) {
            console.log('error in rp');
            reject({error:err});
        });
            
    });
}


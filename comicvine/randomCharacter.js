const rp = require('request-promise');

/*
Hard coded but changes on the fly
*/
let totalChars = 100000;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main(args) {

    return new Promise( (resolve, reject) => {
        
        let character;

        var options = {
            uri: 'https://www.comicvine.com/api/characters',
            qs: {
                api_key: args.key,
                format:'json',
                field_list:'aliases,deck,description,first_appeared_in_issue,image,real_name,name,id,publisher,api_detail_url,site_detail_url,gender',
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
            //look up details now
            character = json.results[0];
            return rp({
                uri:character.api_detail_url,
                qs:{
                    api_key:args.key,
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
            let detail = json.results;
            for(let key in detail) {
                character[key] = detail[key];
            }
            /*
            craft a url for the issue based on first_appeared_in_issue.
            note it includes an api_detail_url but it doesn't work
            */
            console.log('testing first', character.first_appeared_in_issue);
            return rp({
                uri:'https://www.comicvine.com/api/issues',
                qs:{
                    api_key:args.key,
                    format:'json',
                    filter:'id:'+character.first_appeared_in_issue.id
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            });
        })
        .then(function(json) {
            character.first_issue = json.results[0];
            resolve({character:character});
        })
        .catch(function(err) {
            console.log('error in rp',err);
            reject({error:err});
        });
            
    });
}


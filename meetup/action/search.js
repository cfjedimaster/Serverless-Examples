const rp = require('request-promise');

function main(args) {

    return new Promise((resolve, reject) => {
        
        let url = 'https://api.meetup.com/find/groups?key='+args.key;

        if(args.category) url += '&category='+args.category;
        if(args.country) url += '&country='+args.country;
        if(args.fallback_suggestions) url += '&fallback_suggestions='+args.fallback_suggestions;
        if(args.fields) url += '&fields='+args.fields;
        //skipping filter
        if(args.lat) url += '&lat='+args.lat;
        if(args.lon) url += '&lon='+args.lon;
        if(args.location) url += '&location='+args.location;
        if(args.radius) url += '&radius='+args.radius;
        //skipping self_groups
        if(args.text) url += '&text='+encodeURIComponent(args.text);
        if(args.topic_id) url += '&topic_id='+args.topic_id;
        if(args.upcoming_events) url += '&upcoming_events='+args.upcoming_events;
        if(args.zip) url += '&zip='+args.zip;

        if(args.only) url += '&only='+args.only;
        if(args.omit) url += '&omit='+args.omit;

        /*
        Note to self: I modified the code to return the full
        response so I could potentially do paging. I decided 
        against that for now, but I'm keeping resolveWithFullResponse
        in for the time being.
        */
        let options = {
            url:url, 
            json:true,
            resolveWithFullResponse: true
        };

        rp(options).then((resp) => {
            //console.log(resp.headers);
            resolve({result:resp.body});
        }).catch((err) => {
            reject({error:err});
        });

    });

}
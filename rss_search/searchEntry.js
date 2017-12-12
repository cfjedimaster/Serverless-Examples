
let index = 'blogcontent';
let type = 'entry';

function main(args) {

    //args.q required - the search

    return {
        index:index,
        type:type,
        q:args.q
    }

}
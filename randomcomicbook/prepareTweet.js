const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function main(args) {
    //initialize to now just in case...
    let saleDate = new Date();

    //get the onsale date
    args.comic.dates.forEach((dateRec) => {
        if(dateRec.type === 'onsaleDate') saleDate = new Date(dateRec.date);
    });

    //get the right link
    let link = '';
    args.comic.urls.forEach((urlRec) => {
        if(urlRec.type === 'detail') link = urlRec.url;
    });

    //get the cover
    let cover = args.comic.thumbnail.path + '.' + args.comic.thumbnail.extension;

    console.log(args.comic);

    // Create the text based on the comic data
    let tweet = '"'+ args.comic.title + '" published '+ (MONTHS[saleDate.getMonth()])+' '+saleDate.getFullYear() +'\n'+link;

    return {
        status:tweet,
        image:cover
    }
}
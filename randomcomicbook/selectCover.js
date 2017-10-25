
const IMAGE_NOT_AVAIL = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main(args) {
    let comics = args.result.data.results;
    console.log('before filter - '+comics.length+' comics');
    /*
    first, filter the array by comics that have a cover
    */
    comics = comics.filter((comic) => {
        return (comic.thumbnail && comic.thumbnail.path != IMAGE_NOT_AVAIL);
    });

    console.log('after filter - '+comics.length+' comics');

    let selectedComic = {};

    if(comics.length) {
        selectedComic = comics[getRandomInt(0, comics.length-1)];
        /*
        remove a crap ton of stuff as we don't need everything
        */
        delete selectedComic.characters;
        delete selectedComic.collectedIssues;
        delete selectedComic.collections;
        delete selectedComic.creators;
        delete selectedComic.description;
        delete selectedComic.diamondCode;
        delete selectedComic.digitalId;
        delete selectedComic.ean;
        delete selectedComic.events;
        delete selectedComic.format;
        delete selectedComic.id;
        delete selectedComic.images;
        delete selectedComic.isbn;
        delete selectedComic.issn;
        delete selectedComic.modified;
        delete selectedComic.pageCount;
        delete selectedComic.prices;
        delete selectedComic.series;
        delete selectedComic.stories;
        delete selectedComic.textObjects;
        delete selectedComic.upc;
        delete selectedComic.variantDescription;
        delete selectedComic.variants;
    }

    return {
        comic:selectedComic
    }
}
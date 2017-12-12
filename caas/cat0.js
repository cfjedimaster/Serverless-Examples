function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function randomName() {
    var initialParts = ["Fluffy","Scruffy","King","Queen","Emperor","Lord","Hairy","Smelly","Most Exalted Knight","Crazy","Silly","Dumb","Brave","Sir","Fatty"];
    var lastParts = ["Sam","Smoe","Elvira","Jacob","Lynn","Fufflepants the III","Squarehead","Redshirt","Titan","Kitten Zombie","Dumpster Fire","Butterfly Wings","Unicorn Rider"];
    return initialParts[getRandomInt(0, initialParts.length-1)] + ' ' + lastParts[getRandomInt(0, lastParts.length-1)]
};
 
function randomColor() {
    var colors = ["Red","Blue","Green","Yellow","Rainbow","White","Black","Invisible"];
    return colors[getRandomInt(0, colors.length-1)];
}
 
function randomGender() {
    var genders = ["Male","Female"];
    return genders[getRandomInt(0, genders.length-1)];
}
 
function randomAge() {
    return getRandomInt(1, 15);
}
 
function randomBreed() {
    var breeds = ["American Shorthair","Abyssinian","American Curl","American Wirehair","Bengal","Chartreux","Devon Rex","Maine Coon","Manx","Persian","Siamese"];
    return breeds[getRandomInt(0, breeds.length-1)];
}

function randomPic() {
    var w = getRandomInt(100,400);
    var h = getRandomInt(100,400);
    return `http://placekitten.com/${w}/${h}`;
}

function main(args) {
   console.log('cats args: '+JSON.stringify(args));
   return {
        cat:{
            name:randomName(),
            color:randomColor(),
            gender:randomGender(),
            age:randomAge(),
            breed:randomBreed(),
            picture:randomPic()
        }
    };
}
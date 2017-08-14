function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main(params) {
    //get random values
    let year = getRandomInt(1960, new Date().getFullYear()-1);
    let month = getRandomInt(1,12);
    
    let monthStr = month<10?"0"+month:month;
    let daysInMonth = new Date(year, month, 0).getDate();

    let beginDateStr = year + "-" + monthStr + "-01";
    let endDateStr = year + "-" + monthStr + "-" + daysInMonth;
    
    let dateString = beginDateStr+','+endDateStr;
    console.log('dateString is '+dateString);
    
    return {
        limit:100,
        format:"comic",
        formatType:"comic",
        dateRange:dateString
    }
}
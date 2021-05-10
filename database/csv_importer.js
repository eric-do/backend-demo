
var fs = require('fs');
const csv = require('fast-csv');
const db = require('./');

const parseDate = date => {
    // parse number from string
    // if the number is valid date, create Date object from number
    // else create Date object from string
    // return the date
    let dateAsInteger = parseInt(date);
    formattedDate = isNaN(dateAsInteger) ? new Date(date) : new Date(dateAsInteger);
    return formattedDate.toString() === "Invalid Date" ? null : formattedDate;
}

const parseBoolean = bool => {
    // if string is "true" return true, otherwise return false
    return typeof bool === 'string' ? bool.toLowerCase() === 'true' : bool;
}

const parseRating = rating => {
    // if the rating is greater than 5, return  5
    // else return rating
    // if the rating is a string
    // attempt to parse string, else return 0
    if (typeof rating === 'number') {
        return Math.min(rating, 5);
    }

    if (typeof rating === 'string') {
        return Math.min(parseInt(rating), 5) || 0;
    }
}

let counter = 0;
const maxConcurrent = 10;
const numConcurrent = 0;
let isPaused = false;

console.time('readFile');
let csvStream = csv.parseFile("../csv/reviews_temp.csv", {
    headers: true,
    }).transform(record => ({
        ...record,
        date: parseDate(record.date),
        recommend: parseBoolean(record.recommend),
        reported: parseBoolean(record.reported),
        rating: parseRating(record.rating),
        helpfulness: parseRating(record.helpfulness)
    }))
    .on("data", function(record){
        const q = `INSERT INTO reviews SET ?`;
        // csvStream.pause();
        db.query(q, record, (err) => {
            if (err) {
                throw err
            }

            counter++;

            if (counter % 100 === 0) {
                console.log(counter);
            }
        })
        // csvStream.resume();
    }).on("end", (count) => {
        console.log(`${count} rows successfully read.`);
        console.timeEnd('readFile');
        db.end();
    }).on("error", err => {
        console.log(err);
    });

var fs = require('fs');
const csv = require('fast-csv');
const db = require('./db');
const moment = require('moment');

let counter = 0;

const parseDate = date => {
    let dateAsInteger = parseInt(date);
    formattedDate = isNaN(dateAsInteger) ? new Date(date) : new Date(dateAsInteger);
    return formattedDate.toString() === "Invalid date" ? new Date() : formattedDate;
}

const parseBoolean = bool => {
    return typeof bool === 'string' ? bool.toLowerCase() == 'true' : bool;
}

const parseRating = rating => {
    if (typeof rating === 'number') {
        return Math.min(rating, 5);
    }

    if (typeof rating === 'string') {
        return Math.min(parseInt(rating), 5) || 0;
    }
}

const maxConcurrent = 10;
let isPaused = false;

console.time('import');
let csvStream = csv.parseFile("./csv/reviews_temp.csv", {
    headers: true,
    }).transform(record => ({
        ...record,
        date: parseDate(record.date),
        recommend: parseBoolean(record.recommend),
        reported: parseBoolean(record.reported),
        rating: parseRating(record.rating),
        helpfulness: parseRating(record.rating),
    }))
    .on("data", function(record){
        const q = `INSERT INTO reviews SET ?`;

        // csvStream.pause();

        db.query(q, record, (err) => {
            if (err) {
                console.log(err);
            }
            counter++
        })
        // csvStream.resume();

    }).on("end", (count) => {
        console.log(`${count} rows successfully read.`);
        console.timeEnd('import');
        db.end();
    }).on("error", err => {
        console.log(err);
    });
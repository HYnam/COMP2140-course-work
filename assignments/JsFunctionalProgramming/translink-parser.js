// Import dependencies using ES Modules (requires "type": "module" in package.json)

import promptSync from "prompt-sync";
const prompt = promptSync({
    sigint: false
});
import fetch from "node-fetch";
import fs from "fs/promises";

function main() {
    // Declare global variable
    const launchTripUpdate = "http://127.0.0.1:5343/gtfs/seq/trip_updates.json";
    const launchVehiclePos = "http://127.0.0.1:5343/gtfs/seq/vehicle_positions.json";

    /**
     * This function check if a given date is format to YYYY-MM-DD
     * @param {string} dateString - date of user input
     * @returns {boolean} - is it a valid format of date
     */
    function isValidDate(dateString)
    {
        // First check for the pattern
        var regex_date = /^\d{4}\-\d{2}\-\d{2}$/;

        if(!regex_date.test(dateString))
        {
            return false;
        }

        // Parse the date parts to integers
        var parts   = dateString.split("-");
        var day     = parseInt(parts[2], 10);
        var month   = parseInt(parts[1], 10);
        var year    = parseInt(parts[0], 10);

        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
        {
            return false;
        }

        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        {
            monthLength[1] = 29;
        }

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    /**
     * This function check if given time is in valid format HH:mm
     * @param {string} timeString - input time
     * @returns {boolean} - valid time format or not
     */
    function isValidTime(timeString) {
        const regex_time = /^(\d{2})\:(\d{2})$/;
        const timeMatches = timeString.match(regex_time);

        if(!timeMatches)
        {
            return false;
        }

        const hour = parseInt(timeMatches[1]);
        const minute = parseInt(timeMatches[2]);

        return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59
    }

    /**
     * This function fetches data asynchronously based on the URL provided.
     * @param {string} url - the URL to fetch data from (expecting JSON).
     * @returns {string} the JSON response.
     */
    async function fetchData(url) {
        const response = await fetch(url);
        const responseJSON = await response.json();
        return responseJSON;
    }

    let welcomeMessage = "Welcome to the UQ Lakes station bus tracker!";
    let exitMessage = "Thanks for using the UQ Lakes station bus tracker!";
    let messageInputDate = "What date will you depart UQ Lakes station by bus?";
    let messageInputTime = "What time will you depart UQ Lakes station by bus?";
    let searchAgain = "Would you like to search again?";
  
    console.log(welcomeMessage);

    const readline = require('readline')
    const depart = readline.createInterface({
        input: process.stdin, 
        output: process.stdout
    });

    depart.question(messageInputDate, date => {
        depart.question(messageInputTime, time => {
            if (isValidDate(date) && isValidTime(time))
                console.log(`You depart UQ Lakes station on ${date} at ${time}.`);
            else {
                console.log('Invalid format!');
            }
            depart.close();
        });
    });
}

main();
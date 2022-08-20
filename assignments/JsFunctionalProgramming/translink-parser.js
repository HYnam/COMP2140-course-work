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
     * This function stringifies a given date format similar to UTC format.
     * @param {string} date - a date in UTC format (dd/mm/yyyy).
     * @returns {string} date similar to UTC format (yyyy-mm-dd).
     */
     function dateFormat(date) {
        let month = new String(date.getMonth() + 1);
        if (month.length < 2) {
            month = `0${month}`;
        }
        let day = new String(date.getDate());
        if (day.length < 2) {
            day = `0${day}`;
        }
        return new String(`${date.getFullYear()}-${month}-${day}`);
    }

    /**
     * This function format the given time to HH:mm
     * @param {string} time - 
     * @return {string} time to format HH:mm
     */
    function timeFormat(time) {

    }

    // Declare date global variable
    const date = new Date();
    const dateValid = dateFormat(date);     // Valid format of date for use
    

    // Declare message global variables
    let welcomeMessage = "Welcome to the UQ Lakes station bus tracker!";
    let exitMessage = "Thanks for using the UQ Lakes station bus tracker!";
    let messageInputDate = "What date will you depart UQ Lakes station by bus?";
    let messageInputTime = "What time will you depart UQ Lakes station by bus?";
    let searchAgain = "Would you like to search again?";
    

    // user input date
    const readline = require('readline')

    const depart = readline.createInterface({
        input: process.stdin, 
        output: process.stdout
    });

    depart.question('What date will you depart UQ Lakes station by bus?', date => {
        depart.question('What time will you depart UQ Lakes station by bus?', time => {
            console.log(`you depart UQ Lakes station on ${date} at ${time}.`);
            depart.close();
        });
    });

}

main();
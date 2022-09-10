// Import dependencies using ES Modules (requires "type": "module" in package.json)
import promptSync from "prompt-sync";
const prompt = promptSync({
    sigint: false
});
import fetch from "node-fetch";
import fs from "fs/promises";
import * as readline from 'node:readline';

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

    const depart = readline.createInterface({
        input: process.stdin, 
        output: process.stdout
    });
    let minute;
    let TD_AT= new Array();
    let RD_SD_THS= new Array();
    let RD_RSHN_RLN= new Array();
    let tripID;
    let routeID;

    depart.question(messageInputDate, date => {
        depart.question(messageInputTime, time => {
            if (isValidDate(date) && isValidTime(time)) {
                const allFileContents = fs.readFileSync('./static-data/stop_times.txt', 'utf-8');
               allFileContents.split(/\r?\n/).forEach(row =>  {
                minute=row.split(",")[1].split(":")[1]-time.split(":")[1];
                if(row.split(",")[1].split(":")[0]===time.split(":")[0] && (minute>=0 && minute<=10 ))
                {
                   // console.log("comming........" + row[0]+","+row[1]);

                   TD_AT.push(row.split(",")[0]+","+row.split(",")[1]);
                }
               });

               const fileContents = fs.readFileSync('./static-data/trips.txt', 'utf-8');
               fileContents.split(/\r?\n/).forEach(row =>  {
                tripID=row.split(",")[2];
                
                TD_AT.forEach(chunk=>{
                    if (tripID===chunk.split(",")[0]) {
                        RD_SD_THS.push(row.split(",")[0]+","+row.split(",")[1]+","+row.split(",")[3])
                    }
                })
                
               });

               const myFileContents = fs.readFileSync('./static-data/routes.txt', 'utf-8');
               myFileContents.split(/\r?\n/).forEach(row =>  {
                routeID=row.split(",")[0];
                
                RD_SD_THS.forEach(chunk=>{
                    if (routeID===chunk.split(",")[0]) {
                        RD_RSHN_RLN.push(row.split(",")[0]+","+row.split(",")[1]+","+row.split(",")[2])
                    }
                })
                
               });
               
                for (let index = 0; index < TD_AT.length; index++) {

               
                    console.log("...........................Record #"+(index+1)+"...........................")
                    console.log("Short name : "+ RD_RSHN_RLN[index].split(",")[1]);
                    console.log("Long name : "+ RD_RSHN_RLN[index].split(",")[2]);
                    console.log("Service ID : "+ RD_SD_THS[index].split(",")[1]);
                    console.log("Trip Head sign : "+ RD_SD_THS[index].split(",")[2]);
                    console.log("Vehicle Arrival Time : "+ TD_AT[index].split(",")[1]);
                
                
                
                
                }
                console.log("...........................End.........................................")
            }
            else {
                console.log('Invalid format!');
            }
            depart.question(searchAgain, option => {
                if (option.toLowerCase()==='y'|| option.toLowerCase()==="yes") {
                    depart.close();
                    main();
                    
                }
                else{
                    console.log(exitMessage);
                }
            });
        });
    });
}

main();
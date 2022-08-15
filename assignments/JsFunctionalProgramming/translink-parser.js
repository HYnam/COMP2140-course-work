// Welcome message
console.log("Welcome to the UQ Lakes station bus tracker!");

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

depart.on("close", function() {
    process.exit(0);
});


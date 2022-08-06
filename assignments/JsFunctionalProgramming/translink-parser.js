// Welcome message
console.log("Welcome to the UQ Lakes station bus tracker!");

// user input date
const readline = require('readline').createInterface({
    input: process.stdin, 
    output: process.stdout
});

readline.question('What date will you depart UQ Lakes station by bus?', date => {
    console.log(`you depart UQ Lakes station ${date}.`);
    readline.close();
});

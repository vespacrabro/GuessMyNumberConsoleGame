// Add standart modules
const readline = require("readline");
const fs = require("fs").promises;

// Add non - standart modules
require("colors");
const { program } = require("commander");

// create file for saving results
program.option(
  // flags:string
  "-f, --file [type]",
  // description
  "file for saving game results",
  // default value
  "results.txt"
);

// takes the command line arguments (process.argv) and parses them using declared program above
program.parse(process.argv);

// for using interactive input in the console
const rl = readline.createInterface({
  input: process.stdin, // input from standard stream
  output: process.stdout, // output from standard stream
});

// Game logic

// defining constants
// user attempts
let count = 0;
// file where we save results
const logFile = program.opts().file;
// create random number and correct it 0 -> 1, last number 9 -> 10
const mind = Math.floor(Math.random() * 10) + 1;

// checking if user type valid answer
const isValid = (value) => {
  // check if input is not a number
  if (isNaN(value)) {
    console.log("Enter a number!".red);
    return false;
  }
  // check if input is not in our range
  if (value < 1 || value > 10) {
    console.log("The number must be between 1 and 10".red);
    return false;
  }
  // returning true if input is valid
  return true;
};

// saving results
const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`File successfully saved ${logFile}`.green);
  } catch (err) {
    console.log(`Failed to save file ${logFile}`.red);
  }
};

// game function

const game = () => {
  // asking user to write a number and waiting for input
  rl.question(
    "Enter a number from 1 to 10 to guess the number: ".yellow,
    (value) => {
      // Convert the string input to a number
      let a = +value;
      // check if input is not valid
      if (!isValid(a)) {
        // start game again if not
        game();
        return;
      }
      // otherwise increase the counter of attempts
      count += 1;
      // compare the guess to the secret answer and let the user know.
      if (a === mind) {
        console.log(
          "Congratulations! You guessed the number in %d step(s)".green,
          count
        );
        log(
          `${new Date().toLocaleDateString()}: Congratulations! You guessed the number in ${count} step(s)`
        ).finally(() => rl.close());
        return;
      }
      // otherwise execute recursion until the number is guessed
      console.log("Sorry, guess again!".red);
      game();
    }
  );
};

game();

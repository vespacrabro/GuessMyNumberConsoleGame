// Add module - sync prompt
const prompt = require("prompt-sync")({ sigint: true });
// Add non - standart modules
require("colors");

// defining constants
// create random number and correct it 0 -> 1, last number 9 -> 10
const mind = Math.floor(Math.random() * 10) + 1;
// This variable is used to determine if the app should continue prompting the user for input
let foundCorrectNumber = false;

while (!foundCorrectNumber) {
  // ask a user to enter a number and get user input
  let guess = prompt("Guess a number from 1 to 10: ".yellow);
  // convert the string input to a number 
  guess = Number(guess);

  // compare the guess to the secret answer and let the user know.
  if (guess === mind) {
    console.log("Congrats, you got it!".green);
    foundCorrectNumber = true;
  } else {
    console.log("Sorry, guess again!".red);
  }
}

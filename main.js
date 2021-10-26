let userPoints = 0;
let computerPoints = 0;

function computerPlay() {
  let choices = ["Rock", "Paper", "Scissors"];
  let computerChoice = choices[Math.floor(Math.random() * choices.length)];
  return computerChoice[0].toUpperCase() + computerChoice.slice(1);
}

function playRound(userSelection, computerSelection) {
  userSelection = userSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (
    (userSelection == "rock" && computerSelection == "scissors") ||
    (userSelection == "paper" && computerSelection == "rock") ||
    (userSelection == "scissors" && computerSelection == "paper")
  ) {
    console.log(
      `User wins! ${
        userSelection[0].toUpperCase() + userSelection.slice(1)
      } beats ${
        computerSelection[0].toUpperCase() + computerSelection.slice(1)
      }!`
    );
    userPoints++;
    return true;
  } else if (
    (computerSelection == "rock" && userSelection == "scissors") ||
    (computerSelection == "paper" && userSelection == "rock") ||
    (computerSelection == "scissors" && userSelection == "paper")
  ) {
    console.log(
      `Computer wins! ${
        computerSelection[0].toUpperCase() + computerSelection.slice(1)
      } beats ${userSelection[0].toUpperCase() + userSelection.slice(1)}!`
    );
    computerPoints++;
    return true;
  } else {
    console.log("Tie! Play this round again.");
    return false;
  }
}

function displayScore(userPoints, computerPoints) {
  console.log(`User: ${userPoints}, Computer: ${computerPoints}`);
}

function getNumRounds() {
  let valid = true;
  let numRounds = 0;
  while (valid) {
    numRounds = parseInt(prompt("Please enter the number of rounds: "));
    if (typeof numRounds !== "number") {
      console.log("That is not a number!");
    } else if (numRounds % 2 == 0) {
      console.log("Number of rounds must be odd!");
    } else {
      console.log(
        `User chose ${numRounds} rounds. Best ${
          numRounds - 1
        } out of ${numRounds} it is!`
      );
      return numRounds;
    }
  }
}

function game() {
  console.log("Welcome to Rock Paper Scissors!");
  let numRounds = getNumRounds();

  let counter = 1;
  while (userPoints < numRounds - 1 && computerPoints < numRounds - 1) {
    console.log(`Round ${counter}:`);
    userSelection = prompt("Please enter your choice: ");
    computerSelection = computerPlay();
    console.log(
      `User chose ${userSelection[0].toUpperCase() + userSelection.slice(1)}`
    );
    console.log(`Computer chose ${computerSelection}`);
    if (playRound(userSelection, computerSelection)) {
      counter++;
      displayScore(userPoints, computerPoints);
    }
  }
  if (userPoints > computerPoints) {
    console.log("User wins!");
  } else {
    console.log("Computer wins!");
  }
}

game();

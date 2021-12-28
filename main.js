let userPoints = 0;
let computerPoints = 0;

function computerPlay() {
  const choices = ["Rock", "Paper", "Scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  return computerChoice;
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

function userWins(userSelection, computerSelection) {
  if (
    (userSelection == "Rock" && computerSelection == "Scissors") ||
    (userSelection == "Paper" && computerSelection == "Rock") ||
    (userSelection == "Scissors" && computerSelection == "Paper")
  ) {
    return true;
  }
  return false;
}

function computerWins(userSelection, computerSelection) {
  if (
    (computerSelection == "Rock" && userSelection == "Scissors") ||
    (computerSelection == "Paper" && userSelection == "Rock") ||
    (computerSelection == "Scissors" && userSelection == "Paper")
  ) {
    return true;
  }
  return false;
}

function removeAllChildNotes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function playRound2(e) { // Add transition so that there is a slight delay when the results show up after you click the button
  const resultArea = document.querySelector(".resultArea");
  removeAllChildNotes(resultArea);

  const userSelection = e.target.innerText;
  const computerSelection = computerPlay();

  // Update computer message
  const compSelectMsg = document.createElement("div");
  compSelectMsg.textContent = `Computer chose ${computerSelection}.`;
  compSelectMsg.classList.add("compMessage");
  resultArea.appendChild(compSelectMsg);

  // Update result message
  const resultMsg = document.createElement("div");
  resultMsg.classList.add("resultMessage");

  if (userWins(userSelection, computerSelection)) {
    resultMsg.textContent = `User wins! ${userSelection} beats ${computerSelection}!`;
    userPoints++;
    // Update user score
    const userScore = document.querySelector(".userScore");
    userScore.textContent = `User: ${userPoints}`;
  } 
  else if (computerWins(userSelection, computerSelection)) {
    resultMsg.textContent = `Computer wins! ${computerSelection} beats ${userSelection}!`;
    computerPoints++;
    // Update computer score
    const compScore = document.querySelector(".compScore");
    compScore.textContent = `Computer: ${computerPoints}`;
  }
  else {
    resultMsg.textContent = "Tie! Play this round again.";
  }

  resultArea.appendChild(resultMsg); 
}

// Let's add the event listener to each button
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", playRound2));
//game();

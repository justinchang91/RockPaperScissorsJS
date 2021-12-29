let userPoints = 0;
let computerPoints = 0;
let roundNumber = 1;

function computerPlay() {
  const choices = ["Rock", "Paper", "Scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  return computerChoice;
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

function disableButtons() {
  const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
      button.removeEventListener("click", playRound2);
      if (button.classList[1] == "rock") {
        button.style.backgroundColor = "rgb(172, 20, 20)";  // hard coded to the hover colour
      } else if (button.classList[1] == "paper") {
        button.style.backgroundColor = "rgb(16, 119, 16)";
      } else {
        button.style.backgroundColor = "rgb(21, 100, 180)";
      }
    });
}

function turnOffInstruction() {
  const instructionMsg = document.querySelector(".messageBoard");
  instructionMsg.style.color = "white";
}

function checkWinner() {
  const resultArea = document.querySelector(".resultArea");
  if (userPoints == 3 || computerPoints == 3) {
    const winnerMsg = document.createElement("div");
    if (userPoints == 3) {
      winnerMsg.textContent = `Game over! User wins ${userPoints}-${computerPoints}.`;
    } else {
      winnerMsg.textContent = `Game over! Computer wins ${computerPoints}-${userPoints}.`;
    }
    winnerMsg.classList.add("winnerMessage");
    resultArea.appendChild(winnerMsg);

    disableButtons();
    turnOffInstruction();

    const playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Play again";
    playAgainBtn.classList.add("playAgain");
    playAgainBtn.addEventListener("click", playAgain);
    resultArea.appendChild(playAgainBtn);
  } else {
    roundNumber++;
  }
}

function removeAllChildNotes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateComputerMessage(resultArea, computerSelection) {
  const compSelectMsg = document.createElement("div");
  compSelectMsg.textContent = `Computer chose ${computerSelection}.`;
  compSelectMsg.classList.add("compMessage");
  resultArea.appendChild(compSelectMsg); 
}

function updateUserPoints() {
  const userScore = document.querySelector(".userScore");
  userScore.textContent = `User: ${userPoints}`;
}

function updateComputerPoints() {
  const compScore = document.querySelector(".compScore");
  compScore.textContent = `Computer: ${computerPoints}`;
}

function updateResultMessage(resultArea, userSelection, computerSelection) {
  const resultMsg = document.createElement("div");
  resultMsg.classList.add("resultMessage");

  if (userWins(userSelection, computerSelection)) {
    resultMsg.textContent = `User wins this round! ${userSelection} beats ${computerSelection}!`;
    userPoints++;
    updateUserPoints();
  } 
  else if (computerWins(userSelection, computerSelection)) {
    resultMsg.textContent = `Computer wins this round! ${computerSelection} beats ${userSelection}!`;
    computerPoints++;
    updateComputerPoints();
  }
  else {
    resultMsg.textContent = "Tie! Play this round again.";
  }

  resultArea.appendChild(resultMsg); 
}

function updateRoundNumber(resultArea) {
  const roundMsg = document.createElement("div");
  roundMsg.textContent = `Round ${roundNumber}`;
  roundMsg.classList.add("roundMessage");
  resultArea.appendChild(roundMsg);
}

function playRound2(e) { // Add transition so that there is a slight delay when the results show up after you click the button
  const resultArea = document.querySelector(".resultArea");
  removeAllChildNotes(resultArea);

  const userSelection = e.target.innerText;
  const computerSelection = computerPlay();

  updateRoundNumber(resultArea);
  updateComputerMessage(resultArea, computerSelection);
  updateResultMessage(resultArea, userSelection, computerSelection);
  checkWinner();
}

function playAgain() {
  roundNumber = 1;
  userPoints = 0;
  computerPoints = 0;
  updateUserPoints();
  updateComputerPoints();

  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", playRound2)
    button.style.removeProperty("background-color");
  });

  const instructionMsg = document.querySelector(".messageBoard");
  instructionMsg.style.removeProperty("color");

  const resultArea = document.querySelector(".resultArea");
  removeAllChildNotes(resultArea);
}

// Let's add the event listener to each button
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", playRound2));
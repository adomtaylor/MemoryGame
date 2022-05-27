const gameContainer = document.getElementById("game");
const startButton = document.querySelector("button.start");
const scoreElement = document.querySelector("#score");
const COLORS = [];

bestScore = 99999;
savedScore = loadSavedScore();
if (savedScore) {
  bestScore = savedScore;
}

const gameState = {
  score: 0,
  tries: 0,
  try1: undefined,
  completedPairs: 0,
  colorCount: 5,
};

function addColors(count) {
  for (let i = 0; i < count; i++) {
    let colorValue = generateRandomColor();
    let colorID = "color" + i;
    COLORS.push({ colorID, colorValue });
    COLORS.push({ colorID, colorValue });
  }
  shuffle(COLORS);
}

function generateRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color.colorID);
    newDiv.dataset.colorValue = color.colorValue;
    newDiv.innerText = "Click to Turnover";

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (gameState.tries === 0) {
    gameState.tries++;
    showCard(event.target);
    gameState.try1 = event.target;
  } else if (gameState.tries === 1) {
    if (gameState.try1 !== event.target) {
      gameState.tries++;
      showCard(event.target);
      if (event.target.className !== gameState.try1.className) {
        setTimeout(() => {
          hideCard(gameState.try1);
          hideCard(event.target);
          gameState.tries = 0;
        }, 1000);
      } else {
        gameState.completedPairs++;
        gameState.tries = 0;
      }
      incrementScore();
      if (gameState.completedPairs === gameState.colorCount) {
        gameOver();
      }
    }
  } else {
    console.log("wait");
  }
}

function showCard(card) {
  card.style.backgroundColor = card.dataset.colorValue;
  card.innerText = card.classList;
}

function hideCard(card) {
  card.style.backgroundColor = "";
  card.innerText = "Click to Turnover";
}

function incrementScore() {
  gameState.score++;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  scoreElement.innerText = `Tries: ${gameState.score} , Completed Pairs: ${gameState.completedPairs}`;
}

function gameOver() {
  startButton.classList.toggle("hidden");
  startButton.innerText = "Restart Game";
  scoreElement.innerText = `Game Over. You took ${gameState.score} turns.`;
  if (gameState.score < bestScore) {
    putSavedScore(gameState.score);
  }
  gameState.score = 0;
  gameState.completedPairs = 0;
  gameContainer.innerHTML = "";
}

function loadSavedScore() {
  return localStorage.getItem("bestScore");
}

function putSavedScore(score) {
  localStorage.setItem("bestScore", score);
}

startButton.addEventListener("click", function (event) {
  addColors(gameState.colorCount);
  createDivsForColors(COLORS);
  startButton.classList.add("hidden");
  scoreElement.classList.remove("hidden");
  updateScoreDisplay();
});

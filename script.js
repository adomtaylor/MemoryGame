const gameContainer = document.getElementById("game");
const startButton = document.querySelector("button.start");
const scoreElement = document.querySelector("#score");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let score = 0;
let tries = 0;
let try1 = undefined;
let completedPairs = 0;

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
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if(tries ===0){
    tries++;
    event.target.style.backgroundColor = event.target.className;
    try1 = event.target;
  }
  else if (tries ===1) {
    if (try1 !== event.target){
      tries++;
      event.target.style.backgroundColor = event.target.className;
      if (event.target.className !== try1.className){
        setTimeout(function (){
          try1.style.backgroundColor = "";
          event.target.style.backgroundColor = "";
          tries = 0;
        },1000);
      }
      else{
        completedPairs++;
        tries = 0;
      }
      incrementScore();
      if(completedPairs ===5 ){
        gameOver();
      }
    }
  }
  else{
    console.log("wait");
  }

  
}

function incrementScore(){
  score++;
  scoreElement.innerText = "Tries: "+score+ " , Completed Pairs: "+completedPairs;
}

function gameOver(){
  startButton.classList.toggle("hidden");
  startButton.innerText = "Restart Game";
  scoreElement.innerText = "Game Over. You took " +score + " turns."
  score = 0;
  completedPairs = 0;
  gameContainer.innerHTML = "";
}

startButton.addEventListener("click", function(event){
  createDivsForColors(shuffle(COLORS));
  startButton.classList.add("hidden");
  scoreElement.classList.remove("hidden");
})

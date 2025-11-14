const elements = document.querySelectorAll(".hide-on-start");
const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");
const game = document.querySelector(".game"); // dont forget the . in front (class)
const gameArea = document.querySelector(".game");
const messageElement = document.querySelector(".message"); // the new message div (from index.html)

let startTime; // stores when the screen turns green
let canClick = false; // tracks if the user is allowed to click

function startGame() {
  messageElement.textContent = "";
  canClick = false; // player cannot click yet as screen is not green yet.
}

game.addEventListener("click", () => {
  if (!canClick) {
    messageElement.textContent = "too soon! patience is key, ml."
    return;
  }
  const clickTime = Date.now();
  const reactionTime = clickTime - startTime;
  const output = document.querySelector(".reaction-output");
  output.textContent = `Your reaction time was ${reactionTime}ms.`;
  canClick = false;
  playAgainButton.style.display = "inline-block";
});

playAgainButton.addEventListener("click", () => {
  playAgainButton.style.display = "none";
  elements.forEach(el => el.style.display = "block");
  game.style.backgroundColor = '';
  document.querySelector(".reaction-output").textContent = "";
  messageElement.textContent = "";
});

startButton.addEventListener("click", () => {
  elements.forEach(el => {
    el.style.display = "none";
  });
  game.style.backgroundColor = "red";
  messageElement.textContent = "";
  canClick = false;

  const randomDelay = Math.floor(Math.random() * 3000) + 2000;

  setTimeout(() => {  
    game.style.backgroundColor = "green";
    startTime = Date.now(); 
    canClick = true;
  }, randomDelay);
});

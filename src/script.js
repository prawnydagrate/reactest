const hideElements = document.querySelectorAll(".hide-on-start");
const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");
const game = document.querySelector(".game"); // dont forget the . in front (class)
const tooSoonAlert = document.querySelector(".too-soon-alert");

let startTime;
let greenShown = false;
let greenTimeout;

// measures user's reaction time
function measureReactionTime() {
  const clickTime = Date.now();
  const reactionTime = clickTime - startTime;
  const output = document.querySelector(".reaction-output");
  output.textContent = `Your reaction time was ${reactionTime}ms.`;

  // remove listener so multiple clicks don't stack
  game.removeEventListener("click", measureReactionTime);

  // play again button + resetting game upon clicked
  playAgainButton.style.display = "inline-block";
}

// resetting the game
function resetGame() {
  playAgainButton.style.display = "none";
  for (const el of hideElements) el.style.display = "block";
  game.style.backgroundColor = '';
  document.querySelector(".reaction-output").textContent = "";
  greenShown = false;
}

playAgainButton.addEventListener("click", resetGame);

// starting the game
function startGame(e) {
  // stop event bubbling because start button is inside game div so a click of the start button is also a click of the game div
  e.stopPropagation();
  game.style.backgroundColor = "red";
  greenShown = false;
  const randomDelay = Math.floor(Math.random() * 3000) + 2000;
  game.addEventListener("click", tooSoon);
  for (const el of hideElements) el.style.display = "none";
  greenTimeout = setTimeout(() => {
    game.style.backgroundColor = "green";
    startTime = Date.now();
    game.removeEventListener("click", tooSoon);
    game.addEventListener("click", measureReactionTime);
    greenShown = true;
  }, randomDelay);
}

startButton.addEventListener("click", startGame);

// too soon alert
function tooSoon() {
  if (!greenShown) {
    clearTimeout(greenTimeout);
    tooSoonAlert.textContent = "you clicked too soon.. restarting the game";

    game.removeEventListener("click", tooSoon);
    game.removeEventListener("click", measureReactionTime);

    // restart game after 1.4s
    restartTimeout = setTimeout(() => {
      resetGame();
      tooSoonAlert.textContent = "";
    }, 1400);
  }
}

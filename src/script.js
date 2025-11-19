const elements = document.querySelectorAll(".hide-on-start");
const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");
const game = document.querySelector(".game"); // dont forget the . in front (class)
const tooSoonAlert = document.querySelector(".too-soon-alert");

let startTime;
let greenShown = false;

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
playAgainButton.addEventListener("click", () => {
  playAgainButton.style.display = "none";
  elements.forEach(el => el.style.display = "block");
  game.style.backgroundColor = '';
  document.querySelector(".reaction-output").textContent = "";
  greenShown = false;
});

  // starting the game
function startGame() {
  elements.forEach(el => {
    el.style.display = "none";
  });
  game.style.backgroundColor = "red";
  greenShown = false;
  const randomDelay = Math.floor(Math.random() * 3000) + 2000;

  greenTimeout = setTimeout(() => {
    game.style.backgroundColor = "green";
    startTime = Date.now();
    game.addEventListener("click", measureReactionTime);
    greenShown = true;
  }, randomDelay);
}

startButton.addEventListener("click", startGame);

// too soon alert

function tooSoon() {
  if (!greenShown) {
    tooSoonAlert.textContent = "you clicked too soon.. restarting the game";

    game,removeEventListener("click", tooSoon);
    game.removeEventListener("click", measureReactionTime);

    // restart game after 2s

    restartTimeout = setTimeout(() => {
      elements.forEach(el => el.style.display = "block");
      game.style.backgroundColor = '';
      document.querySelector(".reaction-output").textContent = "";
      tooSoonAlert.textContent = "";
      greenShown = false;
    }, 2000); 
  }
}

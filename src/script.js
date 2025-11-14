const elements = document.querySelectorAll(".hide-on-start");
const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");
const game = document.querySelector(".game"); // dont forget the . in front (class)
let startTime;

function measureReactionTime() {
  const clickTime = Date.now();
  const reactionTime = clickTime - startTime;
  const output = document.querySelector(".reaction-output");
  output.textContent = `Your reaction time was ${reactionTime}ms.`;

  // Remove listener so multiple clicks don't increase user's time
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
});

startButton.addEventListener("click", () => {
  elements.forEach(el => {
    el.style.display = "none";
  });
  game.style.backgroundColor = "red";

  const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds

  setTimeout(() => {  
    game.style.backgroundColor = "green";
    startTime = Date.now(); 
    game.addEventListener("click", measureReactionTime);
  }, randomDelay);
});

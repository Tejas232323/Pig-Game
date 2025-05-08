const toggleBtn = document.getElementById("dark-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.style.color = document.body.classList.contains("dark-mode")
      ? "black"
      : "white";
  }); 
});
function renderDiceFace(num) {
  const dice = document.getElementById("dice");
  dice.innerHTML = ""; // Clear previous dots

  const dotPositions = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };

  dotPositions[num].forEach((pos) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    // Position dot using grid index
    dot.style.gridColumnStart = (pos % 3) + 1;
    dot.style.gridRowStart = Math.floor(pos / 3) + 1;
    dice.appendChild(dot);
  });
}

// Example usage (replace this with your roll logic)
let currentScores = [0, 0]; // Separate current scores for both players
let activePlayer = 0;

document.querySelector("#btn--roll").addEventListener("click", function () {
  const random = Math.floor(Math.random() * 6) + 1;
  renderDiceFace(random);

  if (random === 1) {
    // Reset current score for active player
    currentScores[activePlayer] = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    // Switch active player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");

    activePlayer = activePlayer === 0 ? 1 : 0;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--active");
  } else {
    // Add score to current active player
    currentScores[activePlayer] += random;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScores[activePlayer];
  }
});

document.querySelector("#btn--hold").addEventListener("click", function () {
  // Add current score to global score
  const globalScore = document.querySelector(`#score--${activePlayer}`);
  const newScore =
    parseInt(globalScore.textContent) + currentScores[activePlayer];
  globalScore.textContent = newScore;

  // Check if player has won
  if (newScore >= 100) {
    const activePlayerEl = document.querySelector(`.player--${activePlayer}`);
    activePlayerEl.classList.remove("player--active");
    activePlayerEl.classList.add("player--winner");
    document.querySelector("#btn--roll").disabled = true;
    document.querySelector("#btn--hold").disabled = true;
    alert(
      `Player ${activePlayer + 1} wins! 🎉\nClick "New Game" to play again.`
    );
    let activePlayer3=activePlayer===0?activePlayer+2:activePlayer;
    alert(
      `Player ${activePlayer3} loses! LALACH BURI BALA H 😂 🎉\nClick "New Game" to play again.`
    );
  } else {
    // Reset current score for active player
    currentScores[activePlayer] = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    // Switch active player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");

    activePlayer = activePlayer === 0 ? 1 : 0;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--active");
  }
});
resetGame = () => {
  currentScores = [0, 0]; // Reset current scores for both players
  activePlayer = 0; // Reset active player

  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;

  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector("#btn--roll").disabled = false;
  document.querySelector("#btn--hold").disabled = false;

  renderDiceFace(1); // Reset dice face to default
};
document.querySelector("#btn--new").addEventListener("click", resetGame);

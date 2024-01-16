const hexText = document.getElementById("hex-text");
const circleCont = document.getElementById("circle-cont");
const infoText = document.getElementById("info-text");
const newGameButton = document.getElementById("new-game-button");
const levelButtons = document.querySelectorAll(".level-button");

let playing = true;
let rightColor;
let level = 4;


function startNewGame() {
  playing = true;
  document.body.classList.remove('win-screen');
  document.body.style.backgroundColor = '';
  circleCont.innerHTML = '';
  hexText.style.display = "block";
  hexText.textContent = rightColor;
  infoText.textContent = "Guess the correct color!";
  createCircles();
  newGameButton.style.display = "none";
}

function generateRandomHexCode() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

function createCircles() {
  let randomIndex = Math.floor(Math.random() * level);
  rightColor = generateRandomHexCode();
  hexText.textContent = rightColor;

  for (let i = 0; i < level; i++) {
    let circleColor = i === randomIndex ? rightColor : generateRandomHexCode();
    let circle = document.createElement("div");
    circle.className = "color-circle";
    circle.style.backgroundColor = circleColor;
    circle.onclick = function() {
      if (!playing) return;
      if (circleColor === rightColor) {
        showWinScreen();
        playing = false;
      } else {
        this.style.opacity = "0";
      }
    };
    circleCont.appendChild(circle);
  }
}

function showWinScreen() {
  document.body.style.backgroundColor = rightColor;
  document.body.classList.add('win-screen');
  hexText.style.display = "none";
  infoText.innerHTML = "<span>Correct! That's the color!</span>";
  newGameButton.style.display = "block";
}

levelButtons.forEach(button => {
  button.addEventListener('click', () => changeLevel(button.getAttribute('data-level')));
});

function changeLevel(newLevel) {
  level = newLevel;
  startNewGame();
}

newGameButton.addEventListener('click', startNewGame);
window.onload = createCircles;

function showWinScreen() {
  rightColor = rightColor;
  hexText.style.display = "block";
  hexText.textContent = "The color was: " + rightColor;
  infoText.innerHTML = "<span>Correct! That's the color!</span>"; 
  newGameButton.style.display = "block";

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.style.backgroundColor = rightColor;
  document.body.appendChild(overlay);

  setTimeout(function() {
    overlay.style.opacity = 1;
  }, 10); 

  setTimeout(function() {
    overlay.style.backgroundColor = "transparent";
    overlay.style.opacity = 0;
    setTimeout(function() {
      overlay.remove();
    }, 500);
  }, 1000);
}


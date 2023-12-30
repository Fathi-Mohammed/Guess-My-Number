"use strict";

const startSound = new Audio("audio/start.mp3");
const gameOverSound = new Audio("audio/game_over.mp3");
const winGameSound = new Audio("audio/success.mp3");
const wrongSound = new Audio("audio/wrong.mp3");

let gameMessage = document.querySelector(".message");
let checkInputElement = document.querySelector(".guess");
let checkButton = document.querySelector(".check");
let scoreElement = document.querySelector(".score");
let secretNumberElement = document.querySelector(".number");
let highScoreElement = document.querySelector(".highscore");
let againButton = document.querySelector(".again");
let randomNumber = Math.floor(Math.random() * 20) + 1;
let secretNumberContent = "?";
let highScore = 0;
let score = 20;

highScoreElement.textContent = highScore;
scoreElement.textContent = score;
checkInputElement.focus();

function gameStartFunction() {
  let checkInputValue = Number(checkInputElement.value);

  if (checkInputValue > 20 || checkInputValue <= 0) {
    document.querySelector(".error-message").classList.add("active");
  } else {
    document.querySelector(".error-message").classList.remove("active");

    if (checkInputValue === randomNumber) {
      gameMessage.textContent = "Correct 🎉";
      secretNumberElement.textContent = randomNumber;
      highScore = highScore > score ? highScore : score;
      highScoreElement.textContent = highScore;
      checkButton.disabled = true;
      document.body.style.backgroundColor = "#60b347";
      winGameSound.play();
    } else if (checkInputValue > randomNumber) {
      wrongSound.play();
      gameMessage.textContent = "↗️ Too Hight Number";
      score--;
      scoreElement.textContent = score;
      checkInputElement.value = "";

      if (score < 1) {
        scoreElement.textContent = "0";
        gameMessage.textContent = "😕 Game Over";
        gameOverSound.play();
        checkButton.disabled = true;
      }
    } else if (checkInputValue < randomNumber) {
      gameMessage.textContent = "↘️ Too Low Number";
      wrongSound.play();
      score--;
      scoreElement.textContent = score;
      checkInputElement.value = "";

      if (score < 1) {
        scoreElement.textContent = "0";
        gameMessage.textContent = "😕 Game Over";
        checkButton.disabled = true;
        gameOverSound.play();
      }
    }
  }
}

checkButton.addEventListener("click", gameStartFunction);
checkInputElement.addEventListener("keydown", function (event) {
  if (event.keyCode === 13 || event.key === "Enter") {
    gameStartFunction();
  }
});

againButton.addEventListener("click", function () {
  gameMessage.textContent = "Start guessing...";
  checkInputElement.value = "";
  checkInputElement.focus();
  randomNumber = Math.floor(Math.random() * 20) + 1;
  secretNumberElement.textContent = randomNumber;
  score = 20;
  scoreElement.textContent = score;
  checkButton.disabled = false;
  secretNumberElement.textContent = secretNumberContent;
  document.body.style.backgroundColor = "#222";
  startSound.play();
});

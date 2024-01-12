var cards = document.getElementsByClassName("card");
var flippedCards = [];
var gameStarted = false;
var timerElement = document.getElementById("timer");
var timerInterval;
var seconds = 5;
var restartButton = document.querySelector(".restart-button");

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    startTimer();
    shuffleCards();
    document.querySelector(".start-button").style.display = "none";
    restartButton.style.display = "none";
  }
}

function startTimer() {
  timerInterval = setInterval(function() {
    seconds--;
    if (seconds < 0) {
      clearInterval(timerInterval);
      endGame();
    } else {
      timerElement.innerHTML = formatTime(seconds);
    }
  }, 1000);
}

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

function shuffleCards() {
  for (var i = cards.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    cards[randomIndex].style.order = i;
    cards[i].style.order = randomIndex;
  }
}

function flipCard(cardIndex) {
  if (gameStarted && flippedCards.length < 2 && !cards[cardIndex].classList.contains("flipped")) {
    cards[cardIndex].classList.add("flipped");
    flippedCards.push(cardIndex);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  var card1 = cards[flippedCards[0]];
  var card2 = cards[flippedCards[1]];

  if (card1.querySelector("img").src === card2.querySelector("img").src) {
    alert("Parabéns! Você encontrou uma carta correspondente!");
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];

  if (document.querySelectorAll(".flipped").length === cards.length) {
    endGame();
  }
}

function endGame() {
  clearInterval(timerInterval);
  alert("Parabéns! Você completou o jogo!");
  restartButton.style.display = "inline-block";
  gameStarted = false;
}

function restartGame() {
  clearInterval(timerInterval);
  seconds = 5;
  timerElement.innerHTML = formatTime(seconds);

  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("flipped");
  }

  flippedCards = [];
  document.querySelector(".start-button").style.display = "inline-block";
  restartButton.style.display = "none";
}

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function() {
    flipCard(Array.prototype.indexOf.call(cards, this));
  });
}

restartButton.addEventListener("click", restartGame);

document.getElementById("resetButton").addEventListener("click", function() {
  location.reload();
});
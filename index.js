const welcomeSection = document.querySelector(".welcome-section");
const startBtn = document.getElementById("startBtn");

function createSparkles() {
  for (let i = 0; i < 35; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");

    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * 80 + "%";
    spark.style.animationDelay = Math.random() * 3 + "s";

    welcomeSection.appendChild(spark);
  }
}

createSparkles();

startBtn.addEventListener("click", () => {
  alert("The journey has begun, Captain Dwight! ⚓");
});

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    musicBtn.innerText = "❚❚ Pause";
    isPlaying = true;
  } else {
    bgMusic.pause();
    musicBtn.innerText = "♪ Music";
    isPlaying = false;
  }
});

const envelope = document.getElementById("envelope");

envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");
});

const quotes = [
  "The waves may slow you down, but they will never stop your voyage.",
  "Kindness is one of the strongest forms of leadership.",
  "A good heart will always take you farther than pride.",
  "You are becoming the kind of person people feel safe with.",
  "Success is built quietly through small acts of consistency.",
  "Even the strongest captains once doubted themselves.",
  "Growth begins the moment comfort ends.",
  "Your kindness is one of your greatest achievements.",
  "Never underestimate the power of someone who refuses to give up.",
  "The future belongs to people brave enough to continue.",
  "Some people shine loudly. Others shine warmly. You do both.",
  "Being calm under pressure is its own kind of strength.",
  "The world always needs more hospitable hearts.",
  "You make people feel welcomed without even trying.",
  "Dreams grow where courage decides to stay.",
  "Your journey is proof that hard decisions create strong people.",
  "Real strength is staying kind in a difficult world.",
  "No storm lasts forever.",
  "One day you will look back and realize this was only the beginning.",
  "Keep sailing forward, Captain Dwight."
];

const spinBtn = document.getElementById("spinBtn");
const quoteWheel = document.getElementById("quoteWheel");
const quoteDisplay = document.getElementById("quoteDisplay");

let rotation = 0;

spinBtn.addEventListener("click", () => {

  rotation += 1440 + Math.floor(Math.random() * 720);

  quoteWheel.style.transform = `rotate(${rotation}deg)`;

  quoteDisplay.innerText = "The sea is choosing your quote... ⚓";

  setTimeout(() => {

    const randomQuote =
      quotes[Math.floor(Math.random() * quotes.length)];

    quoteDisplay.innerText = `"${randomQuote}"`;

  }, 4000);

});

const gameCards = document.querySelectorAll(".game-card");
const resetGameBtn = document.getElementById("resetGameBtn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffleCards() {
  const cardsArray = Array.from(gameCards);

  cardsArray
    .sort(() => Math.random() - 0.5)
    .forEach(card => {
      card.parentNode.appendChild(card);
    });
}

shuffleCards();

gameCards.forEach(card => {

  card.addEventListener("click", () => {

    if (
      lockBoard ||
      card === firstCard ||
      card.classList.contains("matched")
    ) {
      return;
    }

    card.classList.add("flipped");
    card.innerText = card.dataset.emoji;

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;

    if (
      firstCard.dataset.emoji === secondCard.dataset.emoji
    ) {

      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      resetTurn();

    } else {

      lockBoard = true;

      setTimeout(() => {

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        firstCard.innerText = "?";
        secondCard.innerText = "?";

        resetTurn();

      }, 1000);

    }

  });

});

function resetTurn() {
  [firstCard, secondCard, lockBoard] =
  [null, null, false];
}

resetGameBtn.addEventListener("click", () => {

  gameCards.forEach(card => {

    card.classList.remove("flipped");
    card.classList.remove("matched");

    card.innerText = "?";

  });

  shuffleCards();

});

const startStarBtn = document.getElementById("startStarBtn");
const starPlayArea = document.getElementById("starPlayArea");
const starScoreText = document.getElementById("starScore");
const starTimeText = document.getElementById("starTime");

let starScore = 0;
let starTime = 20;
let starInterval;
let starTimer;

startStarBtn.addEventListener("click", () => {
  starScore = 0;
  starTime = 20;

  starScoreText.innerText = starScore;
  starTimeText.innerText = starTime;

  startStarBtn.style.display = "none";

  starInterval = setInterval(createFallingStar, 600);

  starTimer = setInterval(() => {
    starTime--;
    starTimeText.innerText = starTime;

    if (starTime <= 0) {
      clearInterval(starInterval);
      clearInterval(starTimer);

      document.querySelectorAll(".falling-star").forEach(star => star.remove());

      startStarBtn.innerText = "Play Again ⭐";
      startStarBtn.style.display = "block";

      alert(`Game over! You caught ${starScore} stars, Captain Dwight! ⭐`);
    }
  }, 1000);
});

function createFallingStar() {
  const star = document.createElement("div");
  star.classList.add("falling-star");
  star.innerText = "⭐";

  star.style.left = Math.random() * 90 + "%";

  star.addEventListener("click", () => {
    starScore++;
    starScoreText.innerText = starScore;
    star.remove();
  });

  starPlayArea.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 2300);
}
const hintBtn = document.getElementById("hintBtn");
const hintBox = document.getElementById("hintBox");
const crypticAnswer = document.getElementById("crypticAnswer");
const checkCrypticBtn = document.getElementById("checkCrypticBtn");
const crypticFeedback = document.getElementById("crypticFeedback");
const hiddenMessage = document.getElementById("hiddenMessage");

hintBtn.addEventListener("click", () => {
  hintBox.classList.toggle("show");
  hintBtn.innerText = hintBox.classList.contains("show")
    ? "Hide Hint"
    : "Need a Hint?";
});

checkCrypticBtn.addEventListener("click", checkCrypticAnswer);

crypticAnswer.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkCrypticAnswer();
  }
});

function checkCrypticAnswer() {
  const answer = crypticAnswer.value.trim().toLowerCase();

  if (answer === "nakama") {
    crypticFeedback.innerText = "You solved it, Captain! ⚓";
    hiddenMessage.classList.add("show");
  } else {
    crypticFeedback.innerText = "Not yet. Read the clue carefully and try again.";
    hiddenMessage.classList.remove("show");
  }
}
const giftAnswer = document.getElementById("giftAnswer");
const giftSubmitBtn = document.getElementById("giftSubmitBtn");
const giftFeedback = document.getElementById("giftFeedback");
const giftReveal = document.getElementById("giftReveal");

giftSubmitBtn.addEventListener("click", checkGiftAnswer);

giftAnswer.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGiftAnswer();
  }
});

function checkGiftAnswer() {

  const answer =
    giftAnswer.value.trim().toLowerCase();

  if (answer === "charmander") {

    giftFeedback.innerText =
      "Correct answer, Captain Dwight ⚓";

    giftReveal.classList.add("show");

  } else {

    giftFeedback.innerText =
      "That is not the Pokémon of my heart... try again.";

    giftReveal.classList.remove("show");

  }

}
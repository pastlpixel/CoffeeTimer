// --- TIMER SETUP ---
// read start time from body attribute
const countdownStart = parseInt(document.body.dataset.countdownStart); // parse defined countdown start time
let time = countdownStart * 60; // minutes in seconds
let timerInterval = null; // to store interval reference

const timerElement = document.getElementById('timer');
const button = document.getElementById('timer-button');

// --- UPDATE FUNCTION ---
function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  time--;

  if (time < 0) {
    clearInterval(timerInterval);
    timerElement.textContent = "Done!";
    timerInterval = null; // reset interval reference
    button.textContent = "Back"; // change to "Break" when timer finishes
    const bellSound = new Audio("sounds/bell.wav");
    bellSound.play();  // play bell sound when timer ends
  }
}

// --- START FUNCTION ---
function startCountdown() {
  if (timerInterval !== null) return; // prevent double start

  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
  button.textContent = "Break"; // change text immediately after starting
}

// --- RESET FUNCTION ---
function resetCountdown() {
  clearInterval(timerInterval);
  timerInterval = null;
  time = countdownStart * 60; // reset to minutes
  updateTimer();
  button.textContent = "Start"; // change button text back
}

// --- BUTTON CLICK EVENT ---
button.onclick = function () {
  if (button.textContent === "Start") {
    startCountdown();
  } else if (button.textContent === "Break") {
    resetCountdown();
  } else if (button.textContent === "Back") {
    resetCountdown();
  }
};

// initialize timer display
updateTimer();

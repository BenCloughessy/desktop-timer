const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const taskNameInput = document.getElementById('taskName');
const inputContainer = document.getElementById('inputContainer');
const countdownContainer = document.getElementById('countdownContainer');
const countdown = document.getElementById('countdown');
const timerName = document.getElementById('timerName');
const taskFinished = document.getElementById('taskFinished');

let audio;

startButton.addEventListener('click', () => {
  const hours = parseInt(hoursInput.value, 10) || 0;
  const minutes = parseInt(minutesInput.value, 10) || 0;
  const seconds = parseInt(secondsInput.value, 10) || 0;
  const taskNameValue = taskNameInput.value || 'Unnamed Task';
  const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalTimeInSeconds > 0) {
    inputContainer.style.display = 'none';
    countdownContainer.style.display = 'flex';
    timerName.textContent = taskNameValue;
    startTimer(totalTimeInSeconds);
  }
});

resetButton.addEventListener('click', () => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  taskFinished.style.display = 'none';
  inputContainer.style.display = 'flex';
});

function startTimer(totalTimeInSeconds) {
  const endTime = Date.now() + totalTimeInSeconds * 1000;
  const interval = setInterval(() => {
    const remainingTime = endTime - Date.now();

    if (remainingTime <= 0) {
      clearInterval(interval);
      countdownContainer.style.display = 'none';
      taskFinished.style.display = 'flex';
      playSound();
    } else {
      updateCountdownDisplay(remainingTime);
    }
  }, 100);
}

function updateCountdownDisplay(remainingTime) {
  const seconds = Math.floor((remainingTime / 1000) % 60);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);

  countdown.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
}

function playSound() {
  audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
  audio.loop = true;
  audio.play();
}

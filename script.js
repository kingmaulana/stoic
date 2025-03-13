// HTML Elements
const formPage = document.getElementById("form-page");
const welcomePage = document.getElementById("welcome-page");
const meditationPage = document.getElementById("meditation-page");
const resultPage = document.getElementById("result-page");
const userForm = document.getElementById("user-form");
const welcomeMessage = document.getElementById("welcome-message");
const meditationAudio = document.getElementById("meditation-audio");
const timerDisplay = document.getElementById("timer");

const buttonStart = document.querySelector('.start')
const homePage = document.querySelector('.home')
const timeSelection = document.getElementById("time-selection");
const body = document.querySelector('body')
const inputName = document.querySelector('.username')

// Variables to store user data
let userName = "";
let meditationDuration = 0;

const meditationMusic = {
  1: "music-1-minutes.mp3",
  2: "music-2-minutes.mp3",
  5: "music-5-minutes.mp3",
};

// Handle form submission
buttonStart.addEventListener("click", (e) => {
  e.preventDefault();
  userName = document.getElementById("name").value;

  if (!userName){
    alert("Please enter your name.")
    return;
  }
  // Show welcome page
  // formPage.classList.add("hidden");
  homePage.style.display = 'none' 
  body.classList.add('bg-ijo')
  welcomePage.classList.remove("hidden");
  welcomeMessage.textContent = `Welcome, ${userName}! Let's begin your meditation journey.`;
  timeSelection.style.display = "block";
});

document.querySelectorAll(".time-option").forEach(button => {
  button.addEventListener("click", (e) => {
    meditationDuration = parseInt(e.target.getAttribute("data-time"));
    startMeditation(meditationDuration);
  });
});

// Start meditation
function startMeditation(minutes) {
  meditationDuration = minutes;

  // Load appropriate audio file
  const audioSource = meditationMusic[minutes];
  if (audioSource) {
    meditationAudio.src = audioSource;
  } else {
    meditationAudio.src = "music-1-minutes.mp3"; // Fallback music
  }

  welcomePage.classList.add("hidden");
  meditationPage.classList.remove("hidden");
  meditationAudio.play();

  let timeRemaining = minutes * 60;

  // Countdown timer
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      endMeditation();
    }
  }, 1000);
}

// End meditation
const meditationTimeElement = document.getElementById('meditation-time');


function endMeditation() {
  meditationAudio.pause();
  meditationPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  meditationTimeElement.textContent = meditationDuration;
  let listenTime = meditationDuration;
  meditate(listenTime)
}

let timeGoal = function(value) {
  return value;
}
// Daily Goals
const buttonGoals = document.querySelectorAll('.goal')
buttonGoals.forEach((goalTime) => {
  let value = goalTime.value;
  goalTime.addEventListener('click', function() { 
    // hapus semua class active dari semua tombol
    buttonGoals.forEach(btn => btn.classList.remove('active'));
    //tambahkan ke tombol yang di klik
    goalTime.classList.add('active');
    goalTimes = Number(value);
  })
}) 


const listenAgain = document.querySelector('.listen-again')
listenAgain.addEventListener('click',function() {
  welcomePage.classList.remove("hidden");
  resultPage.classList.add("hidden");
});


const finished = document.querySelector('.finish')
finished.addEventListener('click',function() {
  homePage.style.display = '' 
  body.classList.remove('bg-ijo');
  resultPage.classList.add("hidden");
  inputName.value = ''
});


const timeSisa = document.querySelector('#meditation-sisa')
const resultSisa = document.querySelector('#result-goal')

let goalTimes; 
let timeSpent = 0;
function meditate(minutes) {
  timeSpent += minutes; 
  let remainingTime = goalTimes - timeSpent; 
    timeSisa.innerText = remainingTime;
  if (remainingTime > 0) {
    timeSisa.innerText = remainingTime;
  } else {
    resultSisa.innerText = 'You have reached your meditation goal!'
    goalTimes = 0;
    timeSpent = 0;
  }
}





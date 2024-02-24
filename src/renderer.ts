let timerInterval: string | number | NodeJS.Timeout;
let timerDisplay: HTMLElement;
let startButton;
let resetButton;
let taskInput: HTMLElement;
let addTaskBtn;
let tasksList: HTMLElement;
let isRunning = false;
let minutes = 25;
let seconds = 0;
let pomodoroCount = 0;

const NOTIFICATION_TITLE = 'PomPomDoro';
const NOTIFICATION_BODY_SHORT_BREAK = '🐶 BARK! Time for a short break!';
const NOTIFICATION_BODY_LONG_BREAK = '🐶 BARK! Time for a longer break!';
const NOTIFICATION_BODY_NEXT_SESSION = '🐶 BARK! Time to start your next pom pom session!';
const CLICK_MESSAGE = '🐶 BARK!';

function startTimer() {
  isRunning = true;
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        pomodoroCount++;
        if (pomodoroCount % 4 === 0) {
          // Take a longer break after every 4 pomodoros
          showNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY_LONG_BREAK);
          minutes = 20; // Longer break duration set to 20 minutes
        } else {
          // Take a short break after every pomodoro session
          showNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY_SHORT_BREAK);
          minutes = 5; // Short break duration
        }
        seconds = 0;
        displayTime();
        setTimeout(() => {
          // Notification to start the next Pomodoro session after the break
          showNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY_NEXT_SESSION);
          startTimer(); // Start the next Pomodoro session
        }, minutes * 60 * 1000); // Delay before starting the next session
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    displayTime();
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  pomodoroCount = 0;
  displayTime();
}

function displayTime() {
  if (timerDisplay) {
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

function addTask() {
  if (taskInput && (taskInput as HTMLInputElement).value.trim() !== '') {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const taskText = taskInput.value.trim();
    const li = document.createElement('li');
    li.textContent = taskText.toUpperCase();
    li.style.color = '#FFB500'; // Light gray color
    li.style.borderBottom = '1px solid #FFB500'; // Bottom border for the line effect
    li.style.padding = '10px'; // Add padding for space between text and border
    li.style.display = 'flex'; // Use flexbox layout
    li.style.alignItems = 'center'; // Center items vertically
    li.style.justifyContent = 'space-between'; // Space between items
    li.style.fontSize = '20px';
    if (tasksList) {
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
      removeBtn.style.border = 'none'; // Remove button border
      removeBtn.style.backgroundColor = 'transparent'; // Transparent background
      removeBtn.style.cursor = 'pointer'; // Change cursor to pointer on hover
      removeBtn.addEventListener('click', () => {
        li.remove();
      });
      li.appendChild(removeBtn);
      tasksList.appendChild(li);
    }
    taskInput.value = '';
  }
}

function showNotification(title: string, body: string) {
  new Notification(title, { body: body })
    .onclick = () => { console.log(CLICK_MESSAGE); };
}

document.addEventListener("DOMContentLoaded", () => {
  timerDisplay = document.getElementById("timer");
  startButton = document.getElementById("startBtn");
  resetButton = document.getElementById("resetBtn");
  taskInput = document.getElementById("taskInput");
  addTaskBtn = document.getElementById("addTaskBtn");
  tasksList = document.getElementById("tasks");

  if (startButton && resetButton && addTaskBtn && taskInput) {
    startButton.addEventListener("click", () => {
      if (!isRunning) {
        startTimer();
      }
    });

    resetButton.addEventListener("click", () => {
      resetTimer();
    });

    taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    });

    addTaskBtn.addEventListener("click", () => {
      addTask();
    });
  }

  displayTime();
});

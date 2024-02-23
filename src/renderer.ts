// renderer.ts
let timerInterval: any;
let timerDisplay: HTMLElement | null;
let startButton: HTMLElement | null;
let resetButton: HTMLElement | null;
let taskInput: HTMLInputElement | null;
let addTaskBtn: HTMLElement | null;
let tasksList: HTMLElement | null;
let isRunning = false;
let minutes = 25;
let seconds = 0;

function startTimer() {
  isRunning = true;
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        alert("Pomodoro completed!");
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
  displayTime();
}

function displayTime() {
  if (timerDisplay) {
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

function addTask() {
  if (taskInput && taskInput.value.trim() !== '') {
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

document.addEventListener("DOMContentLoaded", () => {
  timerDisplay = document.getElementById("timer");
  startButton = document.getElementById("startBtn");
  resetButton = document.getElementById("resetBtn");
  taskInput = document.getElementById("taskInput") as HTMLInputElement;
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

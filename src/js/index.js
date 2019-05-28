/** @format */

/* eslint-disable no-use-before-define, func-names */

(function responseTester() {
  //  initialized in init
  let firstPlayer = true;
  const attemptsLimit = 3;
  let userName;
  let userReactions;
  let startAndEndTime;
  const instruction =
    "Sprawdź swój refleks. Zobaczysz 8 figur geometrycznych. Twoim zadaniem jest każdą figurę jak najszybciej kliknąć. Na koniec gry zobaczysz swoje czasy reakcji i średnią wszystkich prób.";

  const submitNameBtn = document.getElementById("submitName");
  const userInput = document.getElementById("userName");
  const introDiv = document.getElementById("intro");
  const playground = document.getElementById("playground");
  const gameEndBtns = document.getElementById("gameEndBtns");
  const newPlayerBtn = document.getElementById("newPlayer");
  const playAgainBtn = document.getElementById("playAgain");
  const shapeDiv = document.getElementById("shape");
  const stats = document.getElementById("stats");
  const instrDiv = document.getElementById("instruction-box");
  const instrPara = document.getElementById("instruction");
  const startBtn = document.getElementById("startBtn");

  function init() {
    clearData();
  }

  function resetUserName() {
    userName =
      userName === "" || userName === undefined ? "Nieznajomy" : userName;
  }

  function clearData() {
    userReactions = [];
    startAndEndTime = [];
  }

  function startGame() {
    drawShape();
    startTimer();
  }

  function endGame() {
    playground.style.display = "none";
    gameEndBtns.style.display = "block";
    stats.innerHTML = getStatistics();
    stats.style.display = "block";
  }

  /* --------------- HELPERS ------------------ */

  function getStatistics() {
    let statistics = `<p>${userName} - oto Twoje czasy reakcji:<br></p><p class='numbers'>`;

    let totalTime = 0; // if you leave it undefined, it can be treated as a string
    userReactions.forEach(time => {
      totalTime += time;
      statistics += `${time} ms<br>`;
    });

    statistics +=
      `</p><p>Oto Twój ` +
      "średni czas reakcji:</p>" +
      `<p class='numbers'>${Math.floor(totalTime / attemptsLimit)} ms</p>`;

    return statistics;
  }

  function startTimer() {
    const start = new Date().getTime();
    console.log(`start: ${start}`);

    startAndEndTime.push(start);
  }

  function stopTimer() {
    const end = new Date().getTime();
    console.log(`end: ${end}`);

    startAndEndTime.push(end);
  }

  function recordReactionTime() {
    const reaction = startAndEndTime[1] - startAndEndTime[0];
    console.log(`${startAndEndTime[1]} minus ${startAndEndTime[0]}`);

    userReactions.push(reaction);
    startAndEndTime = [];
    console.log(userReactions);
  }

  function setUpPlayground() {
    playground.style.display = "block";
    playground.style.width = "95%";
    playground.style.minHeight = `${window.innerHeight * 0.75}px`;
  }

  function getRandomColor() {
    return Math.floor(Math.random() * 256);
  }

  function getCoordinates() {
    const coordinates = [];
    const xCoord = Math.random() * 1100;
    const yCoord = Math.random() * 300;

    coordinates.push(xCoord);
    coordinates.push(yCoord);
    return coordinates;
  }

  function drawShape() {
    const xyPosition = getCoordinates();
    const size = Math.floor(Math.random() * 100) + 50;

    shapeDiv.style.backgroundColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
    shapeDiv.style.width = `${size}px`;
    shapeDiv.style.height = `${size}px`; // nie ma length!
    shapeDiv.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    shapeDiv.style.top = `${xyPosition[1]}px`;
    shapeDiv.style.left = `${xyPosition[0]}px`;
    shapeDiv.style.display = "block"; // initial doesnt work
  }

  /* ---------------------- Event listeners ----------------- */

  submitNameBtn.onclick = function(e) {
    introDiv.style.display = "none";
    userName = userInput.value;
    userName =
      userName === "" || userName === undefined ? "Nieznajomy" : userName;
    userInput.value = "";
    setUpPlayground();
    if (firstPlayer) {
      instrPara.textContent = `Witaj ${userName}! ${instruction}`;
    } else {
      startGame();
    }
  };

  shapeDiv.onclick = function() {
    stopTimer();
    recordReactionTime();

    if (userReactions.length < attemptsLimit) {
      startGame();
    } else {
      endGame();
    }
  };

  function hideStats() {
    gameEndBtns.style.display = "none";
    document.getElementById("stats").style.display = "none";
  }

  playAgainBtn.onclick = function(e) {
    hideStats();
    clearData();
    setUpPlayground();
    startGame();
  };

  newPlayerBtn.onclick = function(e) {
    firstPlayer = false;
    hideStats();
    clearData();
    resetUserName();
    introDiv.style.display = "block";
  };

  startBtn.onclick = function() {
    instrDiv.style.display = "none";
    startGame();
  };

  init();
})();

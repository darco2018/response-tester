(function () {

    var totalTime = 0;
    var trials = 8;
    var userName = "User";
    var instruction = "Sprawdź swoj czas reakcji. Program wyświetli ci po kolei " +
        "8 figur geometrycznych. Twoim zadaniem jest na każdą figurę jak najszybciej kliknąć. " +
        "Na koniec gry zobaczysz swoje czasy reakcji i średnią wszystkich prób. Gdy zamkniesz to okienko, gra się ropocznie!";
    var windowWidth = window.innerWidth; // 1600
    var windowHeight = window.innerHeight; // 731
    var radius = 200; // px
    var pageMarginX = windowWidth - radius; // ?
    var pageMarginY = windowHeight - radius; // ?
    var userReactions = [];

    var submitBtn = document.getElementById("submitBtn");
    var userInput = document.getElementById("userName");
    var introDiv = document.getElementById("intro");
    var playground = document.getElementById("playground");

    function init() {

        playground.innerHTML = generateShape();
    }

    function generateShape() {

            console.log("width: " + windowWidth + ", height" + windowHeight);

        var xCoord = Math.floor(Math.random() * windowWidth);
        var yCoord = Math.floor(Math.random() * windowHeight);
            console.log(xCoord + ", " + yCoord);
            
        var shapeClass = (Math.floor(Math.random() * 2) === 0) ? "rectangle" : "rectangle rounded";
        var shape = "<div class='" + shapeClass + "' style='margin-left:" + xCoord + "px;" +
            "margin-top:" + yCoord + "px'></div>";
        return shape;

    }

    /* Event listeners */

    submitBtn.onclick = function (e) {
        introDiv.style.display = "none";
        userName = userInput.value;
        alert("Hi " + userName + "! " + instruction);
        startGame();
    }

    init();

}());
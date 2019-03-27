(function () {

    var totalTime = 0;
    var trials = 8;
    var userName = "User";
    var instruction = "Sprawdź swoj czas reakcji. Program wyświetli ci po kolei " +
        "8 figur geometrycznych. Twoim zadaniem jest jak najszybciej na figurę kliknąć. " +
        "Na koniec gry zobaczysz swoje czasy reakcji i średnią wszystkich prób.";
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var radius = 200; // px
    var pageMarginX = windowWidth - radius; // ?
    var pageMarginY = windowHeight - radius; // ?
    var userReactions = [];

    var submitBtn = document.getElementById("submitBtn");
    var userInput = document.getElementById("userName");
    var introDiv = document.getElementById("intro");
    var playground = document.getElementById("playground");

    function init() {
        //alert("Starting...");
    }

    init();

}());
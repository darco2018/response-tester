(function () {

    // initialized in init()
    var totalTime;
    var allowedNoOfTurns;
    var userName;
    var userReactionsArr;
    var startAndEndTime;
    var radius = 50; // px
    var instruction = "Sprawdź swoj czas reakcji. Program wyświetli ci po kolei " +
        "8 figur geometrycznych. Twoim zadaniem jest na każdą figurę jak najszybciej kliknąć. " +
        "Na koniec gry zobaczysz swoje czasy reakcji i średnią wszystkich prób. Gdy zamkniesz to okienko, gra się ropocznie!";
   
    var submitBtn = document.getElementById("submitName");
    var userInput = document.getElementById("userName");
    var introDiv = document.getElementById("intro");
    var playground = document.getElementById("playground");
    var buttons = document.getElementById("buttons");
    var newPlayerBtn = document.getElementById("newPlayer");
    var playAgainBtn = document.getElementById("playAgain");

    function init(){
        buttons.style.display = "none";
        totalTime = 0;
        allowedNoOfTurns = 8;
        userName = (userName === "" || userName === undefined) ? "Friend" :  userName;
        userReactionsArr = [];
        startAndEndTime = [];
    }

    function draw() {

        playground.style.width = "95%";
        playground.style.minHeight = (window.innerHeight * 0.75) + "px";
        playground.style.background = "green";
        playground.innerHTML = "<div " + getShape() + "</div>";

        // start time after circle is drawn   
        startAndEndTime.push(new Date().getTime());
    }

    function getShape() {
        var xyPosition = getCoordinates();
        var shapeClass = (Math.floor(Math.random() * 2) === 0) ? "rectangle" : "rectangle rounded";
        var color = "rgb(" + getRandomColor() + ", " + getRandomColor() + ", " + getRandomColor() + ")";
        radius = radius + (Math.floor(Math.random() * 25) + 1);

        var shapeStr = "id='shape' class='" + shapeClass +
            "' style='margin-left:" + xyPosition[0] + "px;" +
            "margin-top:" + xyPosition[1] + "px; " +
            "background-color:" + color + "; " +
            "width:" + radius + "px; " +
            "height:" + radius + "px; " +
            "'>";

        return shapeStr;
    }

    function getCoordinates() {

        var coordinates = [];
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var xCoord = Math.floor(Math.random() * windowWidth);
        var yCoord = Math.floor(Math.random() * windowHeight);

        //constraints to keep shape within the inner window - to be improved
        xCoord = Math.min(xCoord, windowWidth - (3 * radius));
        yCoord = Math.min(yCoord, windowHeight - (4.75 * radius));      
        xCoord = xCoord + (radius * 2) > windowWidth ? windowWidth - (2 * radius) : xCoord;
        yCoord = yCoord + (radius * 2) > windowHeight ? windowHeight - (2 * radius) : yCoord;
        xCoord = xCoord < 0 ? 0 : xCoord;
        yCoord = yCoord < 0 ? 0 : yCoord;

        coordinates.push(xCoord);
        coordinates.push(yCoord);
        return coordinates;
    }

    function getRandomColor() {
        return Math.floor(Math.random() * 256);
    }

    function play() {

        draw();

        document.getElementById("shape").onclick = function (e) {

            // stop timer as soon as click is detected            
            startAndEndTime.push(new Date().getTime());
            measureTime();

            var pageX = e.pageX;
            var pageY = e.pageY;

            if (userReactionsArr.length < allowedNoOfTurns) {
                play();
            } else {
                endGame();
            }
        }
    }

    function endGame() {
        var summary = "<div id='stats'><p>" + userName + "'s "+ "reaction times:<br></p><p class='numbers'>";
        var total;
        userReactionsArr.forEach(function (time) {
            totalTime += time;
            summary += time + "<br>";
        });

        summary += "</p><p>Your average time:</p>" + "<p class='numbers'>" +
            Math.floor(totalTime / allowedNoOfTurns) + "</p></div><div id='buttons'></div>";
        playground.style.background = "green";
        playground.innerHTML = summary;

        buttons.style.display = "initial";      
        
    }

    function measureTime() {
        var reactionTime = Math.abs(startAndEndTime[0] - startAndEndTime[1]);
        userReactionsArr.push(reactionTime);
        startAndEndTime = [];
        console.log(userReactionsArr);
    }

   


    init();



    /* Event listeners */

    submitBtn.onclick = function (e) {
        introDiv.style.display = "none";
        userName = userInput.value;
        userName = (userName === "" || userName === undefined) ? "User" :  userName;
        userInput.value = "";
        alert("Hi " + userName + "! " + instruction);
        play();
    }

    playAgainBtn.onclick = function (e) {
        init();
        play();
    }

    newPlayerBtn.onclick = function (e) {
        userName = "newPlayer";
        init();
        introDiv.style.display = "initial";
        playground.innerHTML = "";

    }



}());
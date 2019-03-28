(function () {

    var totalTime = 0;
    var noOfTurns = 8;
    var userName = "User";
    var instruction = "Sprawdź swoj czas reakcji. Program wyświetli ci po kolei " +
        "8 figur geometrycznych. Twoim zadaniem jest na każdą figurę jak najszybciej kliknąć. " +
        "Na koniec gry zobaczysz swoje czasy reakcji i średnią wszystkich prób. Gdy zamkniesz to okienko, gra się ropocznie!";
    //var windowWidth = window.innerWidth; // 1600
    //var windowHeight = window.innerHeight; // 731
    var radius = 50; // px
    
    var userReactionsArr = [];
    var startAndEndTime = [];

    var submitBtn = document.getElementById("submitBtn");
    var userInput = document.getElementById("userName");
    var introDiv = document.getElementById("intro");
    var playground = document.getElementById("playground");

    function drawCircle() {       

        var xyPosition = getCoordinates();

        var shapeClass = (Math.floor(Math.random() * 2) === 0) ? "rectangle" : "rectangle rounded";
        var color = "rgb(" + getRandomColor() + ", " + getRandomColor() + ", " + getRandomColor() + ")";

        var shape = "<div id='shape' class='" + shapeClass + "' style='margin-left:" + xyPosition[0] + "px;" +
            "margin-top:" + xyPosition[1] + "px; background-color:" + color + "'></div>";
        playground.style.width = "95%";
        playground.style.minHeight = (window.innerHeight * 0.75) + "px";
        playground.innerHTML = shape;

        // start time after circle is drawn   
        startAndEndTime.push(new Date().getTime());
    }

    function getCoordinates(){

        var coordinates = [];

        console.log("width: " + window.innerWidth + ", height" + window.innerHeight);
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var xCoord = Math.floor(Math.random() * windowWidth);
        var yCoord = Math.floor(Math.random() * windowHeight);
        coordinates.push(Math.min(xCoord, windowWidth - ( 3 * radius)));
        coordinates.push(Math.min(yCoord, windowHeight - (4.75 * radius))); 

        return coordinates;

    }

    function getRandomColor() {
        return Math.floor(Math.random() * 256);
    }

    function play() {

        drawCircle();

        document.getElementById("shape").onclick = function (e) {

            // stop timer as soon as click is detected            
            startAndEndTime.push(new Date().getTime());
            measureTime();

            var pageX = e.pageX;
            var pageY = e.pageY;            

            if (userReactionsArr.length < noOfTurns) {
                play();
            } else {
                endGame();
            }
        }
    }

    function endGame() {
        var summary = "<div id='stats'><p>Your reaction times:<br></p><p class='numbers'>";
        var total;
        userReactionsArr.forEach(function (time) {
            totalTime += time;
            summary += time + "<br>";
        });

        summary += "</p><p>Your average time:</p>" + "<p class='numbers'>" +
            Math.floor(totalTime / noOfTurns) + "</p></div>";
        playground.innerHTML = summary;
    }

    function measureTime() {
        var reactionTime = Math.abs(startAndEndTime[0] - startAndEndTime[1]);
        userReactionsArr.push(reactionTime);
        startAndEndTime =[];
        console.log(userReactionsArr);
    }

    play();

    /* Event listeners */

    submitBtn.onclick = function (e) {
        introDiv.style.display = "none";
        userName = userInput.value;
        alert("Hi " + userName + "! " + instruction);

    }



}());
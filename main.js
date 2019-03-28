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
        playground.style.background = "beige";
        playground.innerHTML = summary;
    }

    function measureTime() {
        var reactionTime = Math.abs(startAndEndTime[0] - startAndEndTime[1]);
        userReactionsArr.push(reactionTime);
        startAndEndTime = [];
        console.log(userReactionsArr);
    }



    /* Event listeners */

    submitBtn.onclick = function (e) {
        introDiv.style.display = "none";
        userName = userInput.value;
        alert("Hi " + userName + "! " + instruction);
        play();
    }



}());
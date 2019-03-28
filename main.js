(function () {

    var totalTime = 0;
    var noOfTurns = 3;
    var userName = "User";
    var instruction = "Sprawdź swoj czas reakcji. Program wyświetli ci po kolei " +
        "8 figur geometrycznych. Twoim zadaniem jest na każdą figurę jak najszybciej kliknąć. " +
        "Na koniec gry zobaczysz swoje czasy reakcji i średnią wszystkich prób. Gdy zamkniesz to okienko, gra się ropocznie!";
    var windowWidth = window.innerWidth; // 1600
    var windowHeight = window.innerHeight; // 731
    var radius = 200; // px
    var pageMarginX = windowWidth - radius; // ?
    var pageMarginY = windowHeight - radius; // ?
    var userReactionsArr = [];

    var startTime;
    var endTime;

    var submitBtn = document.getElementById("submitBtn");
    var userInput = document.getElementById("userName");
    var introDiv = document.getElementById("intro");
    var playground = document.getElementById("playground");

    function drawCircle() {



        console.log("width: " + windowWidth + ", height" + windowHeight);

        var xCoord = Math.floor(Math.random() * windowWidth);
        var yCoord = Math.floor(Math.random() * windowHeight);
        //console.log(xCoord + ", " + yCoord);

        var shapeClass = (Math.floor(Math.random() * 2) === 0) ? "rectangle" : "rectangle rounded";
        var shape = "<div id='shape' class='" + shapeClass + "' style='margin-left:" + xCoord + "px;" +
            "margin-top:" + yCoord + "px'></div>";
        playground.innerHTML = shape;

        // start time after circle is drawn   
        startTime = new Date().getTime();
        console.log("shape drawn: " + startTime);
    }

    function play() {

        drawCircle();

        document.getElementById("shape").onclick = function (e) {

            // stop timer as soon as click is detected            
            endTime = new Date().getTime();
            console.log("Shape clicked: " + endTime);
            measureTime(endTime, startTime);

            var pageX = e.pageX;
            var pageY = e.pageY;
            //alert("Got it" + pageX + ", " + pageY);


            if(userReactionsArr.length < noOfTurns){
                play();
            } else {
                endGame();
            }            
        }
    }

    function endGame(){
        playground.style.display = "none";
    }

    function measureTime(end, start) {
        var reactionTime = end - start;
        userReactionsArr.push(reactionTime);        
        console.log(start + ", " + end + ", " + reactionTime);
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
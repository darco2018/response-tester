(function () {

    // initialized in init()
    var totalTime;
    var allowedNoOfTurns;
    var userName;
    var userReactionsArr;
    var startAndEndTime;
    var shapeWidth = 100; // px
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
    var shape = document.getElementById("shape");
    var stats = document.getElementById("stats");


    init();

    function init(){
                
        buttons.style.display = "none";
        totalTime = 0;
        allowedNoOfTurns = 3;
        userName = (userName === "" || userName === undefined) ? "Friend" :  userName;
        userReactionsArr = [];
        startAndEndTime = [];
    }

    function play() {

        setUpPlayground();        
        setupShape();
        playground.style.display = "block";
        shape.style.display = "block"; // initial doesnt work

        // start time after circle is drawn   
        startAndEndTime.push(new Date().getTime());

        document.getElementById("shape").onclick = function () {

            // stop timer as soon as click is detected            
            startAndEndTime.push(new Date().getTime());
            measureTime();

            if (userReactionsArr.length < allowedNoOfTurns) {
                play();
            } else {
                endGame();
            }
        }
    }

   

    function endGame() {

        playground.style.background = "green";

        var summary = "<div id='stats'><p>" + userName + "'s "+ "reaction times:<br></p><p class='numbers'>";
        var totalTime;
        userReactionsArr.forEach(function (time) {
            totalTime += time;
            summary += time + "<br>";
        });

        summary += "</p><p>Your average time:</p>" + "<p class='numbers'>" +
            Math.floor(totalTime / allowedNoOfTurns) + "</p></div><div id='buttons'></div>";
       
        stats.innerHTML = summary;

        buttons.style.display = "initial";      
        
    }

    function measureTime() {
        var reactionTime = Math.abs(startAndEndTime[0] - startAndEndTime[1]);
        userReactionsArr.push(reactionTime);
        startAndEndTime = [];
        console.log(userReactionsArr);
    }

    

    /* --------------- HELPERS ------------------ */

    function setUpPlayground(){
        playground.style.width = "95%";
        playground.style.minHeight = (window.innerHeight * 0.75) + "px";
    }

    function getRandomColor() {
        return Math.floor(Math.random() * 256);
    }

    function getCoordinates() {

        var coordinates = [];
        /* var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight; */
        var xCoord = Math.random() * 900;
        var yCoord = Math.random() * 300;
       
        coordinates.push(xCoord);
        coordinates.push(yCoord);
        return coordinates;
    }

    function setupShape() {      

        var xyPosition = getCoordinates(); 
        var size = Math.floor(Math.random() * 200) + 50;
        
        shape.style.backgroundColor = "rgb(" + getRandomColor() + ", " + getRandomColor() + ", " + getRandomColor() + ")";
        shape.style.width = size + "px";
        shape.style.height = size + "px"; // nie ma length!
        shape.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";         
        shape.style.top = xyPosition[1] + "px"; 
        shape.style.left = xyPosition[0] + "px";  
    }

    /* ---------------------- Event listeners ----------------- */

    submitBtn.onclick = function (e) {
        introDiv.style.display = "none";

        userName = userInput.value;
        userName = (userName === "" || userName === undefined) ? "User" :  userName;
        userInput.value = "";
        alert("Hi " + userName + "! " + instruction);

        play();
    }

    playAgainBtn.onclick = function (e) {
        document.getElementById("stats").style.display = "none";
        init();
        play();
    }

    newPlayerBtn.onclick = function (e) {
        

    }



}());


window.onload = function () {
    let objCanvas = document.getElementById('gameScreen');
    let objContext = objCanvas.getContext('2d');

    //#region "Game Questions" 
    let listOfQuestions = [ 
        new Question("GATO", "./images/animals/gato.png", "./sounds/animals/gato.mp3", "T"),
        new Question("ZEBRA", "./images/animals/zebra.png", "./sounds/animals/zebra.mp3", "Z"),
        new Question("CACHORRO", "./images/animals/cachorro.png", "./sounds/animals/cachorro.mp3", "A"),
        new Question("CAVALO", "./images/animals/cavalo.png", "./sounds/animals/cavalo.mp3", "V"),
        new Question("LEAO", "./images/animals/leao.png", "./sounds/animals/leao.mp3", "O"),
        new Question("ELEFANTE", "./images/animals/elefante.png", "./sounds/animals/elefante.mp3", "F"),
        new Question("GIRAFA", "./images/animals/girafa.png", "./sounds/animals/girafa.mp3", "R"),
        new Question("JACARE", "./images/animals/jacare.png", "./sounds/animals/jacare.mp3", "J"),
        new Question("MACACO", "./images/animals/macaco.png", "./sounds/animals/macaco.mp3", "M"),
        new Question("PEIXE", "./images/animals/peixe.png", "./sounds/animals/peixe.mp3", "P")
    ]
    shuffle(listOfQuestions);
    //#endregion

    //#region "Game constants and letiables"  
    let soundtrack = new sound("./sounds/gametheme.mp3", 0.5, true);
    let soundtrackPlaying = false;

    let score = 0;
    let gameStarted = false;
    let gameEnded = false;
    let gameWin = false;

    let questionIndex = 0;

    let answerOptions = [];
    //#endregion

    //#region "Game Events"
    objCanvas.addEventListener('mousedown', function (e) {
        getPlayerInteractions(objCanvas, e)
    });
    //#endregion 

    function gameLoop(x, y) { 
        clearScreen();  

        if (!gameWin) {
            if ((x >= 762.5 && x <= 790.5) && (y >= 11 && y <= 39)) {
                window.location = "../index.php";
            }

            if (answerOptions.length == 0) {
                answerOptions = getAnswerOptions(5, [listOfQuestions[questionIndex].correctAnswer]);
                shuffle(answerOptions);
            }

            // Draw score
            drawText(score.toString(), 430, 220, 110, "black");

            // Animal image
            drawImage(listOfQuestions[questionIndex].imagePath, 1235, 280, 600, 600);

            // Animal name
            drawText(listOfQuestions[questionIndex].animal.replace(listOfQuestions[questionIndex].correctAnswer, "_"), 600, 1390, 300, "black");
            if (listOfQuestions[questionIndex].animal == "LEAO") {
                drawText("~", 955, 1230, 300, "black");
            }
            else if (listOfQuestions[questionIndex].animal == "JACARE") {
                drawText("'", 1665, 1215, 180, "black");
            }

            // Answer buttons
            drawText(answerOptions[0], 290, 1985, 140, "black");
            drawText(answerOptions[1], 765, 1985, 140, "black");
            drawText(answerOptions[2], 1220, 1985, 140, "black");
            drawText(answerOptions[3], 1695, 1985, 140, "black");
            drawText(answerOptions[4], 2170, 1985, 140, "black");
            drawText(answerOptions[5], 2630, 1985, 140, "black");

            // Sound button
            if ((x >= 42.5 && x <= 134.5) && (y >= 281.5 && y <= 374.5)) {
                let _sound = new sound(listOfQuestions[questionIndex].soundPath, 1, false);
                _sound.play();
            }

            // Answer buttons
            let answered = false; 
            if ((x >= 41.5 && x <= 144.5) && (y >= 459.5 && y <= 566.5)) {
                if (answerOptions[0] == listOfQuestions[questionIndex].correctAnswer) {
                    answered = true;
                }
            }
            if ((x >= 164.5 && x <= 269.5) && (y >= 459.5 && y <= 566.5)) {
                if (answerOptions[1] == listOfQuestions[questionIndex].correctAnswer) {
                    answered = true;
                }
            }
            if ((x >= 288.5 && x <= 392.5) && (y >= 459.5 && y <= 566.5)) {
                if (answerOptions[2] == listOfQuestions[questionIndex].correctAnswer) {
                    answered = true;
                }
            }
            if ((x >= 414.5 && x <= 519.5) && (y >= 459.5 && y <= 566.5)) {
                if (answerOptions[3] == listOfQuestions[questionIndex].correctAnswer) {
                    answered = true;
                }
            }
            if ((x >= 539.5 && x <= 643.5) && (y >= 459.5 && y <= 566.5)) {
                if (answerOptions[4] == listOfQuestions[questionIndex].correctAnswer) {
                    answered = true;
                }
            }
            if ((x >= 665.5 && x <= 769.5) && (y >= 459.5 && y <= 566.5)) {
                if (answerOptions[5] == listOfQuestions[questionIndex].correctAnswer) {
                    answered = true;
                }
            }

            if (answered) {
                score += 10;
                if (questionIndex < listOfQuestions.length - 1) {
                    questionIndex += 1;
                    answerOptions = getAnswerOptions(5, [listOfQuestions[questionIndex].correctAnswer]);
                    shuffle(answerOptions);
                }
                else {
                    gameWin = true;
                }
            }
        }
        else { 
            drawImage("images/gamewin.jpg", 0, 0, objCanvas.width, objCanvas.height); 
            if (gameEnded == false) gameEnded = true;

            if (gameEnded) {
                if ((x > 0 && x < 3000) && (y > 0 && y < 2250) && x != undefined && y != undefined) {
                    window.location = "../index.php";
                }
            }
        }

        window.requestAnimationFrame(gameLoop);
    }


//#region "Types"
    function Question(animal, imagePath, soundPath, correctAnswer) {
        this.animal = animal;
        this.imagePath = imagePath;
        this.soundPath = soundPath;
        this.correctAnswer = correctAnswer;
    }
//#endregion

//#region "Utils"
    //#region "Draw Functions"
    function clearScreen() {
        objContext.clearRect(0, 0, objCanvas.width, objCanvas.height);
    }

    function drawImage(pImagePath, pX, pY, pHorizontalSize, pVerticalSize) {
        let image = new Image();
        image.src = pImagePath;
        objContext.drawImage(image, pX, pY, pHorizontalSize, pVerticalSize);
    }

    function drawText(pText, pX, pY, pFontSize, pColor = "") {
        objContext.font = pFontSize.toString() + "px Quicksand";
        objContext.textBaseline = 'bottom';

        objContext.fillStyle = "rgba(255, 255, 255, 0.1)";
        objContext.fillText(pText, pX - 3, pY - 3);

        objContext.fillStyle = "rgba(0, 0, 0, 0.3)";
        objContext.fillText(pText, pX + 3, pY + 3);

        if (pColor != "") {
            objContext.fillStyle = pColor.toString();
        }
        else {
            let gradient = objContext.createLinearGradient(0, 0, objCanvas.width, 0);
            gradient.addColorStop("0", "#D3E156");
            gradient.addColorStop("0.5", "#CCDD39");
            gradient.addColorStop("1.0", "#BFC932");
            objContext.fillStyle = gradient;
        }

        objContext.fillText(pText, pX, pY);
    }

    function drawRectangle(pX, pY, pWidth, pHeight, pColor = "") {
        if (pColor != "") {
            objContext.fillStyle = pColor.toString();
        }
        else {
            objContext.fillStyle = "#FF0000";
        }

        objContext.fillRect(pX, pY, pWidth, pHeight);
    }
    //#endregion

    //#region "Canvas related"
    function getPlayerInteractions(canvas, event) {
        if (soundtrackPlaying == false) {
            soundtrack.play();
            soundtrackPlaying = true;
        }

        const rect = canvas.getBoundingClientRect()
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        console.log("(" + x.toString() + ", " + y.toString() + ")");

        if (gameStarted == false) {
            document.getElementById("gameScreenBackground").src = "images/background.jpg";
            gameStarted = true;

            window.setTimeout(function () {
                gameLoop(x, y);
            }, 50);
        }
        else {
            gameLoop(x, y); 
        } 
    }
    //#endregion

    //#region "Sound"
    function sound(src, volume, loop) {
        this.sound = document.createElement("audio");

        this.sound.src = src;
        this.sound.volume = volume;
        this.sound.loop = loop;

        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";

        document.body.appendChild(this.sound);

        this.play = function () {
            this.sound.play();
        }

        this.stop = function () {
            this.sound.pause();
        }
    }
    //#endregion 

    //#region "Others"
    function getAnswerOptions(numberOfAnswers, fromArray = null) {
        let result = [];
        if (fromArray != null) result = fromArray;

        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charactersLength = characters.length;

        let randomChar = null; 
        for (let i = 0; i < numberOfAnswers; i++) { 
            while (randomChar == null || result.includes(randomChar)) {
                randomChar = characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            result.push(randomChar); 
            randomChar = null;
        }

        return result;
    }

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    //#endregion
//#endregion

}
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score")

let gameOver = false; 
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let currentScore = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;


const changeFoodPosition = () => {
    // give a random value 0-30 as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1; 
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = (e) => {
    // changing velocity based on key press
    if (e.key === "ArrowUp" && velocityY != 1 && velocityY != -1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1 && velocityY != 1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1 && velocityX != -1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1 && velocityX != 1) {
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

const initGame = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); // pushing food position to snake body array
        currentScore++;

        highScore = currentScore >= highScore ? currentScore : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${currentScore}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // shifting the snake
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; 

    // Updating the snakes head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // add a div for each part of the snake's body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // check if snake hit its own body
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;S
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 130);

document.addEventListener("keydown", changeDirection);
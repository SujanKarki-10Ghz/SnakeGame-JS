const playBoard = document.querySelector(".playboard");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highScore");
const controls = document.querySelectorAll(".controls i");
// Snake food

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];

let velocityX = 0,
  velocityY = 0;

let setIntervalId;
let score = 0;

//getting highScore from localstorage
let high_score = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = `High Score : ${high_score}`;

//changing food position
const changeFoodPosition = () => {
  //Passing a random 0-30 value as position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  //clearing the timer and reloading the page on game over

  clearInterval(setIntervalId);
  alert("Game over! Press ok to replay....");
  location.reload();
};

//change direction of snake head
const changeDirection = (e) => {
  //changing velocity value based on key press
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0; //horizontal
    velocityY = -1; //vertical
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
controls.forEach((key) => {
  key.addEventListener("click", () => {
    //calling the change direction on each key click and passing key datset value as an object
    changeDirection({ key: key.dataset.key });
  });
});

const initGame = () => {
  if (gameOver) {
    return handleGameOver();
  }

  //creating a food div and inserting it in the playboard element.
  let htmlMarkup = `<div class = "food" style = "grid-area:${foodY} / ${foodX}"></div>`;
  //grid-area is shorthand property that sets the values of grid item's start and end lines for both row and column

  //checking if snake hit the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); // => pushing food position to snake body array
    // console.log(snakeBody);
    score++; //=> increment the score by 1 every time snake eats food.

    high_score = score >= high_score ? score : high_score; //set highScore to score value if score is greater than highScore
    localStorage.setItem("highScore", high_score);
    scoreElement.innerText = `Score: ${score}`; //update the score to display
    highScoreElement.innerText = `High Score: ${high_score}`;
    console.log(high_score);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    //shifting forward the values of the elements in the snake body by one
    snakeBody[i] = snakeBody[i - 1];
  }

  //setting the first element of snake body to current snake position
  snakeBody[0] = [snakeX, snakeY];

  //Updating the snake's head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  //checking if the snake's head is out of the wall, if so setting gameover to true

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    // console.log("Game over");
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    //adding a div for each part of the snake's body
    htmlMarkup += `<div class = "head" style = "grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    //checking if snake head hit the body, if so set gameover to true
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setIntervalId = setInterval(initGame, 125); //snake head will move after every 125 millisecond
document.addEventListener("keydown", changeDirection);

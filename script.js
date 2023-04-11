const playBoard = document.querySelector(".playboard");
// Snake food
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
//changing food position
const changeFoodPosition = () => {
  //Passing a random 0-30 value as position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

//change direction of snake head
const changeDirection = (e) => {
  //changing velocity value based on key press
  if (e.key === "ArrowUp") {
    velocityX = -1; //horizontal
    velocityY = 0; //vertical
  } else if (e.key === "ArrowDown") {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowRight") {
    velocityX = 0;
    velocityY = 1;
  }
};

const initGame = () => {
  //creating a food div and inserting it in the playboard element.

  let htmlMarkup = `<div class = "food" style = "grid-area:${foodY} / ${foodX}"></div>`;
  //grid-area is shorthand property that sets the values of grid item's start and end lines for both row and column

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
  }

  //Updating the snake's head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  htmlMarkup += `<div class = "head" style = "grid-area:${snakeX} / ${snakeY}"></div>`;
  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setInterval(initGame, 125); //snake head will move after every 125 millisecond
document.addEventListener("keydown", changeDirection);

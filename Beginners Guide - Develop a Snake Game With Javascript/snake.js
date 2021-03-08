/* Initializing */
var canvas, context;

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  document.addEventListener("keydown", PlayerController);

  // Set FPS - Frame Rate per Second
  let FPS = 15;
  setInterval(Render, 1000 / FPS);
};

/* Environment Game Variables */
// Game 
const BACKGROUND_COLOR = "black";
const TILE_SIZE = 20;
let horizontal = vertical = 0;

// Snake
const SNAKE_COLOR = "#41817a";
const DEFAULT_TAIL_LENGTH = 3;
let currentTailLength = DEFAULT_TAIL_LENGTH;
let snakeTrail = [];
let snakePosX = snakePosY = 10;

// Fruit
const FRUIT_COLOR = "orange";
let fruitPosX = fruitPosY = 5;

/* Render World */
function Render() {
  // Move Snake  
  snakePosX += horizontal;
  snakePosY += vertical;

  // Boundaries
  if (snakePosX < 0) {
    snakePosX = TILE_SIZE - 1;
  }
  if (snakePosX > TILE_SIZE - 1) {
    snakePosX = 0;
  }

  if (snakePosY < 0) {
    snakePosY = TILE_SIZE - 1;
  }
  if (snakePosY > TILE_SIZE - 1) {
    snakePosY = 0;
  }

  for(let i = 0; i < snakeTrail.length; i++) {
    if (snakeTrail[i].x == snakePosX && snakeTrail[i].y == snakePosY) {
      currentTailLength = DEFAULT_TAIL_LENGTH;
      snakePosX = snakePosY = 10;
      horizontal = vertical = 0;
    }
  }

  // Eat Fruit
  if (snakePosX == fruitPosX && snakePosY == fruitPosY) {
    currentTailLength++;
    // Generate new fruit at random position
    fruitPosX = Math.floor(Math.random() * TILE_SIZE);
    fruitPosY = Math.floor(Math.random() * TILE_SIZE);
  }

  // Draw Elements
  // Background
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(
    0, 
    0, 
    canvas.width, 
    canvas.height
  );

  // Snake
  context.fillStyle = SNAKE_COLOR;
  for (let i = 0; i < snakeTrail.length; i++) {
    context.fillRect(
      snakeTrail[i].x * TILE_SIZE,
      snakeTrail[i].y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );    
  }

  // Fruit
  context.fillStyle = FRUIT_COLOR;
  context.fillRect(
    fruitPosX * TILE_SIZE, 
    fruitPosY * TILE_SIZE, 
    TILE_SIZE, 
    TILE_SIZE
  );

  // Set Trail
  snakeTrail.push({ x: snakePosX, y: snakePosY });
  while (snakeTrail.length > currentTailLength) {
    snakeTrail.shift();
  }
}

/* PlayerController */
function PlayerController(input) {
  const LEFT_ARROW = "ArrowLeft";
  const DOWN_ARROW = "ArrowDown";
  const RIGHT_ARROW = "ArrowRight";
  const UP_ARROW = "ArrowUp";

  switch (input.key) {
    case LEFT_ARROW:
      if(horizontal != 1) {
        horizontal = -1;
        vertical = 0;
      }
      break;
    case UP_ARROW:
      if(vertical != 1) {
        horizontal = 0;
        vertical = -1;
      }
      break;
    case RIGHT_ARROW:
      if(horizontal != -1) {
        horizontal = 1;
        vertical = 0;
      }
      break;
    case DOWN_ARROW:
      if(vertical != -1) {
        horizontal = 0;
        vertical = 1;
      }
      break;
  }
}

const snakeContainer = document.querySelector(".snake-container");
const appleContainer = document.querySelector(".apple-container");
const gameContainer = document.querySelector(".game-container");
snakeContainer.innerHTML += `<div class="snake box" id="${0}"></div>`;

let interval = null;
let abajo = 0;
let derecha = 0;
let move = [];
let point = 1;
let positionYApple = 0;
let positionXApple = 0;
let arrayLength = 0;
let down = false;
let up = false;
let right = false;
let left = false;

let contador = 0;

const snake = document.querySelectorAll(".snake");
const apple = document.querySelector(".apple");

const alargarSnake = () => {
  reubicarApple();
  snakeContainer.innerHTML += `<div class="snake box" id="${point}" style="margin:${
    move[contador - point]
  };"></div>`;

  point++;
  arrayLength++;
};

const reubicarApple = () => {
  appleContainer.innerHTML = " ";
  positionYApple = Math.round(Math.random() * 30) * 25;
  positionXApple = Math.round(Math.random() * 30) * 25;
  appleContainer.innerHTML += `<div class="apple" id="apple"></div>`;
  const apple = document.querySelector(".apple");
  apple.style.transform = `translateY(${positionYApple}px) translateX(${positionXApple}px)`;
};

reubicarApple();

document.addEventListener("keypress", (key) => {
  if (
    key.key === "W" ||
    key.key === "w" ||
    key.key === "A" ||
    key.key === "a" ||
    key.key === "S" ||
    key.key === "s" ||
    key.key === "d" ||
    key.key === "D"
  ) {
    clearInterval(interval);
    interval = setInterval(() => {
      if (key.key === "w" || key.key === "W") {
        if (down == true) {
          abajo = abajo + 25;
        } else {
          abajo = abajo - 25;
          up = true;
          down = false;
          left = false;
          right = false;
        }
      }
      if (key.key === "s" || key.key === "S") {
        if (up == true) {
          abajo = abajo - 25;
        } else {
          abajo = abajo + 25;
          up = false;
          down = true;
          left = false;
          right = false;
        }
      }
      if (key.key === "d" || key.key === "D") {
        if (left == true) {
          derecha = derecha - 25;
        } else {
          derecha = derecha + 25;
          up = false;
          down = false;
          left = false;
          right = true;
        }
      }
      if (key.key === "a" || key.key === "A") {
        if (right == true) {
          derecha = derecha + 25;
        } else {
          derecha = derecha - 25;
          up = false;
          down = false;
          left = true;
          right = false;
        }
      }
      const snake = document.querySelectorAll(".snake");
      move.push(`${abajo}px ${derecha}px`);
      snake.forEach((element) => {
        element.style.margin = move[contador - element.id];
      });
      contador++;
      for (let i = 1; i < arrayLength; i++ ) {
        if (move[move.length - 1] == move[move.length - i - 2]) {
          lose();
        }
      }

      if( abajo >  750 || abajo < 0 || derecha >  750 || derecha < 0 ){
        lose()
      }
      if (`${positionYApple}px ${positionXApple}px` === move[move.length - 1]) {
        alargarSnake();
      }
    }, 50);
  }
});

const lose = () => {
  gameContainer.innerHTML =
    '<p class="noti">perdiste!!</p>';
};

alargarSnake()
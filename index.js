// Capure DOM Elements
const board = document.querySelector(".game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.querySelector("#score");
const highScore = document.querySelector("#high-score");

const gridWidth = 20, gridHeight = 20;
let snakePosition = [{ x: 10, y: 10}];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

const draw = () => {
    board.innerHTML = "";
    drawSnake();
    drawFood();
};

const drawSnake = () => {
    snakePosition.forEach((snakeSeg) => {
        const snakeElement = createGameElement("div", "snake");
        setPosition(snakeElement, snakeSeg);
        board.appendChild(snakeElement);
    });
};

//Create Snake and food element
const createGameElement = (tagElement, classname) => {
    const snakeElement = document.createElement(tagElement);
    snakeElement.classList.add(classname)
    return snakeElement;
};

const setPosition = (snakeElement, positionSnakeElement) => {
    snakeElement.style.gridColumn = positionSnakeElement.x;
    snakeElement.style.gridRow = positionSnakeElement.y;
} 

//Draw Food in Board
function drawFood() {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Generate random coordinates
function generateFood() {
    const foodX = Math.floor(Math.random() * gridWidth) + 1;
    const foodY = Math.floor(Math.random() * gridHeight) + 1;
    return { x: foodX, y: foodY };
}

const moveActions = {
    "up": (head) => {
        return {
            x: head.x,
            y: head.y - 1
        };
    },
    "down": (head) => {
        return {
            x: head.x,
            y: head.y + 1
        };
    },
    "right": (head) => {
        return {
            x: head.x + 1,
            y: head.y
        };
    },
    "left": (head) => {
        return {
            x: head.x - 1,
            y: head.y
        };
    }
}

//Move Functionality
const move = () => {
    const snakeHead = { ...snakePosition[0] };
    const newHead = moveActions[direction](snakeHead);
    snakePosition.unshift(newHead);
    const xSnakeFood = newHead.x === food.x;
    const ySnakeFood = newHead.y === food.y;
    if (xSnakeFood && ySnakeFood) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            draw();
        }, gameSpeedDelay);
    } else {
        snakePosition.pop();
    }
}

const speedTable = {
    "150": 5,
    "100": 3,
    "50": 2,
    "25": 1
}

const increaseSpeed = () => {
    const speedArray = Object.keys(speedTable);
    const speedArrayNum = speedArray.map((element) => {
        return Number(element);
    }).sort((a, b) => b - a)
    for (const speedThreshold of speedArrayNum) {
        const numSpeedThreshold = typeof speedThreshold === "number" ? speedThreshold : Number(speedThreshold);
        if (gameSpeedDelay > numSpeedThreshold) {
            gameSpeedDelay -= speedTable[speedThreshold];
            console.log("Speed Increased.New Speed" + String(gameSpeedDelay));
            return;
        }
    }
}

function startGame() {
    gameStarted = true;
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() => {
        move();
        //checkCollision();
        draw();
    }, gameSpeedDelay);
}

const keyDirection = {
    "ArrowUp": "up",
    "ArrowDown": "down",
    "ArrowLeft": "left",
    "ArrowRight": "right"
}

//Event Listener Spacebar Start Game
document.addEventListener("keydown", (e) => {
    handleKeyPress(e);
});

function handleKeyPress(event) {
    const isSpaceBar = event.code === "Space" || event.key === " ";
    if (!gameStarted && isSpaceBar) {
        startGame();
    } else {
        direction = keyDirection[event.key]; 
    }
}




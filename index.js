const board = document.querySelector(".game-board");
const gridWidth = 20, gridHeight = 20;
let snakePosition = [{ x: 10, y: 10}];
let food = generateFood();

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

draw();

function drawFood() {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    const foodX = Math.floor(Math.random() * gridWidth) + 1;
    const foodY = Math.floor(Math.random() * gridHeight) + 1;
    return { x: foodX, y: foodY };
}


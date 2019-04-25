import { CellType, MinesweeperGame } from "./minesweeper.mjs"

let menu = document.querySelector(".menu");
let menuButton = document.querySelector(".header > button");

function closeMenu() {
    menu.classList.remove("menu-shown");
    menu.classList.add("menu-hidden");
    menuButton.classList.remove("is-active");
}

function openMenu() {
    gameWinPopup.classList.add("invisible");
    gameOverPopup.classList.add("invisible");
    menu.classList.remove("menu-hidden");
    menu.classList.add("menu-shown");
    menuButton.classList.add("is-active");
}

function toggleMenu() {

    if (menu.classList.contains("menu-hidden")) {
        gameWinPopup.classList.add("invisible");
        gameOverPopup.classList.add("invisible");
        openMenu();
    } else {
        closeMenu();
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        toggleMenu();
    }

});

let closeMenuButton = document.querySelector(".menu-close");
closeMenuButton.addEventListener("click", function() {
    closeMenu();
});

menuButton.addEventListener("click", function() {
    toggleMenu();
});


let game = null
let firstClick = false;;

let gameBoardContainer = document.querySelector(".board-container");
let gameBoard = document.querySelector(".board");
let gameBoardText = document.querySelector(".game > span");

function resetAll() {

    gameBoardContainer.classList.add("invisible");
    gameBoardText.classList.remove("invisible");
    let svgUp = document.getElementById("back_up");
    let svgDown = document.getElementById("back_down");
    svgUp.classList.remove("invisible");
    svgDown.classList.remove("invisible");
    svgUp.classList.remove("go-up");
    svgDown.classList.remove("go-down");
    gameBoard.style.pointerEvents = "initial";
    gameWinPopup.classList.add("invisible");
    gameOverPopup.classList.add("invisible");
    stopGameTimer();
    resetBombCounter();
    firstClick = false;
}

let headerIcon = document.querySelector(".header > img");
headerIcon.addEventListener("click", resetAll);

let gameBar = document.querySelector(".game-bar");
let dragGameBar = document.querySelector(".game-bar-drag");
let gameBarStyle = getComputedStyle(gameBar);
let gameBarX = parseInt(gameBarStyle.left.slice(0, -2));

dragGameBar.addEventListener("mousedown", function(e) {

    function moveGameBar(e) {

        gameBarX += e.movementX;
        if (gameBarX < 0) {
            gameBarX = 0;
        }
        if (gameBarX > window.innerWidth - gameBar.clientWidth - 2) {
            gameBarX = window.innerWidth - gameBar.clientWidth - 2;
        }
        gameBar.style.left = gameBarX + "px";
    }
    document.addEventListener("mousemove", moveGameBar);
    
    function releaseGameBar() {
        document.removeEventListener("mousemove", moveGameBar);
        document.removeEventListener("mouseup", releaseGameBar);
    };
    document.addEventListener("mouseup", releaseGameBar);

});

let timerSpanSeconds = document.querySelector(".game-bar > .timer > .seconds");
let timerSpanMinutes = document.querySelector(".game-bar > .timer > .minutes");

let timerMustDie = false;
function runGameTimer() {

    let interval = 1000;
    let startTime = Date.now();
    let expected = startTime + interval;
    timerMustDie = false;

    function timerStep() {

        if (timerMustDie) {
            timerSpanMinutes.textContent = "00";
            timerSpanSeconds.textContent = "00";
            return;
        }
        let dt = Date.now() - expected;
        if (dt > interval) {
            expected += dt;
        }
        let elapsedSeconds = (expected - startTime) / 1000;
        timerSpanMinutes.textContent = Math.floor(elapsedSeconds / 60).toString().padStart(2, "0");
        timerSpanSeconds.textContent = (elapsedSeconds % 60).toString().padStart(2, "0");

        expected += interval;
        setTimeout(timerStep, interval - dt % interval);

    }
    setTimeout(timerStep, interval);
}
function stopGameTimer() {
    timerMustDie = true;
}

let foundedBombsSpan = document.querySelector(".game-bar-bombs > .bombs-counter");
let maxBombsSpan = document.querySelector(".game-bar-bombs > .max-bombs");
let bombsCounter = 0;

function resetBombCounter() {
    
    bombsCounter = 0;
    foundedBombsSpan.textContent = bombsCounter;
    maxBombsSpan.textContent = bombsCounter;
}

function startGame(xSize, ySize, bombs) {

    game = new MinesweeperGame(xSize, ySize, bombs);
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    for (let i = 0; i < game.board.length; ++i) {

        let row = game.board[i];
        let rowDiv = document.createElement("div");
        gameBoard.appendChild(rowDiv);
        for (let j = 0; j < row.length; ++j) {

            let cellDiv = document.createElement("div");
            cellDiv.className = "cell unknown";
            cellDiv.textContent = "?";
            cellDiv.dataset.x = j;
            cellDiv.dataset.y = i;
            rowDiv.appendChild(cellDiv);
        }
    }
    maxBombsSpan.textContent = bombs;
    gameBoard.style.pointerEvents = "initial";
    firstClick = false;
    game.onGameWin = function() {
        setTimeout(endGame, 1000, [true]);
    }
}

let gameOverPopup = document.querySelector(".game-over-popup");
let gameWinPopup = document.querySelector(".game-win-popup");

function endGame(isWin=false) {

    gameBoard.style.pointerEvents = "none";
    if (isWin) {
        gameWinPopup.classList.remove("invisible");
    } else {
        gameOverPopup.classList.remove("invisible");
    }
    stopGameTimer();
    resetBombCounter();
}

let menuStartButton = document.querySelector(".menu-content > button");
let firstScreenStartButton = document.querySelector("#back_down > g:nth-child(11) > g:nth-child(2)");

let xSize, ySize, bombs;

let resetAfterLoseImg = document.querySelector(".game-over-popup > img");
resetAfterLoseImg.addEventListener("click", function() {
    gameOverPopup.classList.add("invisible");
    startGame(xSize, ySize, bombs);
});

menuStartButton.addEventListener("click", function() {
    
    xSize = parseInt(document.getElementsByName("area-width")[0].value);
    ySize = parseInt(document.getElementsByName("area-height")[0].value);
    bombs = parseInt(document.getElementsByName("bomb-number")[0].value);
    startGame(xSize, ySize, bombs);
    closeMenu();
});
firstScreenStartButton.addEventListener("click", function() {

    if (gameBoardContainer.classList.contains("invisible")) {
        gameBoardText.classList.add("invisible");
        gameBoardContainer.classList.remove("invisible");
    }
    xSize = parseInt(document.getElementsByName("svg-area-width")[0].value);
    ySize = parseInt(document.getElementsByName("svg-area-height")[0].value);
    bombs = parseInt(document.getElementsByName("svg-bomb-number")[0].value);
    startGame(xSize, ySize, bombs);
    let svgUp = document.getElementById("back_up");
    let svgDown = document.getElementById("back_down");
    svgUp.classList.add("go-up");
    svgDown.classList.add("go-down");
    setTimeout(function() {
        svgUp.classList.add("invisible");
    }, 3000);
    setTimeout(function() {
        svgDown.classList.add("invisible");
    }, 1500);
});


gameBoard.addEventListener("click", function(e) {
        
    let cell;
    if (!e.target.classList.contains("cell")) {
        cell = document.elementFromPoint(e.x, e.y);
    } else {
        cell = e.target;
    }
    let cellX = parseInt(cell.dataset.x);
    let cellY = parseInt(cell.dataset.y);
    if (game.getCellStatus(cellX, cellY) !== CellType.Unknown) {
        return;
    }
    let pickResultData = game.pick(cellX, cellY);
    if (pickResultData === "BOOOM!") {
        cell.classList.replace("unknown", "bomb");  
        cell.textContent = "💣";
        setTimeout(endGame, 1000);
        return;
    }
    if (!(pickResultData instanceof Array)) {
        console.log("Error: MinesweeperGame.pick() return not Array");
        return;
    }
    for (let cellInfo of pickResultData) {

        let revealedCell = gameBoard.children[cellInfo.y].children[cellInfo.x];
        revealedCell.className = "cell safely";
        revealedCell.textContent = (cellInfo.value === 0 ? "" : cellInfo.value);

    }
    if (!firstClick) {
        
        runGameTimer();
        firstClick = true;
    }
});

gameBoard.addEventListener("contextmenu", function(e) {

    let cell;
    if (!e.target.classList.contains("cell")) {
        cell = document.elementFromPoint(e.x, e.y);
    } else {
        cell = e.target;
    }
    let cellX = parseInt(cell.dataset.x);
    let cellY = parseInt(cell.dataset.y);
    if (game.getCellStatus(cellX, cellY) === CellType.Revealed) {
        return;
    }
    let newStatus = game.markBomb(cellX, cellY);
    if (newStatus === CellType.Marked) {

        cell.classList.add("flag");
        cell.textContent = "🚩";
        bombsCounter++;

    } else {

        cell.classList.remove("flag");
        cell.textContent = "?";
        bombsCounter--;
    }
    foundedBombsSpan.textContent = bombsCounter;
    e.preventDefault();
});
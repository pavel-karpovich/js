
let menu = document.querySelector(".menu");
let menuButton = document.querySelector(".header > button");

function closeMenu() {
    menu.classList.add("menu-hidden");
    menuButton.classList.remove("is-active");
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        menu.classList.toggle("menu-hidden");
        menuButton.classList.toggle("is-active");
    }

});

let closeMenuButton = document.querySelector(".menu-close");
closeMenuButton.addEventListener("click", function() {
    closeMenu();
});

menuButton.addEventListener("click", function() {
    menu.classList.toggle("menu-hidden");
    menuButton.classList.toggle("is-active");
});


class MinesweeperGame {

    constructor(xSize, ySize, bombNumber) {

        if (bombNumber > xSize * ySize) {
            bombNumber = 0;
        }
        this.x = xSize;
        this.y = ySize;
        this.totalBombs = bombNumber;
        this.foundBombs = 0;

        this.board = new Array(this.y);
        for (let i = 0; i < this.board.length; ++i) {
            this.board[i] = new Array(this.x);
            for (let j = 0; j < this.board[i].length; ++j) {
                this.board[i][j] = { hasBomb: false, revealed: false, value: "?" };
            }
        }
        let bombPositions = [];
        const totalCells = this.x * this.y;
        
        while (bombPositions.length != this.totalBombs)
        {
            let rand = Math.floor(Math.random() * totalCells);
            if (!bombPositions.includes(rand)) {
                bombPositions.push(rand);
                this.board[Math.floor(rand / this.x)][rand % this.y].hasBomb = true;
            }
        }
    }

    pickCell(x, y) {
        
        this.board[y][x].revealed = true;
        if (this.board[y][x].hasBomb) {
            return "BOOOM!";
        }
        const comb = [0, -1, 1];
        const combCount = comb.length * comb.length;
        let sum = 0;
        for (let i = 1; i < combCount; ++i) {

            let yIndex = y + comb[Math.floor(i / comb.length)];
            let xIndex = x + comb[i % comb.length];
            if (!this.isCellReal(xIndex, yIndex)) {
                continue;
            }
            let neighboringCell = this.board[yIndex][xIndex];
            if (neighboringCell.hasBomb) {
                ++sum;
            }
        }
        this.board[y][x].value = sum;
        return sum;
    }

    markBomb(x, y) {

        this.board[y][x].value = "💣";
        this.foundBombs++;
    }

    isCellReal(x, y) {

        if (x < 0 || x >= this.x || y < 0 || y >= this.y) {
            return false;
        } else {
            return true;
        }
    }

}


let game = null;

let gameBoardContainer = document.querySelector(".board-container");
let gameBoard = document.querySelector(".board");
let gameBoardText = document.querySelector(".game > span");

let startButton = document.querySelector(".menu-content > button");
startButton.addEventListener("click", function() {

    let xSize = parseInt(document.getElementsByName("area-width")[0].value);
    let ySize = parseInt(document.getElementsByName("area-height")[0].value);
    let bombs = parseInt(document.getElementsByName("bomb-number")[0].value);
    game = new MinesweeperGame(xSize, ySize, bombs);
    if (gameBoardContainer.classList.contains("invisible")) {
        gameBoardText.classList.add("invisible");
        gameBoardContainer.classList.remove("invisible");
    }
    for (let i = 0; i < game.board.length; ++i) {

        let row = game.board[i];
        let rowDiv = document.createElement("div");
        gameBoard.appendChild(rowDiv);
        for (let j = 0; j < row.length; ++j) {

            let cell = row[j];
            let cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.textContent = "?";
            cellDiv.dataset.x = j;
            cellDiv.dataset.y = i;
            rowDiv.appendChild(cellDiv);

        }
        
    }
    gameBoard.addEventListener("click", function(e) {
        
        if (!e.target.classList.contains("cell")) {
            return;
        }
        let cell = e.target;
        let result = game.pickCell(parseInt(cell.dataset.x), parseInt(cell.dataset.y));
        if (result === "BOOOM!") {
            cell.classList.add("bomb");
            cell.textContent = "💣";
            return;
        }

        function revealNeighboars(centerCell) {

            let comb = [0, -1, 1];
            let combCount = comb.length * comb.length;
            for (let i = 1; i < combCount; ++i) {

                let yIndex = parseInt(centerCell.dataset.y) + comb[Math.floor(i / comb.length)];
                let xIndex = parseInt(centerCell.dataset.x) + comb[i % comb.length];
                if (!game.isCellReal(xIndex, yIndex)) {
                    continue;
                }
                let neighboringCell = gameBoard.children[yIndex].children[xIndex];
                if (neighboringCell.className != "cell") {
                    continue;
                }
                let result = game.pickCell(parseInt(neighboringCell.dataset.x), parseInt(neighboringCell.dataset.y));
                neighboringCell.classList.add("safely");
                if (result === 0) {
                    neighboringCell.textContent = "";
                    revealNeighboars(neighboringCell);
                } else {
                    neighboringCell.textContent = result;
                }  
            }
        }

        cell.classList.add("safely");
        if (result === 0) {
            cell.textContent = "";
            revealNeighboars(cell);
        } else {
            cell.textContent = result;
        }

    });
    closeMenu();
});
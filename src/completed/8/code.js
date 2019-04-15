
let menu = document.querySelector(".menu");
let menuButton = document.querySelector(".header > button");

document.addEventListener("keydown", function(e) {
    console.log(e);
    if (e.key === "Escape") {
        menu.classList.toggle("menu-hidden");
        menuButton.classList.toggle("is-active");
    }

});

let closeMenu = document.querySelector(".menu-close");
closeMenu.addEventListener("click", function() {
    menu.classList.add("menu-hidden");
    menuButton.classList.remove("is-active");
});

menuButton.addEventListener("click", function() {
    menu.classList.toggle("menu-hidden");
    menuButton.classList.toggle("is-active");
});


class MinesweeperGame {

    constructor(xSize, ySize, bombNumber) {

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
        do {

            let rand = Math.floor(Math.random() * totalCells);
            if (!bombPositions.includes(rand)) {
                bombPositions.push(rand);
                this.board[Math.floor(rand / this.x)][rand % this.y].hasBomb = true;
            }

        } while (bombPositions.length != this.totalBombs);
    }

    pickCell(x, y) {
        
        this.board[y][x].revealed = true;
        if (this.board[y][x].hasBomb) {
            return "BOOOM!";
        }
        const comb = [-1, 0, 1];
        const combCount = comb.length * comb.length;
        let sum = 0;
        for (let i = 0; i < combCount; ++i) {
            let neighboringCell = this.board[y + comb[Math.floor(i / comb.length)]][x + comb[i % comb.length]];
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


}


let game = null;

let gameBoard = document.querySelector(".board");

let startButton = document.querySelector(".menu-content > button");
startButton.addEventListener("click", function() {

    let xSize = parseInt(document.getElementsByName("area-width")[0].value);
    let ySize = parseInt(document.getElementsByName("area-height")[0].value);
    let bombs = parseInt(document.getElementsByName("bomb-number")[0].value);
    game = new MinesweeperGame(xSize, ySize, bombs);
    for (let row of game.board) {

        let rowDiv = document.createElement("div");
        gameBoard.appendChild(rowDiv);
        for (let cell of row) {

            let cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.textContent = "?";
            rowDiv.appendChild(cellDiv);

        }
        
    }
});
export const CellType = {
    Unknown: 1,
    Revealed: 2,
    Marked: 3
}

export class MinesweeperGame {

    constructor(xSize, ySize, bombNumber) {

        if (bombNumber > xSize * ySize) {
            bombNumber = 0;
        }
        this.x = xSize;
        this.y = ySize;
        this.totalBombs = bombNumber;
        this.markedBombs = 0;
        this.revealedCells = 0;
        this.isInit = false;
        this.onGameWin = null;

        this.board = new Array(this.y);
        for (let i = 0; i < this.board.length; ++i) {
            this.board[i] = new Array(this.x);
            for (let j = 0; j < this.board[i].length; ++j) {
                this.board[i][j] = {
                    x: j,
                    y: i,
                    hasBomb: false,
                    status: CellType.Unknown,
                    value: "?"
                };
            }
        }
    }

    * _neighbors(cellX, cellY) {

        const comb = [0, -1, 1];
        const combCount = comb.length * comb.length;
        for (let i = 1; i < combCount; ++i) {

            let xIndex = cellX + comb[i % comb.length];
            let yIndex = cellY + comb[Math.floor(i / comb.length)];
            if (this._isCellReal(xIndex, yIndex)) {
                yield this.board[yIndex][xIndex];
            }

        }
    }

    initialize(startX, startY) {

        let safeCells = [ this.board[startY][startX] ];
        let viewedCells = [ this.board[startY][startX] ];

        let generateSafeCells = (posX, posY, round) => {

            let safePropability = (round < 4 ? 100 - 30 * (round - 1) : 14 - round);
            let currentRoundSafeCells = [];
            for (let cell of this._neighbors(posX, posY)) {

                let rand = Math.random() * 100;
                if (!viewedCells.includes(cell)) {

                    viewedCells.push(cell);
                    if (rand <= safePropability) {

                        safeCells.push(cell);
                        currentRoundSafeCells.push(cell);
                    }
                }
            }
            for (let cell of currentRoundSafeCells) {
                generateSafeCells(cell.x, cell.y, round + 1);
            }
        };
        generateSafeCells(startX, startY, 1);

        let bombCells = [];
        const totalCells = this.x * this.y;

        while (bombCells.length != this.totalBombs) {
            let rand = Math.floor(Math.random() * totalCells);
            let randomCell = this.board[Math.floor(rand / this.x)][rand % this.x]
            if (!bombCells.includes(randomCell) &&
                (!safeCells.includes(randomCell) || bombCells.length + safeCells.length >= totalCells)) {
                bombCells.push(randomCell);
                randomCell.hasBomb = true;
            }
        }
        this.isInit = true;
    }

    _pickSingleCell(x, y) {

        let pickedCell = this.board[y][x];
        if (pickedCell.status !== CellType.Unknown) {
            return;
        }
        if (!this.isInit) {
            this.initialize(x, y);
        }
        pickedCell.status = CellType.Revealed;
        this.revealedCells++;
        if (pickedCell.hasBomb) {
            return "BOOOM!";
        }
        let sum = 0;
        for (let cell of this._neighbors(x, y)) {
            if (cell.hasBomb) {
                ++sum;
            }
        }
        pickedCell.value = sum;
        return sum;
    }

    pick(x, y) {

        let pickedCell = this.board[y][x];
        if (pickedCell.status !== CellType.Unknown) {
            return;
        }
        let result = this._pickSingleCell(x, y);
        if (result === "BOOOM!") {

            this.gemeover = true;
            return result;
        }
        
        let revealedCells = [ {x, y, value: result } ];
        let revealNeighboars = (centerX, centerY) => {

            for (let cell of this._neighbors(centerX, centerY)) {

                if (cell.status !== CellType.Unknown) {
                    continue;
                }
                let result = this._pickSingleCell(cell.x, cell.y);
                revealedCells.push({x: cell.x, y: cell.y, value: result });
                if (result === 0) {
                    revealNeighboars(cell.x, cell.y);
                }
            }
        };
        if (result === 0) {
            revealNeighboars(x, y);
        }
        // Game win
        if (this.markedBombs === this.totalBombs && this.revealedCells === this.x * this.y - this.totalBombs) {
            setTimeout(this.onGameWin, 0);
        }
        return revealedCells;
    }

    markBomb(x, y) {

        let pickedCell = this.board[y][x];
        if (pickedCell.status === CellType.Unknown) {

            pickedCell.status = CellType.Marked;
            this.markedBombs++;

        } else if (pickedCell.status === CellType.Marked) {

            pickedCell.status = CellType.Unknown;
            this.markedBombs--;
        }
        return pickedCell.status;
    }

    getCellStatus(x, y) {

        return this.board[y][x].status;
    }

    _isCellReal(x, y) {

        if (x < 0 || x >= this.x || y < 0 || y >= this.y) {
            return false;
        } else {
            return true;
        }
    }

}
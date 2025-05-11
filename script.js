// This is the TicTacToe Project! Let's make a console game first!!

// Step 1: Store the GameBoard as an array inside of a GameBoard Object
// Step 2: Check the board for available moves
// Step 3: Get next state of the board
// Step 4: Check if game is over and who won


function Board() {
    const rows = 3
    const cols = 3
    const board = []

    const getInitialState = () => {
        for (i = 0; i < rows; i++) {
            board.push([])
            for (j = 0; j < cols; j++) {
                board[i].push(" ")
            }
        }
        return board;
    }

    const getValidActions = (board) => {
        let validActions = []
        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                if (board[i][j] === " ") {
                    validActions.push(3 * i + j)
                }
            }
        }
        return validActions
    }

    const getNextState = (board, action, player) => {
        let tempBoard = deepCopy(board)
        if (player === "O") {
            tempBoard[~~(action / 3)][~~(action % 3)] = "O"
        }

        if (player === "X") {
            tempBoard[~~(action / 3)][~~(action % 3)] = "X"
        }

        return tempBoard
    }

    const getWinnerAndTerminated = (board) => {
        const allBoards = []
        const transposedBoard = transposeBoard(board)
        const diagonals = getDiags(board, 3)

        for (const element of board) {
            allBoards.push(element)
        }
        for (const element of transposedBoard) {
            allBoards.push(element)
        }
        for (const element of diagonals.leftToRight) {
            allBoards.push(element)
        }
        for (const element of diagonals.rightToLeft) {
            allBoards.push(element)
        }

        for (const element of allBoards) {
            if (checkWinner(element, "X")) {
                return {
                    winner: "X",
                    terminated: true,
                }
            }

            if (checkWinner(element, "O")) {
                return {
                    winner: "O",
                    terminated: true,
                }
            }
        }

        if (getValidActions(board).length === 0) {
            return {
                winner: "DRAW",
                terminated: true,
            }
        }

        return {
            winner: "NONE",
            terminated: false,
        }
    }

    const renderInConsole = (board) => {
        console.log("Current Board:")
        for (i = 0; i < rows; i++) {
            console.log(...board[i])
        }
    }

    return { getInitialState, getValidActions, getNextState, getWinnerAndTerminated, renderInConsole };
}

function checkWinner(board, player) {
    if (board.every((element) => element === player)) {
        return true
    }
    return false
}

function transposeBoard(board) {
    const rows = board.length
    const cols = board[0].length
    const transposedBoard = []
    for (let j = 0; j < cols; j++) {
        transposedBoard[j] = Array(rows)
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            transposedBoard[j][i] = board[i][j]
        }
    }
    return transposedBoard
}

function getDiags(board, size) {
    const rows = board.length
    const cols = board[0].length

    const diags = {
        leftToRight: [],
        rightToLeft: [],
    }

    for (let i = 0; i <= rows - size; i++) {
        for (let j = 0; j <= cols - size; j++) {
            const diag = []
            for (let s = 0; s < size; s++) {
                diag.push(board[i + s][j + s])
            }
            diags.leftToRight.push(diag)
        }
    }

    for (let i = 0; i <= rows - size; i++) {
        for (let j = size - 1; j < cols; j++) {
            const diag = []
            for (let s = 0; s < size; s++) {
                diag.push(board[i + s][j - s])
            }
            diags.rightToLeft.push(diag)
        }
    }
    return diags
}

function deepCopy(element) {
    return JSON.parse(JSON.stringify(element))
}

const game = Board()
let state = game.getInitialState()
let player = "X"
let validActions
let action
console.log(state)

while (true) {
    validActions = game.getValidActions(state)
    action = validActions[Math.floor(Math.random() * validActions.length)]
    state = game.getNextState(state, action, player)
    console.log(state)
    results = game.getWinnerAndTerminated(state)
    if (results.terminated === true) {
        console.log(`Winner is ${results.winner}`)
        break
    }
    player = player === "X" ? "O" : "X"
}
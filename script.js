// This is the TicTacToe Project! Let's make a console game first!!

// Step 1: Store the GameBoard as an array inside of a GameBoard Object
// Step 2: Check the board for available moves
// Step 3: Get next state of the board
// Step 4: Check whether the game is over and who is the winner
//  Step 4.1: Create a function that checks if all elements in a row are the same
//  Step 4.2: Create a function that transposes the board -> 
//              Check for cols becomes the same as check for rows
//  Step 4.3: Create a function that returns arrays representing the diagonals
// Step 5: Check if game loop works for console
// Step 6: The board and player values change dynamically instead of having to pass
//         them as arguments in functions every time.

function TicTacToe() {
    const rows = 3
    const cols = 3
    const board = []
    let player = "X"

    const getBoard = () => {
        return board
    }

    const getPlayer = () => {
        return player
    }

    const getInitialState = () => {
        for (i = 0; i < rows; i++) {
            board.push([])
            for (j = 0; j < cols; j++) {
                board[i].push(" ")
            }
        }
    }

    const getValidActions = () => {
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

    const changePlayer = () => {
        player = player === "X" ? "O" : "X"
    }

    const getNextState = (action, player) => {
        if (player === "O") {
            board[~~(action / 3)][~~(action % 3)] = "O"
        }

        if (player === "X") {
            board[~~(action / 3)][~~(action % 3)] = "X"
        }
    }

    const getWinnerAndTerminated = () => {
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

    return { getBoard, getPlayer, getInitialState, getValidActions, changePlayer, getNextState, getWinnerAndTerminated };
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

function captureSnapshot(board) {
    return JSON.parse(JSON.stringify(board))
}

// The Console Game runs fine! Now let's create the elements in the webpage!

// Step 1: Get the array representing the board and show it on the page
// Step 2: Each cell is represented by a button
// Step 3: Add click event, when the player presses a button the text content updates

boardContainer = document.querySelector(".board-container")

let game = TicTacToe()
game.getInitialState()

let board = game.getBoard()
let player = game.getPlayer()

const rows = board.length
const cols = board[0].length

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const button = document.createElement("button")
        button.setAttribute("class", "board-square")
        button.setAttribute("data-action", 3 * i + j)
        button.addEventListener("click", playFunction)
        boardContainer.appendChild(button)
    }
}

function playFunction(event) {
    if (event.target.textContent === "") {
        event.target.textContent = player
        action = event.target.dataset.action
        game.getNextState(action, player)
        game.changePlayer()
        player = game.getPlayer()
        results = game.getWinnerAndTerminated()
        let winner = results.winner
        let terminated = results.terminated
        if (terminated) {
            gameOverScreen(winner)
            return
        }
    }
}

function gameOverScreen(winner) {
    const textOne = document.createElement("p")
    const textTwo = document.createElement("p")

    textOne.setAttribute("class", "text one")
    textTwo.setAttribute("class", "text two")

    textOne.textContent = "Game Over"
    textTwo.textContent = `Winner: ${winner}`

    boardContainer.textContent = ""
    boardContainer.appendChild(textOne)
    boardContainer.appendChild(textTwo)
}




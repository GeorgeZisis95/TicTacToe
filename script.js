// This is the TicTacToe Project! Let's make a console game first!!

// Step 1: Store the GameBoard as an array inside of a GameBoard Object
// Step 2: Check the board for available moves
// Step 3: Get next state of the board

function Board() {
    const rows = 3;
    const cols = 3;
    const board = [];

    const getInitialState = () => {
        for (i = 0; i < rows; i++) {
            board.push([]);
            for (j = 0; j < cols; j++) {
                board[i].push(0);
            }
        }
        return board;
    }

    const getValidActions = (board) => {
        let validActions = []
        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                if (board[i][j] === 0) {
                    validActions.push(3 * i + j)
                }
            }
        }
        return validActions
    }

    const getNextState = (board, action, player) => {
        if (player === -1) {
            board[~~(action / 3)][~~(action % 3)] = "O";
        }

        if (player === 1) {
            board[~~(action / 3)][~~(action % 3)] = "X";
        }
    }

    const renderInConsole = (board) => {
        console.log("Current Board:")
        for (i = 0; i < rows; i++) {
            console.log(...board[i])
        }
    }

    return { getInitialState, getValidActions, getNextState, renderInConsole };
}

let theBoard = Board();
startingBoard = theBoard.getInitialState();
theBoard.getNextState(startingBoard, 1, 1);
theBoard.getNextState(startingBoard, 2, -1);
theBoard.renderInConsole(startingBoard);
console.log(theBoard.getValidActions(startingBoard))

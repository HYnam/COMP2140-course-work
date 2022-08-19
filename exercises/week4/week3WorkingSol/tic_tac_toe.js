/**
 * Resets the game for when the app runs & repeats
 */
function main() {

    // Import Node.js dependencies

    const prompt = require("prompt-sync")({
        sigint: true
    });
    const fs = require("fs");
    
    // Global variables
    
    const empty = " ";
    const boardLength = 3;
    const playerOne = "X";
    const playerTwo = "O";
    
    let playerOnesTurn;
    let board;
    let winner;
    
    // Messages
    
    let invalidInput = "Wrong input. Please try again.";
    let outOfBounds = "Position out of bounds. Please try again.";
    let positionFilled = "Position already filled. Please try again.";
    let drawMessage = "The game ended in a draw.";
    let replayPrompt = "Do you wish to play again?";
    let movePrompt = (sym) => `Player ${sym}, please enter the index of your next move: `;
    let winMessage = (player) => `\nPlayer ${player} has won the game.`;
    
    // Winning trios
    
    let winningTrios = new Array(
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    );
    
    /**
     * This function will print out the board game into the console.
     * @param {array} board - An array containing the values for each position on the board.
     * @param {number} padding - How many spaces should appear either side of the values.
     */
    function printGameBoard(board, padding = 1) {
        let horizontalDivider = "-".repeat((boardLength * (2 * padding + 1) + 2));
        for (let rowIndex = 0; rowIndex < boardLength; rowIndex++) {
            if (rowIndex != 0) {
                console.log(horizontalDivider);
            }
            let start = rowIndex * boardLength;
            let row = board.slice(start, start + boardLength);
            row = row.map(value => empty.repeat(padding) + value + empty.repeat(padding));
            console.log(row.join("|"));
        }
        console.log(" ");
    }
    
    /**
     * Resets the game to a valid starting state.
     */
    function resetGame() {
        playerOnesTurn = true;
        board = Array.from(Array(boardLength ** 2), () => " ");
        winner = null;
    }
    
    /**
     * Runs the game.
     */
    function game() {
        
        play();
        
        /**
         * Identify which player is currently playing.
         * @returns Get the string corresponding to the player whose turn it is.
         */
        function getCurrentPlayer() {
            if (playerOnesTurn) {
                return playerOne;
            }
            return playerTwo;
        }
        
        /**
         * To check if there is any winner from the current state of the gameboard.
         * @returns true if there is a winner.
         */
        function checkWin() {
            // Get all player owned indices
            let positions = board.map((value, index) => {
                if (value == getCurrentPlayer()) {
                    return index;
                }
            });
            
            // Check if the player is at all indicies in a winning trio
            return winningTrios.some((winningTrio) => winningTrio.every(value => positions.includes(value)));
        }
        
        /**
         * Plays a Tic Tac Toe game through to completion.
         */
        function play() {
            while (!isOver()) {
                printGameBoard(board);
                
                // Prompt the next player for a move
                let index = getNextMove();
        
                // Perform out of bounds checks
                if (!(0 <= index < boardLength ** 2)) {
                    console.log(outOfBounds);
                    continue;
                }
                
                // Check if position already filled
                if (board[index] != empty) {
                    console.log(positionFilled);
                    continue;
                }
                // Enact the move on the board
                board[index] = getCurrentPlayer();
        
                // Check for end game conditions
                if (checkWin()) {
                    winner = getCurrentPlayer();
                    return;
                }
        
                // Flip the turn
                playerOnesTurn = !playerOnesTurn;
            }
        }
        
        /**
         * Repeatedly prompts the user for their next move until they give a
         * numerical index, which it returns.
         * Doesn't perform out of bounds validity checks on the supplied index.
         * @returns user input move.
         */
        function getNextMove() {
            let move, userIn;
            while (true) {
                userIn = prompt(movePrompt(getCurrentPlayer()));
                move = Number(userIn);
        
                // Check validity and return the move if true
                if (isNaN(move) || move < 0 || move > 8) {
                    console.log(invalidInput);
                    continue;
                }
                return move;
            }
        }
        
        /**
         * To check if all the grid has been filled and no winner is presence.
         * @returns true if no winner and all the available index is filled by users.
         */
        function hasDrawn() {
            return board.every(_ => !board.includes(empty));
        }
        
        /**
         * Check if the game is over
         * @returns Returns true if the game is over.
         */
        function isOver() {
            return hasDrawn() || winner !== null;
        }
        
        /**
         * Prints winning or drawing info after the game has completed.
         */
        function displayWinnerInfo() {
            if (winner === null) {
                console.log(drawMessage);
            } else {
                console.log(winMessage(winner));
            }
        }
        
        /**
         * Saves & appends the winner to a TXT file.
         */
        function saveWinnerInfo() {
            if (winner !== null) {
                let fileName = "winners.txt";
                fs.appendFile(fileName, `${winner}\n`, error => console.log(error ? error : "Winner successfully saved to winners.txt."));
            }
        }
        
        displayWinnerInfo();
        saveWinnerInfo();
        
    }
        
    while (true) {
        resetGame();
        game();
        // Ask user if they want to play again
        if (prompt(replayPrompt) != "y") {
            break;
        }
        resetGame();
    }
}

main();
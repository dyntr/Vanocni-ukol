let board;
let currentPlayer;
let winCondition;
let difficulty;

function createBoard(size) {
    currentPlayer = 'X';
    board = Array(size).fill().map(() => Array(size).fill(null));
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    gameBoard.style.display = 'grid';
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 60px)`;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', function() {
                if (board[i][j] === null && !isGameOver()) {
                    board[i][j] = currentPlayer;
                    this.innerText = currentPlayer;
                    this.classList.add('used');
                    if (checkWin(i, j)) {
                        showModal(currentPlayer + ' wins!');
                    } else if (isBoardFull()) {
                        showModal('Draw!');
                    }
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updatePlayerTurn();
                }
            });
            gameBoard.appendChild(cell);
        }
    }
    updatePlayerTurn();
}

function updatePlayerTurn() {
    const playerTurn = document.getElementById('playerTurn');
    playerTurn.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(x, y) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    const neededToWin = winCondition - 1;

    for (let [dx, dy] of directions) {
        let count = 1;

        for (let j = 1; j <= neededToWin; j++) {
            if (x + dx * j < board.length && x + dx * j >= 0 && y + dy * j < board.length && y + dy * j >= 0 && board[x + dx * j][y + dy * j] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        for (let j = 1; j <= neededToWin; j++) {
            if (x - dx * j < board.length && x - dx * j >= 0 && y - dy * j < board.length && y - dy * j >= 0 && board[x - dx * j][y - dy * j] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        if (count >= winCondition) {
            return true;
        }
    }
    
    return false;
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell !== null));
}

function isGameOver() {
    return isBoardFull();
}

function showModal(result) {
    const modal = document.getElementById("modal");
    const resultText = document.getElementById("resultText");
    resultText.innerText = result;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    switch (difficulty) {
        case 'easy':
            createBoard(3);
            winCondition = 3;
            break;
        case 'medium':
            createBoard(7);
            winCondition = 4;
            break;
        case 'hard':
            createBoard(20);
            winCondition = 5;
            break;
    }
    document.getElementById('gameBoard').style.display = 'grid';
}

function restartGame() {
    closeModal();
    startGame(difficulty);
}

window.onload = () => startGame('easy');

// Function to create and show the falling raindrop animation
function showFallingRaindrops() {
    const raindropContainer = document.createElement("div");
    raindropContainer.id = "raindrop-container";

    for (let i = 0; i < 70; i++) {
        const raindrop = document.createElement("div");
        raindrop.classList.add("raindrop");
        raindrop.style.left = `${Math.random() * 100}%`;
        raindrop.style.animationDelay = `${Math.random() * 2}s`;
        raindropContainer.appendChild(raindrop);
    }

    document.body.appendChild(raindropContainer);

    setTimeout(() => {
        // Remove the raindrop container after a certain duration
        const container = document.getElementById("raindrop-container");
        if (container) {
            container.remove();
        }
    }, 5000); // Adjust the duration as needed (in milliseconds)
}

// Function to show the winning message and initiate the raindrop animation
function showWinningMessage() {
    const modal = document.getElementById("modal");
    const resultText = document.getElementById("resultText");
    resultText.innerText = currentPlayer + " wins!";
    modal.style.display = "block";

    showFallingRaindrops(); // Show the raindrop animation
}

// Modify your checkWin function to show the winning message and animation
function checkWin(x, y) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    const neededToWin = winCondition - 1;

    for (let [dx, dy] of directions) {
        let count = 1;

        for (let j = 1; j <= neededToWin; j++) {
            if (x + dx * j < board.length && x + dx * j >= 0 && y + dy * j < board.length && y + dy * j >= 0 && board[x + dx * j][y + dy * j] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        for (let j = 1; j <= neededToWin; j++) {
            if (x - dx * j < board.length && x - dx * j >= 0 && y - dy * j < board.length && y - dy * j >= 0 && board[x - dx * j][y - dy * j] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        if (count >= winCondition) {
            showModal(currentPlayer + ' wins!');
            showWinningMessage(); // Show the winning message and animation
            return true;
        }
    }
    
    return false;
}

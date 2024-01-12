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
            createBoard(12);
            winCondition = 5;
            break;
    }
    document.getElementById('gameBoard').style.display = 'grid'; // Zajistěte, že herní pole se zobrazí
}

function restartGame() {
    closeModal();
    startGame(difficulty);
}

window.onload = () => startGame('easy');

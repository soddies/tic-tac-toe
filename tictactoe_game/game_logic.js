document.addEventListener('DOMContentLoaded', () => {
    const playerCount = localStorage.getItem('playerCount1');
    const difficulty = localStorage.getItem('difficulty');

    const player1 = localStorage.getItem('playerName1') || 'Player 1';
    const player2 = localStorage.getItem('playerName2') || 'Player 2';
    const role1 = localStorage.getItem('playerRole1') || 'X';
    const role2 = localStorage.getItem('playerRole2') || 'O';

    const play_one = localStorage.getItem('playerNames') || 'Player';
    const playerRole = localStorage.getItem('playerRole') || 'X';
    const computerRole = playerRole === 'X' ? 'O' : 'X';

    const size = localStorage.getItem('size');
    const fieldSize = size === "2" ? 5 : 3;

    const playerDisplay = document.getElementById('player-names');

    if (playerCount === '1') {
        playerDisplay.textContent = `${play_one} (${playerRole}) VS Computer (${computerRole})`;
        createBoard(fieldSize, playerRole);
    } else {
        playerDisplay.textContent = `${player1} (${role1}) VS ${player2} (${role2})`;
        createBoardTwoPlayers(fieldSize, role1, role2);
    }

    document.getElementById('restart-button').addEventListener('click', () => {
        location.reload();
    });

    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function createBoard(field, playerRole) {
    const difficulty = localStorage.getItem('difficulty');
    const board = document.getElementById('game-board');
    const currentPlayer = document.getElementById('current-player');
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.style.display = 'none';

    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${field}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${field}, 1fr)`;

    let currentPlayerRole = playerRole;
    let gameEnded = false;
    const computerRole = playerRole === 'X' ? 'O' : 'X';

    currentPlayer.textContent = `Current player: ${currentPlayerRole}`;

    const totalCells = field * field;
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        cell.addEventListener('click', () => {
            if (cell.textContent !== '' || gameEnded || currentPlayerRole !== playerRole) return;

            cell.textContent = currentPlayerRole;
            const cells = document.querySelectorAll('.cell');

            if (checkWinAndHighlight(cells, field, currentPlayerRole)) {
                gameEnded = true;
                currentPlayer.textContent = `${currentPlayerRole} wins!`;
                return;
            } else if (isDraw(cells)) {
                gameEnded = true;
                currentPlayer.textContent = `Draw!`;
                return;
            }

            currentPlayerRole = computerRole;
            currentPlayer.textContent = `Current player: ${currentPlayerRole}`;

            setTimeout(() => {
                if (difficulty === "2") {
                    makeComputerMoveHard(playerRole, computerRole);
                } else {
                    makeComputerMoveEasy(computerRole);
                }

                const cells = document.querySelectorAll('.cell');
                if (checkWinAndHighlight(cells, field, computerRole)) {
                    gameEnded = true;
                    currentPlayer.textContent = `${computerRole} wins!`;
                    return;
                } else if (isDraw(cells)) {
                    gameEnded = true;
                    currentPlayer.textContent = `Draw!`;
                    return;
                }

                currentPlayerRole = playerRole;
                currentPlayer.textContent = `Current player: ${currentPlayerRole}`;
            }, 300);
        });

        board.appendChild(cell);
    }
}

function createBoardTwoPlayers(field, role1, role2) {
    const difficulty = localStorage.getItem('difficulty');
    const board = document.getElementById('game-board');
    const currentPlayer = document.getElementById('current-player');
    const timerDisplay = document.getElementById('timer-display');

    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${field}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${field}, 1fr)`;

    if (difficulty !== "2") timerDisplay.style.display = 'none';
    else timerDisplay.style.display = 'block';

    let currentPlayerRole = role1;
    let currentTimeout;
    let moveAllowed = true;
    let gameEnded = false;

    currentPlayer.textContent = `Current player: ${currentPlayerRole}`;

    const totalCells = field * field;
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        cell.addEventListener('click', () => {
            if (!moveAllowed || cell.textContent !== '' || gameEnded) return;

            cell.textContent = currentPlayerRole;
            clearInterval(currentTimeout);

            const cells = document.querySelectorAll('.cell');
            if (checkWinAndHighlight(cells, field, currentPlayerRole)) {
                gameEnded = true;
                currentPlayer.textContent = `${currentPlayerRole} wins!`;
                return;
            } else if (isDraw(cells)) {
                gameEnded = true;
                currentPlayer.textContent = `Draw!`;
                return;
            }

            startNextTurn();
        });

        board.appendChild(cell);
    }

    if (difficulty === "2") startTurnWithTimer();

    function startTurnWithTimer() {
        moveAllowed = true;
        let timeLeft = 10;
        timerDisplay.textContent = `⏳ ${timeLeft}s`;

        currentTimeout = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `⏳ ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(currentTimeout);
                timerDisplay.textContent = `"${currentPlayerRole}" missed their turn!`;
                startNextTurn();
            }
        }, 1000);
    }

    function startNextTurn() {
        moveAllowed = false;
        currentPlayerRole = currentPlayerRole === role1 ? role2 : role1;
        currentPlayer.textContent = `Current player: ${currentPlayerRole}`;
        if (difficulty === "2") {
            setTimeout(() => startTurnWithTimer(), 500);
        } else {
            moveAllowed = true;
        }
    }
}

function isDraw(cells) {
    return [...cells].every(cell => cell.textContent !== '');
}

function checkWinAndHighlight(cells, size, role) {
    const winLength = size === 5 ? 4 : 3;

    const get = (r, c) =>
        r >= 0 && r < size && c >= 0 && c < size
            ? cells[r * size + c].textContent
            : null;

    const highlight = (indices) => {
        for (const i of indices) {
            cells[i].style.backgroundColor = "#4caf50";
            cells[i].style.color = "white";
        }
    };

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            let idx = r * size + c;
            if (get(r, c) !== role) continue;

            let dirs = [
                { dr: 0, dc: 1 },  // →
                { dr: 1, dc: 0 },  // ↓
                { dr: 1, dc: 1 },  // ↘
                { dr: 1, dc: -1 }, // ↙
            ];

            for (let { dr, dc } of dirs) {
                let line = [idx];
                let win = true;
                for (let i = 1; i < winLength; i++) {
                    let nr = r + dr * i;
                    let nc = c + dc * i;
                    if (get(nr, nc) === role) {
                        line.push(nr * size + nc);
                    } else {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    highlight(line);
                    return true;
                }
            }
        }
    }
    return false;
}

function checkWin(cells, size, role) {
    const winLength = size === 5 ? 4 : 3;

    const get = (r, c) =>
        r >= 0 && r < size && c >= 0 && c < size
            ? cells[r * size + c].textContent
            : null;

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (get(r, c) !== role) continue;

            const dirs = [
                { dr: 0, dc: 1 },
                { dr: 1, dc: 0 },
                { dr: 1, dc: 1 },
                { dr: 1, dc: -1 },
            ];

            for (let { dr, dc } of dirs) {
                let win = true;
                for (let i = 1; i < winLength; i++) {
                    const nr = r + dr * i;
                    const nc = c + dc * i;
                    if (get(nr, nc) !== role) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }
        }
    }
    return false;
}

function makeComputerMoveEasy(computerRole) {
    const board = document.getElementById('game-board');
    const cells = Array.from(board.querySelectorAll('.cell'));
    const emptyCells = cells.filter(cell => cell.textContent === '');
    if (emptyCells.length === 0) return;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = computerRole;
}

function makeComputerMoveHard(playerRole, computerRole) {
    const board = document.getElementById('game-board');
    const cells = Array.from(board.querySelectorAll('.cell'));
    const size = Math.sqrt(cells.length);

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            cells[i].textContent = computerRole;
            if (checkWin(cells, size, computerRole)) return;
            cells[i].textContent = '';
        }
    }

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            cells[i].textContent = playerRole;
            if (checkWin(cells, size, playerRole)) {
                cells[i].textContent = computerRole;
                return;
            }
            cells[i].textContent = '';
        }
    }

    makeComputerMoveEasy(computerRole);
}

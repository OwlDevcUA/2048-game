const Game = require('../modules/Game.class');
const game = new Game();

const gameField = document.querySelector('.game-field');
const rows = Array.from(gameField.rows);
const cells = rows.map((row) => Array.from(row.cells)).flat();
const scoreTab = document.querySelector('.game-score');
const winMessage = document.querySelector('.message.message-win.hidden');
const loveMessage = document.querySelector('.message.message-lose.hidden')

const updateScore = () => {
  game.getScore(cells);

  scoreTab.innerText = game.score;
};

const checkForWin = () => {
  if (scoreTab.innerText === '2048') {
    winMessage.classList.remove('hidden');
  }
};

document.addEventListener('click', (e) => {
  const start = e.target.closest('.button.start');
  const restart = e.target.closest('.button.restart');

  if (start) {
    start.classList.remove('start');
    start.classList.add('restart');
    start.innerText = 'Restart';
    game.start();
    game.updateBoard(rows);

    updateScore();
    addColors();
  }

  if (restart) {
    restart.classList.remove('restart');
    restart.classList.add('start');
    restart.innerText = 'Start';

    game.restart();
    game.updateBoard(rows);
    updateScore();
    addColors();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    game.moveVertically(true, false);
    game.combineVertically(true, false);
    game.moveVertically(true, false);
    game.generate();
    game.updateBoard(rows);
    updateScore();
    addColors();
    checkForWin();
  }

  if (e.key === 'ArrowDown') {
    game.moveVertically(false, true);
    game.combineVertically(false, true);
    game.moveVertically(false, true);
    game.generate();
    game.updateBoard(rows);
    updateScore();
    addColors();
    checkForWin();
  }

  if (e.key === 'ArrowLeft') {
    game.moveHorizontally(true, false);
    game.combineHorizontally(true, false);
    game.moveHorizontally(true, false);
    game.generate();
    game.updateBoard(rows);
    updateScore();
    addColors();
    checkForWin();
  }

  if (e.key === 'ArrowRight') {
    game.moveHorizontally(false, true);
    game.combineHorizontally(false, true);
    game.moveHorizontally(false, true);
    game.generate();
    game.updateBoard(rows);
    updateScore();
    addColors();
    checkForWin();
  }
});

function addColors() {
  for (let i = 0; i < cells.length; i++) {
    for (const className of cells[i].classList) {
      if (className.startsWith('field-cell--')) {
        cells[i].classList.remove(className);
      }
    }

    if (parseInt(cells[i].innerText) > 0) {
      cells[i].classList.add(`field-cell--${parseInt(cells[i].innerText)}`);
    }
  }
}

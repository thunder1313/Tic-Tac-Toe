let turn = "X";
// to each field assign one number from 1-9 so that it creates magic number
// player won if any three fields he has put his sign on sum up to 15
const magicNumbers = [[8, 1, 6], [3, 5, 7], [4, 9, 2]];
let xNumbers = [];
let oNumbers = [];
let turnCounter = 0;

const board = document.querySelector(".board");
const tiles = Array.from(document.querySelectorAll(".tile"));

board.addEventListener("click", ({ target }) => {
const classes = Array.from(target.classList);
if (classes.includes("tile") && classes.length !== 1) return;
const idx = tiles.indexOf(target);

turnCounter++;
target.classList.add(`tile-${turn.toLowerCase()}`);
let x = Math.floor(idx / 3);
let y = idx % 3;
console.log(x, y);
turn === "X" ? xNumbers.push(magicNumbers[x][y]) : oNumbers.push(magicNumbers[x][y]);
// you can win only after 5 moves has been played
if (turnCounter > 4) {
    if (turn === 'X') {
        if(checkWin(xNumbers)) {
            // you have to wait 10 miliseconds because browser needs time to repaint
            setTimeout(() => alert("X wins!"), 10);
            setTimeout(() => reset(), 10);
        }
    }
    else {
        if(checkWin(oNumbers)){
            // you have to wait 10 miliseconds because browser needs time to repaint
            setTimeout(() => alert("O wins!"), 10);
            setTimeout(() => reset(), 10);
        }
    }
  }
  turn = turn === "X" ? "O" : "X";
  displayTurn(turn);
});

function displayTurn(turn) {
  document.querySelector('.turn').textContent = `${turn} turn`
}

function checkWin(numbers) {
  // 2. sprawdź czy któryś z graczy wygrał pojedynek - jeśli tak wyświetla komunikat (możesz użyć np. funkcji "alert(...)")
    const length = numbers.length;
    // search for 3 numbers that sum to 15; if they do, player won
    for (let i = 0; i <= length-3; i++) {
        for (let j = i+1; j <= length-2; j++) {
            for (let k = j+1; k <= length-1; k++) {
                if (numbers[i] + numbers[j] + numbers[k] === 15) {
                    console.log(numbers[i], numbers[j], numbers[k]);
                    return true;
                }
            }
        }
    }
    return false;
}


const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', reset);
function reset() {
  tiles.forEach(element => {
    element.classList.remove('tile-x');
    element.classList.remove('tile-o');
  })
  turn = 'X';
  xNumbers = [];
  oNumbers = [];
  turnCounter = 0;
  displayTurn(turn);
}
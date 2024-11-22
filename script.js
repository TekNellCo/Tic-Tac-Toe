let nameInputBtn = document.querySelectorAll('.submit');
let gameBox = document.querySelectorAll('.grid');
let gameGrid = document.querySelectorAll('.grid');
let currentMarker = '';
let winningBanner = document.querySelector('.winningBanner');
let winnerText = document.querySelector('.winner');
let playerOneHeader = document.querySelector('.playerOneHeader');
let playerTwoHeader = document.querySelector('.playerTwoHeader');
let nameInputs = document.querySelectorAll('.input');
let object = {
  a: ['e', 'e', 'e'],
  b: ['e', 'e', 'e'],
  c: ['e', 'e', 'e'],
};
let playerOne = '';
let playerTwo = '';

///when clicked submits the button data value to input pull
nameInputBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    inputPull(button.dataset.player);
  });
});

function inputPull(buttonData) {
  ///takes the button data value and compares it to input value, if they match, pushes the info to object maker
  nameInputs.forEach((input) => {
    if (
      buttonData === '1' &&
      input.dataset.player === '1' &&
      input.value !== ''
    ) {
      playerOne = objectMaker(input.value, 'X');
      playerOneHeader.textContent = input.value; ////inputs player one name h1 title
    } else if (
      buttonData === '2' &&
      input.dataset.player === '2' &&
      input.value !== ''
    ) {
      playerTwo = objectMaker(input.value, 'O');
      playerTwoHeader.textContent = input.value; ////inputs player two name h1 title
    }
    /////checks if both players have values then runs gameboard creator function
    if (playerOne !== '' && playerTwo !== '') {
      gameBoardCreator();
    }
  });
}

////creates player objects using name and marker
function objectMaker(name, marker) {
  return {
    name,
    marker,
  };
}
/////when activated displays the grid
function gameBoardCreator() {
  gameGrid.forEach((grid) => {
    grid.style.cssText = 'display :inherit';
  });
}

gameBox.forEach((grid) => {
  ///adds event listeners on each square,
  grid.addEventListener('click', () => {
    let row = grid.dataset.row;
    let column = grid.dataset.column;
    ///if clicked they evauluate which marker's turn it is to go then switch to current player
    if (currentMarker === '' || currentMarker === playerTwo.marker) {
      currentMarker = playerOne.marker;
      /////   pushes the current player info along with current grid spot info
      gridMark(playerOne, grid); ///into dom manipulator function
      gameLogic(row, column, playerOne.marker); ////and logic manipulator function
    } else if (currentMarker === playerOne.marker) {
      currentMarker = playerTwo.marker;
      gridMark(playerTwo, grid);
      gameLogic(row, column, playerTwo.marker);
    }
  });
});

////checks if the visual grid square is empty then pushes current players marker in it
function gridMark(player, grid) {
  if (grid.textContent === '') {
    grid.textContent = player.marker;
  } else if (currentMarker === playerOne.marker) {
    currentMarker = playerTwo.marker;
  } else if (currentMarker === playerTwo.marker) {
    currentMarker = playerOne.marker;
  }
}

///checks is the object array spot is already filled with another players marker,if not it marks it
function gameLogic(row, column, marker) {
  if (object[row][column] === 'X' || object[row][column] === 'O') return;
  else object[row][column] = marker;
  checkWinner(); ///checks if there is a winnner after each turn
}

///checks for winning conditions each turn
function checkWinner() {
  if (
    object.a[0] !== 'e' &&
    object.a[0] === object.a[1] &&
    object.a[1] === object.a[2]
  ) {
    winnerAnnounce(object.a[0]);
  } else if (
    object.a[0] !== 'e' &&
    object.a[0] === object.b[1] &&
    object.b[1] === object.c[2]
  ) {
    winnerAnnounce(object.a[0]);
  } else if (
    object.a[0] !== 'e' &&
    object.a[0] === object.b[0] &&
    object.b[0] === object.c[0]
  ) {
    winnerAnnounce(object.a[0]);
  } else if (
    object.a[1] !== 'e' &&
    object.a[1] === object.b[1] &&
    object.b[1] === object.c[1]
  ) {
    winnerAnnounce(object.a[1]);
  } else if (
    object.a[2] !== 'e' &&
    object.a[2] === object.b[2] &&
    object.b[2] === object.c[2]
  ) {
    winnerAnnounce(object.a[2]);
  } else if (
    object.b[0] !== 'e' &&
    object.b[0] === object.b[1] &&
    object.b[1] === object.c[2]
  ) {
    winnerAnnounce(object.b[0]);
  } else if (
    object.c[0] !== 'e' &&
    object.c[0] === object.c[1] &&
    object.c[1] === object.c[2]
  ) {
    winnerAnnounce(object.c[0]);
  } else if (
    object.c[0] !== 'e' &&
    object.c[0] === object.b[1] &&
    object.b[1] === object.a[2]
  ) {
    winnerAnnounce(object.c[0]);
  }
}

///if there is a winner this matches the marker with the players marker and announces players name
function winnerAnnounce(marker) {
  let winner;
  winningBanner.style.cssText = 'display:flex';
  if (marker === 'X') {
    winner = playerOne.name;
  } else if (marker === 'O') {
    winner = playerTwo.name;
  }
  winnerText.textContent = `${winner} won!`;
}

////clears all marks and data except the player objects and hides the popup modal
function resetGame() {
  object = {
    a: ['e', 'e', 'e'],
    b: ['e', 'e', 'e'],
    c: ['e', 'e', 'e'],
  };
  currentMarker = '';
  winningBanner.style.cssText = 'display:hidden';
  gameGrid.forEach((grid) => {
    grid.textContent = '';
  });
}

////clears all the data completelty
function newGame() {
  playerOneHeader.textContent = 'Player 1';
  playerTwoHeader.textContent = 'Player 2';
  playerOne = '';
  playerTwo = '';
  nameInputs.forEach((name) => {
    name.value = '';
  });
  resetGame();
}

////new game button selectors for resetting game
document.querySelectorAll('.newGame').forEach((button) => {
  button.addEventListener('click', () => {
    resetGame();
    gameBoardCreator();
  });
});

///new player button that resets all the data
document.querySelectorAll('.newPlayers').forEach((button) => {
  button.addEventListener('click', () => {
    newGame();
  });
});



function sumRange(n){
  if(x ===1)
    return 1;
  else 
    return 6 + sumRange(n - 1)
}
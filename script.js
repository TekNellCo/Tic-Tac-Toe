let nameInputs = document.querySelectorAll('.input');
let gameBox = document.querySelectorAll('.grid');
let currentMarker = '';
let object = {
  a: ['e', 'e', 'e'],
  b: ['e', 'e', 'e'],
  c: ['e', 'e', 'e'],
};
let playerOne = '';
let playerTwo = '';
let players;

nameInputs.forEach((input) => {
  input.addEventListener('click', () => {
    if (input.dataset.player === '1') {
      playerOne = objectMaker(input.value, 'X');
    }
    if (input.dataset.player === '2') {
      playerTwo = objectMaker(input.value, 'O');
    }

    if (playerOne !== '' && playerTwo !== '') {
      gameBoard();
    }
  });
});

function objectMaker(name, marker) {
  return {
    name,
    marker,
  };
}

function gameBoard() {
  console.log('ready');
  console.log(playerOne.name);
}

gameBox.forEach((grid) => {
  grid.addEventListener('click', () => {
    let row = grid.dataset.row;
    let column = grid.dataset.column;
    if (currentMarker === '' || currentMarker === playerTwo.marker) {
      currentMarker = playerOne.marker;
      gridMark(playerOne, grid);
      gameLogic(row, column, playerOne.marker);
    } else if (currentMarker === playerOne.marker) {
      currentMarker = playerTwo.marker;
      gridMark(playerTwo, grid);
      gameLogic(row, column, playerTwo.marker);
    }
  });
});

function gridMark(player, grid) {
  if (grid.textContent === '') {
    grid.textContent = player.marker;
  } else if (currentMarker === playerOne.marker) {
    currentMarker = playerTwo.marker;
  } else if (currentMarker === playerTwo.marker) {
    currentMarker = playerOne.marker;
  }
}

function gameLogic(row, column, marker) {
  if (object[row][column] === 'X' || object[row][column] === 'O') {
    console.log('Row Taken');
    console.log(object);
  } else {
    object[row][column] = marker;
    checkWinner();
  }
}

function checkWinner() {
  if (
    object.a[0] !== 'e' &&
    object.a[0] === object.a[1] &&
    object.a[1] === object.a[2]
  ) {
    console.log('winner');
  } else if (
    object.a[0] !== 'e' &&
    object.a[0] === object.b[1] &&
    object.b[1] === object.c[2]
  ) {
    console.log('winner');
  } else if (
    object.a[0] !== 'e' &&
    object.a[0] === object.b[0] &&
    object.b[0] === object.c[0]
  ) {
    console.log('winner');
  } else if (
    object.a[1] !== 'e' &&
    object.a[1] === object.b[1] &&
    object.b[1] === object.c[1]
  ) {
    console.log('winner');
  } else if (
    object.a[2] !== 'e' &&
    object.a[2] === object.b[2] &&
    object.b[2] === object.c[2]
  ) {
    console.log('winner');
  } else if (
    object.b[0] !== 'e' &&
    object.b[0] === object.b[1] &&
    object.b[1] === object.c[2]
  ) {
    console.log('winner');
  } else if (
    object.c[0] !== 'e' &&
    object.c[0] === object.c[1] &&
    object.c[1] === object.c[2]
  ) {
    console.log('winner');
  } else if (
    object.c[0] !== 'e' &&
    object.c[0] === object.b[1] &&
    object.b[1] === object.a[2]
  ) {
    console.log('winner');
  }
}

// Calculate best move in a connect 4 game with a board mapped with 0=empty 1=player1 2=player2 with width and height using minimax algorithm for a current player
export function calculateBestMove(board: i32[], width: i32, height: i32): i32 {
  let bestMove = -1;
  let bestScore = -1;
  for (let i = 0; i < width*height; i++) {
    if (board[i] === 0) {
      board[i] = 1;
      const score = minimax(board, width, height, false);
      board[i] = 0;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board: i32[], width: i32, height: i32, isMaximizing: bool): i32 {
  let score = checkWinner(board, width, height);
  if (score !== 0) {
    return score;
  }
  if (isBoardFull(board, width, height)) {
    return 0;
  }
  if (isMaximizing) {
    let bestScore = -1;
    for (let i = 0; i < width*height; i++) {
      if (board[i] === 0) {
        board[i] = 1;
        score = minimax(board, width, height, false);
        board[i] = 0;
        bestScore = max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    let bestScore = 1;
    for (let i = 0; i < width*height; i++) {
      if (board[i] === 0) {
        board[i] = 2;
        score = minimax(board, width, height, true);
        board[i] = 0;
        bestScore = min(bestScore, score);
      }
    }
    return bestScore;
  }
}

function isBoardFull(board: i32[], width: i32, height: i32): bool {
  for (let i = 0; i < width * height; i++) {
    if (board[i] === 0) {
      return false;
    }
  }
  return true;
}

const winningPatterns = [
  [1, 1, 1, 1,
   0, 0, 0, 0,
   0, 0, 0, 0,
   0, 0, 0, 0],
  [1, 0, 0, 0,
   1, 0, 0, 0,
   1, 0, 0, 0,
   1, 0, 0, 0],
  [1, 0, 0, 0,
   0, 1, 0, 0,
   0, 0, 1, 0,
   0, 0, 0, 1],
  [0, 0, 0, 1,
   0, 0, 1, 0,
   0, 1, 0, 0,
   1, 0, 0, 0],
];


/**
 * Calculate the score of a given board
 * @param board the board
 * @param width the width of the board
 * @param height the height of the board
 * @returns -100 if player1 won, 100 if player2 won, 0 if nobody won
*/
export function checkWinner(board: i32[], width: i32, height: i32): i32 {
  for (let x=0; x < width; x++) {
    for (let y=0; y < height; y++) {
      const board4x4 = get4x4(board, width, height, x, y);
      for (let i=0; i < winningPatterns.length; i++) {
        const pattern = winningPatterns[i];
        let score = 0;
        for (let j=0; j < 16; j++) {
          if (pattern[j] === 1) {
            score += board4x4[j];
          }
        }
        if (score === 4) {
          return -100;
        } else if (score === -4) {
          return 100;
        }
      }
    }
  }
  return 1;
}

function get4x4(board: i32[], width: i32, height: i32, x: i32, y: i32): i32[] {
  const board4x4 = new Array<i32>(16);
  for (let i=0; i < 16; i++) {
    board4x4[i] = 0;
  }
  for (let i=0; i < 4; i++) {
    for (let j=0; j < 4; j++) {
      const index = i*4 + j;
      const boardIndex = (y+i)*width + (x+j);
      board4x4[index] = board[boardIndex];
    }
  }
  return board4x4;
}



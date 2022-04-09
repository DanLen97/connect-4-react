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
    for (let i = 0; i < width; i++) {
      if (board[i] == 0) {
        board[i] = 1;
        let score = minimax(board, width, height, false);
        board[i] = 0;
        bestScore = max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    let bestScore = 1;
    for (let i = 0; i < width; i++) {
      if (board[i] == 0) {
        board[i] = 2;
        let score = minimax(board, width, height, true);
        board[i] = 0;
        bestScore = min(bestScore, score);
      }
    }
    return bestScore;
  }
}

function checkWinner(board: i32[], width: i32, height: i32): i32 {
  let winner = 0;
  for (let i = 0; i < width; i++) {
    if (board[i] != 0) {
      let count = 1;
      for (let j = i + 1; j < width; j++) {
        if (board[j] == board[i]) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 4) {
        winner = board[i];
        break;
      }
    }
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

// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}


export function calculateBestMove(board: i32[], width: i32, height: i32): i32 {
  return board.reduce((acc, cur) => acc + cur, 0);
}

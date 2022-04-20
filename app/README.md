# Connect 4 with React


 1 2 3 4 5 6 7      1  2  3  4  5  6  7 
6             6   6                     6
5             5   5                     5
4             4   4                     4
3             3   3                     3
2             2   2 7  8  9 10 11 12 13 2
1             1   1 0  1  2  3  4  5  6 1
 1 2 3 4 5 6 7      1  2  3  4  5  6  7 



GameState = {
  board: Board
  currentPlayer: Player
}

Board = {
  boardState: [ BoardEntry ],
  width: int
  height: int
}

BoardEntry = {
  player: Player
}

Player = {
  Color: ColorType
}



Engine {
  state: GameState
  makeMove(move: Move)
  isPlayersMove(player: Player): Promise<bool>
}



TEST
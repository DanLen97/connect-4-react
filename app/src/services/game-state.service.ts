import { Board } from '../models/board.model';
import { GameState } from '../models/game-state.model';
import { GameType } from '../models/game-type.model';
import { Player } from '../models/player.model';
import { generateDefaultBoard } from './game-state.constants';



export class GameStateService {
  private readonly state: GameState;


  public get gameState() {
    return this.state;
  }

  public get boardState() {
    return this.state.board.boardState;
  }

  public get boardWidth() {
    return this.state.board.width;
  }

  public get boardHeight() {
    return this.state.board.height;
  }

  // TODO: allow partial init state
  constructor(
    { initialState }: { initialState: GameState } = {
      initialState: {
        board: generateDefaultBoard(),
        currentPlayerId: 1,
        players: [{ id: 1, color: 'blue' }],
        gameType: GameType.PVP
      },
    }
  ) {
    this.state = initialState;
  }

  public makeMove({ column }: { column: number }): boolean {
    // move is x value in interval [0,width]
    const state = this.state;

    // check if move is in interval
    if (column < 0 || column >= this.boardWidth) {
      return false;
    }

    const moveIdx = Array.from({ length: state.board.height })
      .map((_, i) => i * state.board.width + column)
      .filter((x) => !state.board.boardState[x].playerId)[0];

    if (moveIdx === undefined) {
      return false;
    }

    const newBoard: Board = { ...state.board };
    newBoard.boardState[moveIdx].playerId = state.currentPlayerId;

    state.board = newBoard;

    return true;
  }

  public isPlayersMove(player: Player): boolean {
    return this.state.currentPlayerId === player.id;
  }

  public isValidGameState(): boolean {
    const state = this.state;
    const isValidSize = state.board.height !== 0 && state.board.width !== 0;
    const isValidArraySize = state.board.boardState.length === state.board.height * state.board.width;

    return isValidSize && isValidArraySize;
  }
}

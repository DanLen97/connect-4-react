import { GameState } from '../models/game-state.model';
import { Player } from '../models/player.model';

export const DEFAULT_WIDTH = 7;
export const DEFAULT_HEIGHT = 6;

export class EngineService {
  private readonly state: GameState;

  public get boardState() {
    return this.state.board.boardState;
  }

  public get boardWidth() {
    return this.state.board.width;
  }

  public get boardHeight() {
    return this.state.board.height;
  }


  constructor(
    { initalState }: { initalState: GameState } = {
      initalState: {
        board: {
          width: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT,
          boardState: Array.from({
            length: DEFAULT_WIDTH * DEFAULT_HEIGHT,
          }).map((_) => ({})),
        },
        currentPlayerId: 1,
        players: [{ id: 1, color: 'blue' }],
      },
    }
  ) {
    this.state = initalState;
  }

  public makeMove({ move }: { move: number }): boolean {
    // move is x value in interval [0,width]
    const state = this.state;

    // TODO: check if move is in interval

    const moveIdx = Array.from({ length: state.board.height })
      .map((_, i) => i * state.board.width + move)
      .filter((x) => !state.board.boardState[x])[0];

    if (!moveIdx) {
      return false;
    }

    state.board.boardState[moveIdx].playerId = state.currentPlayerId;
    return true;
  }

  public isPlayersMove(player: Player): boolean {
    return this.state.currentPlayerId === player.id;
  }

  public isValidGameState(): boolean {
    const state = this.state;
    const isValidSize = state.board.height !== 0 && state.board.width !== 0;

    return isValidSize;
  }
}

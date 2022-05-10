import { Board } from '../models/board.model';
import { GameState } from '../models/game-state.model';
import { GameType } from '../models/game-type.model';

export const DEFAULT_WIDTH = 7;
export const DEFAULT_HEIGHT = 6;

export const generateDefaultBoard = (
  { width, height }: { width: number; height: number } = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  }
) =>
  ({
    width,
    height,
    boardState: Array.from({
      length: width * height,
    }).map(() => ({})),
  } as Board);

export const generateDefaultGameState = () =>
  ({
    currentPlayerId: 1,
    gameType: GameType.PVP,
    players: [
      { id: 1, color: 'blue' },
      { id: 2, color: 'red' },
    ],
    board: generateDefaultBoard(),
  } as GameState);

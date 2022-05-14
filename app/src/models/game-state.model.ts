import { Board } from './board.model';
import { GameType } from './game-type.model';
import { Player } from './player.model';

export interface GameState {
  board: Board;
  currentPlayerId: 0  | 1;
  players: Player[];
  gameType: GameType;
}

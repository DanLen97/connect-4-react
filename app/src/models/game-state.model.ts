import { Board } from './board.model';
import { GameType } from './game-type.model';
import { Player } from './player.model';

export interface GameState {
  board: Board;
  currentPlayerId: number;
  players: Player[];
  gameType: GameType;
}

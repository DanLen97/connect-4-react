import { BoardEntry } from './board-entry.model';

export interface Board {
  boardState: BoardEntry[];
  width: number;
  height: number;
}

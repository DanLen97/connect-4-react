import { Observable, Subject } from 'rxjs';
import { GameState } from '../models/game-state.model';
import { GameType } from '../models/game-type.model';
import { generateDefaultBoard, generateDefaultGameState } from './game-state.constants';
import { GameStateService } from './game-state.service';

export class ClientEngineService {

  private readonly gameStateChanges = new Subject<GameState>();

  public get gameStateChanges$(): Observable<GameState> {
    return this.gameStateChanges.asObservable();
  }

  constructor(private gameStateService: GameStateService) {}

  public reset({ gameType }: { gameType: GameType }) {
    const oldGameState = this.gameStateService.gameState;
    const newGameState: GameState = {
      ...oldGameState,
      gameType,
      board: generateDefaultBoard({ width: oldGameState.board.width, height: oldGameState.board.height })
    };
    this.gameStateService = new GameStateService({ initialState: newGameState });
    this.gameStateChanges.next(this.gameStateService.gameState);
  }

  public makeMove({ column }: { column: number }): boolean {
    if (!this.gameStateService?.makeMove({ column })) {
      return false;
    }
    this.gameStateChanges.next(this.gameStateService.gameState);
    return true;
  }


}
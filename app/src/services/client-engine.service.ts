import { GameStateService } from './game-state.service';

export class ClientEngineService {

  private gameStateService: GameStateService | null = null;

  constructor() {}

  public reset(config: { }) {
    this.gameStateService = new GameStateService();
  }
}
import { firstValueFrom } from 'rxjs';
import { GameType } from '../models/game-type.model';
import { ClientEngineService } from './client-engine.service';
import { GameStateService } from './game-state.service';

test('initialize', () => {
  const engine = new ClientEngineService(new GameStateService());

  expect(engine).toBeDefined();
});

test('reset game state', async () => {
  const engine = new ClientEngineService(new GameStateService({ initialState: {
    players: [],
    currentPlayerId: 1,
    board: {
      height: 2,
      width: 2,
      boardState: [{ playerId: 1 }, { playerId: 0 }, {}, {}],
    },
    gameType: GameType.PVP
  } }));


  const newGameStatePromise = firstValueFrom(engine.gameStateChanges$);

  engine.reset({ gameType: GameType.PVE });

  const newGameState = await newGameStatePromise;

  expect(newGameState).toBeDefined();
  expect(newGameState).toEqual({
    players: [],
    currentPlayerId: 1,
    board: {
      height: 2,
      width: 2,
      boardState: [{}, {}, {}, {}],
    },
    gameType: GameType.PVE });
});

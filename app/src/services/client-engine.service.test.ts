import { firstValueFrom } from 'rxjs';
import { GameState } from '../models/game-state.model';
import { GameType } from '../models/game-type.model';
import { ClientEngineService } from './client-engine.service';
import { GameStateService } from './game-state.service';
import { WasmAiService } from './wasm-ai.service';

async function createClientEngineService(state: { initialState: GameState } | undefined = undefined) {
  return new ClientEngineService(new GameStateService(state), null as unknown as WasmAiService);
}

test('initialize', async () => {
  const engine = await createClientEngineService();

  expect(engine).toBeDefined();
});

test('reset game state', async () => {
  const engine = await createClientEngineService({ initialState: {
    players: [],
    currentPlayerId: 1,
    board: {
      height: 2,
      width: 2,
      boardState: [{ playerId: 1 }, { playerId: 0 }, {}, {}],
    },
    gameType: GameType.PVP
  } });


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

import { firstValueFrom } from 'rxjs';
import { GameState } from '../models/game-state.model';
import { GameType } from '../models/game-type.model';
import { ClientEngineService } from './client-engine.service';
import { GameStateService } from './game-state.service';
import { WasmAiService } from './wasm-ai.service';

const wasmAiService = new WasmAiService();

async function createClientEngineService(state: { initialState: GameState } | undefined = undefined) {
  return new ClientEngineService(new GameStateService(state), wasmAiService);
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

test('make move', async () => {
  const engine = await createClientEngineService({
    initialState: {
      players: [],
      currentPlayerId: 1,
      board: {
        height: 2,
        width: 2,
        boardState: [{}, {}, {}, {}],
      },
      gameType: GameType.PVP
    },
  });

  let newGameStatePromise = firstValueFrom(engine.gameStateChanges$);

  engine.makeMove({ column: 0 });

  await expect(newGameStatePromise).resolves.toEqual({
    players: [],
    currentPlayerId: 0,
    board: {
      height: 2,
      width: 2,
      boardState: [{}, {}, { playerId: 1 }, {}],
    },
    gameType: GameType.PVP } as GameState);


  newGameStatePromise = firstValueFrom(engine.gameStateChanges$);
  engine.makeMove({ column: 0 });

  await expect(newGameStatePromise).resolves.toEqual({
    players: [],
    currentPlayerId: 1,
    board: {
      height: 2,
      width: 2,
      boardState: [{ playerId: 0 }, {}, { playerId: 1 }, {}],
    },
    gameType: GameType.PVP } as GameState);
});

test('make AI move', async () => {
  const engine = await createClientEngineService({
    initialState: {
      players: [],
      currentPlayerId: 1,
      board: {
        height: 2,
        width: 2,
        boardState: [{}, {}, {}, {}],
      },
      gameType: GameType.PVP
    },
  });

  const makeTestAiMove = ({ moveIdx }: {moveIdx: number}) => {
    jest.spyOn(wasmAiService, 'calculateBestMove').mockImplementation(() => moveIdx);
    const newGameStatePromise = firstValueFrom(engine.gameStateChanges$);
    engine.makeAiMove();
    return newGameStatePromise;
  };

  await expect(makeTestAiMove({ moveIdx: 2 })).resolves.toEqual({
    players: [],
    currentPlayerId: 0,
    board: {
      height: 2,
      width: 2,
      boardState: [{}, {}, { playerId: 1 }, {}],
    },
    gameType: GameType.PVP } as GameState);

  await expect(makeTestAiMove({ moveIdx: 0 })).resolves.toEqual({
    players: [],
    currentPlayerId: 1,
    board: {
      height: 2,
      width: 2,
      boardState: [{ playerId: 0 }, {}, { playerId: 1 }, {}],
    },
    gameType: GameType.PVP } as GameState);

});

test('make AI and normal move mixed', async () => {
  const engine = await createClientEngineService({
    initialState: {
      players: [],
      currentPlayerId: 1,
      board: {
        height: 2,
        width: 2,
        boardState: [{}, {}, {}, {}],
      },
      gameType: GameType.PVP
    },
  });

  const makeTestAiMove = ({ moveIdx }: {moveIdx: number}) => {
    jest.spyOn(wasmAiService, 'calculateBestMove').mockImplementation(() => moveIdx);
    const newGameStatePromise = firstValueFrom(engine.gameStateChanges$);
    engine.makeAiMove();
    return newGameStatePromise;
  };

  const makeTestPlayerMove = ({ column }: {column: number}) => {
    const newGameStatePromise = firstValueFrom(engine.gameStateChanges$);
    engine.makeMove({ column });
    return newGameStatePromise;
  };

  await expect(makeTestPlayerMove({ column: 0 })).resolves.toEqual({
    players: [],
    currentPlayerId: 0,
    board: {
      height: 2,
      width: 2,
      boardState: [{}, {}, { playerId: 1 }, {}],
    },
    gameType: GameType.PVP } as GameState);

  await expect(makeTestAiMove({ moveIdx: 0 })).resolves.toEqual({
    players: [],
    currentPlayerId: 1,
    board: {
      height: 2,
      width: 2,
      boardState: [{ playerId: 0 }, {}, { playerId: 1 }, {}],
    },
    gameType: GameType.PVP } as GameState);

});

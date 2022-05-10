import { GameStateService } from './game-state.service';
import { BoardEntry } from '../models/board-entry.model';
import { GameType } from '../models/game-type.model';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './game-state.constants';

test('initialize default game state', () => {
  const gameState = new GameStateService();

  expect(gameState).toBeDefined();

  expect(gameState.boardHeight).toEqual(DEFAULT_HEIGHT);
  expect(gameState.boardWidth).toEqual(DEFAULT_WIDTH);

  expect(gameState.boardState.length).toEqual(DEFAULT_HEIGHT * DEFAULT_WIDTH);
  expect(gameState.boardState.map((s) => s.playerId)).toEqual(
    Array.from({ length: DEFAULT_HEIGHT * DEFAULT_WIDTH }).map(() => undefined)
  );
});

test('initialize with initial game state', () => {
  const gameState = new GameStateService({
    initialState: {
      players: [],
      currentPlayerId: 1,
      board: {
        height: 1,
        width: 1,
        boardState: [],
      },
      gameType: GameType.PVP
    },
  });

  expect(gameState).toBeDefined();

  expect(gameState.boardHeight).toEqual(1);
  expect(gameState.boardWidth).toEqual(1);
  expect(gameState.boardState.length).toEqual(0);
});

test('valid game state', () => {
  const gameState = new GameStateService();

  expect(gameState.isValidGameState()).toEqual(true);
});

test('invalid game state', () => {
  const gameState = new GameStateService({
    initialState: {
      players: [],
      currentPlayerId: 1,
      board: {
        height: 1,
        width: 1,
        boardState: [],
      },
      gameType: GameType.PVP
    },
  });

  expect(gameState.isValidGameState()).toEqual(false);
});

test('check valid move', () => {
  const gameState = new GameStateService({
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

  expect(gameState.makeMove({ column: -10 })).toEqual(false);
  expect(gameState.makeMove({ column: -1 })).toEqual(false);
  expect(gameState.makeMove({ column: 2 })).toEqual(false);
  expect(gameState.makeMove({ column: 3 })).toEqual(false);
  expect(gameState.makeMove({ column: 0 })).toEqual(true);
  expect(gameState.makeMove({ column: 1 })).toEqual(true);
  expect(gameState.makeMove({ column: 0 })).toEqual(true);
  expect(gameState.makeMove({ column: 1 })).toEqual(true);
  expect(gameState.makeMove({ column: 0 })).toEqual(false);
  expect(gameState.makeMove({ column: 1 })).toEqual(false);

});

test('make valid moves', () => {
  const gameState = new GameStateService({
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

  expect(gameState.isValidGameState()).toEqual(true);

  expect(gameState.makeMove({ column: 0 })).toEqual(true);
  expect(gameState.makeMove({ column: 1 })).toEqual(true);

  expect(gameState.boardState).toEqual([
    expect.objectContaining({ playerId: 1 } as BoardEntry),
    expect.objectContaining({ playerId: 1 } as BoardEntry),
    {}, {}
  ]);

  expect(gameState.makeMove({ column: 0 })).toEqual(true);
  expect(gameState.makeMove({ column: 1 })).toEqual(true);

  expect(gameState.boardState).toEqual([
    expect.objectContaining({ playerId: 1 } as BoardEntry),
    expect.objectContaining({ playerId: 1 } as BoardEntry),
    expect.objectContaining({ playerId: 1 } as BoardEntry),
    expect.objectContaining({ playerId: 1 } as BoardEntry),
  ]);
});

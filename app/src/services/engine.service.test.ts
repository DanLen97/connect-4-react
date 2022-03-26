import React from 'react';
import { render, screen } from '@testing-library/react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, EngineService } from './engine.service';


beforeEach(() => {
  
});


test('initialize default game state', () => {
  const engine = new EngineService();

  expect(engine).toBeDefined();

  expect(engine.boardHeight).toEqual(DEFAULT_HEIGHT);
  expect(engine.boardWidth).toEqual(DEFAULT_WIDTH);

  expect(engine.boardState.length).toEqual(DEFAULT_HEIGHT * DEFAULT_WIDTH);
  expect(engine.boardState.map(s => s.playerId)).toEqual(Array.from({ length: DEFAULT_HEIGHT * DEFAULT_WIDTH }).map(_ => undefined));
});

test('initialize with initial game state', () => {
  const engine = new EngineService({ initalState: {
    players: [],
    currentPlayerId: 1,
    board: {
      height: 1,
      width: 1,
      boardState: []
    }
  }});

  expect(engine).toBeDefined();

  expect(engine.boardHeight).toEqual(1);
  expect(engine.boardWidth).toEqual(1);
  expect(engine.boardState.length).toEqual(0);
});


test('make valid move', () => {
  const engine = new EngineService();

  engine.makeMove({ move: 0 })

  // TODO:
});

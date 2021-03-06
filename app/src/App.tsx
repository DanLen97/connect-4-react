import './App.css';
import { ClientEngineService } from './services/client-engine.service';
import { GameState } from './models/game-state.model';
import { GameStateService } from './services/game-state.service';
import { GameType } from './models/game-type.model';
import Gameboard from './components/Gameboard';
import logo from './logo.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { Board } from './models/board.model';
import { BoardEntry } from './models/board-entry.model';
import { WasmAiService } from './services/wasm-ai.service';

async function createEngineService({ initialState }: { initialState: GameState }) {
  const wasmAiService = new WasmAiService();
  await wasmAiService.init();
  return new ClientEngineService(new GameStateService({ initialState }), wasmAiService);
}

async function createDefaultEngineService() {
  const res = await createEngineService({
    initialState: {
      players: [],
      currentPlayerId: 1,
      board: {
        height: 6,
        width: 7,
        boardState: Array.from({ length: 6 * 7 }).map<BoardEntry>(() => ({})),
      },
      gameType: GameType.PVP,
    },
  });
  return res;
}

function App() {
  const [engine, setEngine] = useState<ClientEngineService | undefined>();
  const [board, setBoard] = useState<Board | undefined>();

  const initEngineService = useCallback(async () => {
    const res = await createDefaultEngineService();
    setEngine(res);
  }, []);

  useEffect(() => {
    initEngineService().catch(console.error);
  }, [createEngineService]);

  useEffect(() => {
    if (!engine) return;
    const s = engine.gameStateChanges$.subscribe((gameState) => {
      console.log(`Received game state: ${JSON.stringify(gameState)}`);
      setBoard(gameState.board);
    });

    engine.reset({ gameType: GameType.PVP });
    return () => {
      s.unsubscribe();
    };
  }, [engine]);

  const onTileClick = (index: number) => {
    if (!board) {
      return undefined;
    }
    const column = index % board.width;
    engine?.makeMove({ column });
    engine?.makeAiMove();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Connect-4 React
      </header>
      <div className="Gameboard">
        {board && (
          <Gameboard board={board} onTileClick={onTileClick}></Gameboard>
        )}
      </div>
    </div>
  );
}

export { App };

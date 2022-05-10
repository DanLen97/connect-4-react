import './App.css';
import { ClientEngineService } from './services/client-engine.service';
import { GameState } from './models/game-state.model';
import { GameStateService } from './services/game-state.service';
import { GameType } from './models/game-type.model';
import Gameboard from './components/gameboard/Gameboard';
import logo from './logo.svg';
import React, { useContext, useEffect } from 'react';


function createEngineService({ initialState }: {initialState: GameState}) {
  return new ClientEngineService(new GameStateService({ initialState }));
}

const engine = createEngineService({
  initialState: {
    players: [],
    currentPlayerId: 1,
    board: {
      height: 2,
      width: 2,
      boardState: [{ playerId: 1 }, { playerId: 0 }, {}, {}],
    },
    gameType: GameType.PVP,
  },
});

const EngineServiceContext = React.createContext(engine);



function App() {

  const engine = useContext(EngineServiceContext);

  useEffect(() => {
    const s = engine.gameStateChanges$.subscribe(gameState => {
      console.log(gameState);
    });

    engine.reset({ gameType: GameType.PVP });
    return () => {
      s.unsubscribe();
    };
  }, [ engine ]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Connect-4 React
      </header>
      <div className="Gameboard">
        <Gameboard></Gameboard>
      </div>
    </div>
  );
}

export { App, EngineServiceContext};

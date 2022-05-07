import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { WasmAiService } from './services/wasm-ai.service';
import Gameboard from './components/gameboard/Gameboard';

function App() {
  const [count, setCount] = useState(0);

  const service = new WasmAiService();

  useEffect(() => {
    service.init().then(() => {
      setCount(service.test());
    });
  });

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

export default App;

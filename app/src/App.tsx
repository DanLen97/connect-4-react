import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { WasmAiService } from './services/wasm-ai.service';

function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    const ai = new WasmAiService();
    ai.init().then(() => {
      setCount(ai.add(1,3));
    });
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          1+3=
          { count }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

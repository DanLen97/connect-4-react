import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { WasmAiService } from './services/wasm-ai.service';

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

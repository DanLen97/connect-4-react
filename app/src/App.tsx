import './App.css';
import Gameboard from './components/gameboard/Gameboard';
import logo from './logo.svg';
import React from 'react';

function App() {
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

import './Gameboard.css';
import React, { CSSProperties } from 'react';
import { Board } from '../../models/board.model';


type TileClick = (index: number) => void;

function Gameboard({ board, onTileClick }: { board: Board, onTileClick: TileClick }) {
  console.log('New Gameboard');
  const tiles = board.boardState.map((boardEntry, index) => {
    let backgroundColor = 'white';
    if (boardEntry?.playerId === 0) {
      backgroundColor = 'red';
    } else if (boardEntry?.playerId === 1) {
      backgroundColor = 'blue';
    }
    return (
      <div key={index} className='tile' onClick={() => onTileClick(index)} style={{backgroundColor}}>
      </div>
    );
  });

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${board.width}, minmax(20px, 70px))`,
  };

  return (<div className='grid' style={gridStyle}>{ tiles }</div>);
}


export default Gameboard;
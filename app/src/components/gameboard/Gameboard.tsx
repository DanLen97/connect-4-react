import './Gameboard.css';
import React, { CSSProperties } from 'react';
import { Board } from '../../models/board.model';


type TileClick = (index: number) => void;

function Gameboard({ board, onTileClick }: { board: Board, onTileClick: TileClick }) {
  console.log('New Gameboard');
  const tiles = board.boardState.map((boardEntry, index) => {
    return (
      <div key={index} className='tile' onClick={() => onTileClick(index)}>
        {boardEntry.playerId && boardEntry.playerId.toString()}
      </div>
    );
  });

  const gridStyle: CSSProperties = {
    gridTemplateColumns: Array.from(
      { length: board.width },
      () => 'auto'
    ).join(' '),
  };

  return (<div className='grid' style={gridStyle}>{ tiles }</div>);
}


export default Gameboard;
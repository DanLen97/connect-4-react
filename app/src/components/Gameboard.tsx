import './Gameboard.css';
import React, { CSSProperties } from 'react';
import { Board } from '../models/board.model';
import { GhostTile, TileClick } from './GhostTile';



function Gameboard({
  board,
  onTileClick,
}: {
  board: Board;
  onTileClick: TileClick;
}) {

  const ghostTiles = Array.from({ length: board.width }).map((_, index) => {
    return (
      <GhostTile key={index} onTileClick={onTileClick} column={index}></GhostTile>
    );
  });

  const tiles = board.boardState.map((boardEntry, index) => {
    let backgroundColor = 'white';
    if (boardEntry?.playerId === 0) {
      backgroundColor = 'red';
    } else if (boardEntry?.playerId === 1) {
      backgroundColor = 'blue';
    }
    return <div key={index} className="tile" style={{ backgroundColor }}></div>;
  });

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${board.width}, minmax(20px, 70px))`,
  };

  return (
    <>
      <div className="ghost-grid" style={gridStyle}>
        {ghostTiles}
      </div>
      <div className="grid" style={gridStyle}>
        {tiles}
      </div>
    </>
  );
}

export default Gameboard;

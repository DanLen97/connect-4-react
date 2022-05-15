import './GhostTile.css';
import React, { useState } from 'react';

export type TileClick = (index: number) => void;

function GhostTile({ column, onTileClick }: { column: number, onTileClick: TileClick }) {
  const [ isHovered, setIsHovered ] = useState(false);

  return (
    <div
      className="ghost-tile border"
      onClick={() => onTileClick(column)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: isHovered ? 'blue': 'initial' }}
    ></div>
  );
}


export { GhostTile };
import React, { useState } from 'react';
import './App.css';

const GameComponent = () => {
  const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(null)));
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [usedNumbers, setUsedNumbers] = useState([]);

  const handleCellClick = (rowIndex, colIndex) => {
    if (grid[rowIndex][colIndex] !== null || winner !== null) {
      return;
    }
  };

  const handleNumberInput = (event, rowIndex, colIndex) => {
    const value = parseInt(event.target.value);

    if (isNaN(value) || value < 1 || value > 9 || usedNumbers.includes(value)) {
      return;
    }

    const newGrid = grid.map(row => [...row]);
    newGrid[rowIndex][colIndex] = value;

    setGrid(newGrid);
    setUsedNumbers([...usedNumbers, value]);

    if (checkWinner(newGrid, player)) {
      setWinner(player);
    } else if (checkDraw(newGrid)) {
      setWinner('draw');
    } else {
      setPlayer(player === 1 ? 2 : 1);
    }
  };

  const checkWinner = (currentGrid, currentPlayer) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        currentGrid[i][0] + currentGrid[i][1] + currentGrid[i][2] === 15
      ) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        currentGrid[0][i] + currentGrid[1][i] + currentGrid[2][i] === 15
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      currentGrid[0][0] + currentGrid[1][1] + currentGrid[2][2] === 15 ||
      currentGrid[0][2] + currentGrid[1][1] + currentGrid[2][0] === 15
    ) {
      return true;
    }

    return false;
  };

  const checkDraw = (currentGrid) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentGrid[i][j] === null) {
          return false;
        }
      }
    }

    return true;
  };

  const renderCell = (rowIndex, colIndex) => {
    const value = grid[rowIndex][colIndex];

    return (
      <div className="cell" onClick={() => handleCellClick(rowIndex, colIndex)}>
        {value === null ? (
          <input
            type="number"
            min="1"
            max="9"
            onChange={(event) => handleNumberInput(event, rowIndex, colIndex)}
          />
        ) : (
          value
        )}
      </div>
    );
  };

  return (
    <div className="game">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => (
              <div key={colIndex} className="col">
                {renderCell(rowIndex, colIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner">Player {winner} wins!</div>
      )}
    </div>
  );
};

export default GameComponent;

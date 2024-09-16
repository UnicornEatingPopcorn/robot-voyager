import React, { useState } from 'react';
import './App.css';

const App = () => {
  const gridSize = 5;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('NORTH');

  const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  const rotate = (rotationDirection) => {
    const currentIndex = directions.indexOf(direction);
    if (rotationDirection === 'LEFT') {
      setDirection(directions[(currentIndex + 3) % 4]);
    } else {
      setDirection(directions[(currentIndex + 1) % 4]);
    }
  };

  const moveForward = () => {
    let { x, y } = position;

    if (direction === 'NORTH' && y > 0) y -= 1;
    else if (direction === 'SOUTH' && y < gridSize - 1) y += 1;
    else if (direction === 'EAST' && x < gridSize - 1) x += 1;
    else if (direction === 'WEST' && x > 0) x -= 1;

    setPosition({ x, y });
  };

  const renderGrid = () => {
    const rows = [];
    for (let row = 0; row < gridSize; row++) {
      const cells = [];
      for (let col = 0; col < gridSize; col++) {
        const isRobot = position.x === col && position.y === row;
        cells.push(
          <div key={`${row}-${col}`} className={`cell ${isRobot ? 'robot' : ''}`}>
            {isRobot ? `🤖 ${direction}` : ''}
          </div>
        );
      }
      rows.push(
        <div key={row} className="row">
          {cells}
        </div>
      );
    }
    return rows;
  };

  const getMoveMessage = () => {
    return `Let's go to ${direction}! Click the button.`;
  };

  return (
    <div className="App">
      <h1>Robot Simulator</h1>
      <div className="grid">{renderGrid()}</div>
      <div className="controls">
        <button onClick={() => rotate('LEFT')}>Rotate Left</button>
        <button onClick={() => moveForward()}>Move Forward</button>
        <button onClick={() => rotate('RIGHT')}>Rotate Right</button>
      </div>
      <div className="message">
        <p>{getMoveMessage()}</p>
      </div>
    </div>
  );
};

export default App;

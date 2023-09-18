import React, { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);

  const nextPlayer = step % 2 === 0 ? "X" : "O";

  function handlePlay(nextSquares) {
    setHistory([...history.slice(0, step + 1), nextSquares]);
    setStep(step + 1);
  }

  const handleMove = (move) => {
    setStep(move);
  };

  const moves = history.map((squares, move) => {
    let description;
    const isCurrentMove = move === step;
    if (move > 0) {
      if (isCurrentMove) {
        description = `You are at move #${move}`;
      } else {
        description = `Go to move #${move}`;
      }
    } else {
      description = "Start the game";
    }
    const btn = (
      <button
        onClick={() => {
          handleMove(move);
        }}
      >
        {description}
      </button>
    );
    return <li key={move}>{isCurrentMove ? description : btn}</li>;
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history.slice(step)[0]}
          nextPlayer={nextPlayer}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, nextPlayer, onPlay }) {
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = `Winner is: ${winner}`;
  } else {
    status = `Next player is: ${nextPlayer}`;
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = nextPlayer;
    onPlay(nextSquares);
  }

  const boardRows = [0, 3, 6].map((e1) => {
    return (
      <div className="board-row" key={e1}>
        {[0, 1, 2].map((e2) => {
          const item = e1 + e2;
          return (
            <Square
              value={squares[item]}
              onSquareClick={() => handleClick(item)}
              key={item}
            />
          );
        })}
      </div>
    );
  });
  return (
    <React.Fragment>
      <div className="status">{status}</div>
      {boardRows}
    </React.Fragment>
  );
}

function calculateWinner(squares) {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combo of winCombinations) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

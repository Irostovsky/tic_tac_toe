import React, { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const squares = history.slice(-1)[0];
  const winner = calculateWinner(squares);
  const nextPlayer = history.length % 2 == 0 ? "O" : "X";

  let status;
  if (winner) {
    status = `Winner is: ${winner}`;
  } else {
    status = `Next player is: ${nextPlayer}`;
  }

  function handlePlay(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = nextPlayer;
    setHistory([...history, nextSquares]);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history.slice(-1)[0]}
          status={status}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{/* TODO */}</ol>
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

function Board({ squares, status, onPlay }) {
  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onPlay(0)} />
        <Square value={squares[1]} onSquareClick={() => onPlay(1)} />
        <Square value={squares[2]} onSquareClick={() => onPlay(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onPlay(3)} />
        <Square value={squares[4]} onSquareClick={() => onPlay(4)} />
        <Square value={squares[5]} onSquareClick={() => onPlay(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onPlay(6)} />
        <Square value={squares[7]} onSquareClick={() => onPlay(7)} />
        <Square value={squares[8]} onSquareClick={() => onPlay(8)} />
      </div>
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

"use client"
import React, { useState, useEffect } from 'react';

const Confetti = ({ isActive }:{ isActive:any }) => {
  if (!isActive) return null;

  const confettiPieces = Array.from({ length: 50 }).map((_, index) => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="confetti-container">
      {confettiPieces.map((style, index) => (
        <div key={index} className="confetti-piece" style={style} />
      ))}
    </div>
  );
};

const SOSGame = () => {
  const [gridSize, setGridSize] = useState(5);
  const [board, setBoard] = useState(Array(gridSize * gridSize).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const [scores, setScores] = useState({ 'Player 1': 0, 'Player 2': 0 });
  const [gameOver, setGameOver] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState('S');
  const [sosCells, setSOSCells] = useState({});
  const [highlightedCells, setHighlightedCells] = useState<any>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [history, setHistory] = useState<any>([]);
  const [futureHistory, setFutureHistory] = useState<any>([]);

  useEffect(() => {
    resetGame();
  }, [gridSize]);

  useEffect(() => {
    if (lastMove !== null) {
      const newSOSPositions = checkForSOS(lastMove);
      if (Object.keys(newSOSPositions).length > 0) {
        const newScore = Object.keys(newSOSPositions).length;
        setScores((prevScores:any) => ({
          ...prevScores,
          [currentPlayer]: prevScores[currentPlayer] + newScore
        }));
        setSOSCells(prev => ({...prev, ...newSOSPositions}));
        triggerCelebration();
        highlightSOSFormation(Object.keys(newSOSPositions).flatMap(key => key.split(',')));
      } else {
        setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
      }
    }
    if (isBoardFull()) {
      setGameOver(true);
      setShowConfetti(true);
    }
  }, [board]);

  const triggerCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const highlightSOSFormation = (cells:any) => {
    setHighlightedCells(cells);
    setTimeout(() => setHighlightedCells([]), 2000);
  };

  const isBoardFull = () => board.every(cell => cell !== '');

  const checkForSOS = (index:any) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    let sosPositions:any = {};

    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    directions.forEach(([dx, dy]) => {
      for (let i = -2; i <= 0; i++) {
        const positions = [
          [row + i*dx, col + i*dy],
          [row + (i+1)*dx, col + (i+1)*dy],
          [row + (i+2)*dx, col + (i+2)*dy]
        ];

        if (positions.every(([r, c]) => r >= 0 && r < gridSize && c >= 0 && c < gridSize)) {
          const [a, b, c] = positions.map(([r, c]) => board[r * gridSize + c]);
          if (a === 'S' && b === 'O' && c === 'S') {
            const key = positions.map(([r, c]) => r * gridSize + c).join(',');
            sosPositions[key] = currentPlayer;
          }
        }
      }
    });

    return sosPositions;
  };

  const handleCellClick = (index:any) => {
    if (board[index] !== '' || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = selectedLetter;
    setBoard(newBoard);
    setLastMove(index);
    setHistory([...history, { board, scores, currentPlayer, sosCells }]);
    setFutureHistory([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setBoard(lastState.board);
    setScores(lastState.scores);
    setCurrentPlayer(lastState.currentPlayer);
    setSOSCells(lastState.sosCells);
    setFutureHistory([...futureHistory, { board, scores, currentPlayer, sosCells }]);
    setHistory(history.slice(0, -1));
  };

  const redo = () => {
    if (futureHistory.length === 0) return;
    const nextState = futureHistory[futureHistory.length - 1];
    setBoard(nextState.board);
    setScores(nextState.scores);
    setCurrentPlayer(nextState.currentPlayer);
    setSOSCells(nextState.sosCells);
    setHistory([...history, { board, scores, currentPlayer, sosCells }]);
    setFutureHistory(futureHistory.slice(0, -1));
  };

  const resetGame = () => {
    setBoard(Array(gridSize * gridSize).fill(''));
    setCurrentPlayer('Player 1');
    setScores({ 'Player 1': 0, 'Player 2': 0 });
    setGameOver(false);
    setLastMove(null);
    setSelectedLetter('S');
    setSOSCells({});
    setHighlightedCells([]);
    setHistory([]);
    setFutureHistory([]);
    setShowConfetti(false);
  };

  const getCellColor = (cell:any, index:any) => {
    for (const [positions, player] of Object.entries(sosCells)) {
      if (positions.split(',').includes(index.toString())) {
        return player === 'Player 1' ? 'bg-yellow-300' : 'bg-green-300';
      }
    }
    if (cell === 'S') return 'bg-blue-400';
    if (cell === 'O') return 'bg-red-400';
    return 'bg-gray-200 hover:bg-gray-300';
  };

  const handleGridSizeChange = (event:any) => {
    setGridSize(Number(event.target.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 font-sans flex items-center justify-center">
      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #ffd300;
          top: -10px;
          opacity: 0;
        }
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            top: -10px;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            top: 100%;
            transform: translateX(100px);
          }
        }
        .confetti-piece {
          animation: confetti-fall 3s ease-out infinite;
        }
        @keyframes victory {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .victory-animation {
          animation: victory 0.5s ease-out;
        }
      `}</style>
      <Confetti isActive={showConfetti} />
      <div className="bg-white rounded-lg p-8 shadow-lg relative">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
            SOS Game
          </span>
        </h1>

        <div className="mb-4">
          <label htmlFor="gridSize" className="block text-sm font-medium text-gray-700">Grid Size: {gridSize}x{gridSize}</label>
          <input
            type="range"
            id="gridSize"
            min="5"
            max="10"
            value={gridSize}
            onChange={handleGridSizeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className={`grid gap-1 mb-6`} style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
          {board.map((cell:any, index:number) => (
            <button
              key={index}
              className={`aspect-square text-2xl font-bold flex items-center justify-center rounded-lg transition-all duration-300 ${
                getCellColor(cell, index)
              } ${index === lastMove ? 'ring-4 ring-purple-400' : ''} ${
                highlightedCells.includes(index.toString()) ? 'scale-125' : ''
              } text-white`}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="text-center mb-4">
          <span className="text-xl font-bold">
            Current Player: {currentPlayer}
          </span>
        </div>

        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium text-white border border-blue-600 rounded-l-lg hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ${
                selectedLetter === 'S' ? 'bg-blue-600' : 'bg-blue-500 bg-opacity-30'
              }`}
              onClick={() => setSelectedLetter('S')}
            >
              S
            </button>
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium text-white border border-red-600 rounded-r-lg hover:bg-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 ${
                selectedLetter === 'O' ? 'bg-red-600' : 'bg-red-500 bg-opacity-30'
              }`}
              onClick={() => setSelectedLetter('O')}
            >
              O
            </button>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="text-yellow-600 font-bold">Player 1 Score: {scores['Player 1']}</div>
          <div className="text-green-600 font-bold">Player 2 Score: {scores['Player 2']}</div>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
            onClick={undo}
            disabled={history.length === 0}
          >
            Undo
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
            onClick={redo}
            disabled={futureHistory.length === 0}
          >
            Redo
          </button>
        </div>

        <div className="text-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-red-500 text-white font-bold rounded-full text-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>

      {gameOver && (
        <div className="victory-animation fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-70">
          <div className="text-center bg-white p-8 rounded-lg shadow-2xl">
            <div className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
              {scores['Player 1'] > scores['Player 2'] ? 'Player 1' : 'Player 2'} Wins!
            </div>
            <div className="text-9xl mb-6">🏆</div>
            <div className="text-2xl font-bold mb-4">
              Final Scores:
            </div>
            <div className="flex justify-around text-xl">
              <div>
                <span className="font-bold text-yellow-600">Player 1:</span> {scores['Player 1']}
              </div>
              <div>
                <span className="font-bold text-green-600">Player 2:</span> {scores['Player 2']}
              </div>
            </div>
            <button
              className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-full text-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSGame;
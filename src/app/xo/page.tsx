"use client";
import React, { useState, useEffect, useRef } from "react";

const XOGame = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [movesX, setMovesX] = useState([]);
  const [movesO, setMovesO] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [moveLimit, setMoveLimit] = useState(4);
  const [playerX, setPlayerX] = useState("Player X");
  const [playerO, setPlayerO] = useState("Player O");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [showVictoryAnimation, setShowVictoryAnimation] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [isTie, setIsTie] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<any>(null);
  const winningCombos: any = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  useEffect(() => {
    audioRef.current = new Audio("./game.mp3");
    audioRef.current.loop = true;
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  const makeMove = (position: any) => {
    if (board[position] !== "" || winner || isTie) return;

    const newBoard = [...board];
    const currentMoves: any = currentPlayer === "X" ? [...movesX] : [...movesO];

    if (currentMoves.length === moveLimit) {
      const oldestMove: any = currentMoves.shift();
      newBoard[oldestMove] = "";
    }

    newBoard[position] = currentPlayer;
    currentMoves.push(position);

    setBoard(newBoard);
    setLastMove(position);
    if (currentPlayer === "X") {
      setMovesX(currentMoves);
    } else {
      setMovesO(currentMoves);
    }
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    for (let combo of winningCombos) {
      if (
        board[combo[0]] &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[0]] === board[combo[2]]
      ) {
        setWinner(board[combo[0]]);
        setWinningLine(combo);
        updateScore(board[combo[0]]);
        setShowVictoryAnimation(true);
        vibrateDevice();
        setTimeout(() => {
          setShowVictoryAnimation(false);
        }, 3000);
        return;
      }
    }

    // Check for tie
    if (!board.includes("") && !winner) {
      setIsTie(true);
      setShowVictoryAnimation(true);
      vibrateDevice();
      setTimeout(() => {
        setShowVictoryAnimation(false);
      }, 3000);
    }
  };

  const updateScore = (winner: any) => {
    if (winner === "X") {
      setScoreX(scoreX + 1);
    } else {
      setScoreO(scoreO + 1);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setMovesX([]);
    setMovesO([]);
    setWinner(null);
    setWinningLine(null);
    setShowVictoryAnimation(false);
    setLastMove(null);
    setIsTie(false);
  };

  const handleMoveLimitChange = (limit: any) => {
    setMoveLimit(limit);
    resetGame();
  };

  const vibrateDevice = () => {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const renderBoard = () => {
    return (
      <div className="relative grid grid-cols-3 gap-4 mb-6">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <button
            key={index}
            className={`lg:w-28 lg:h-28 md:w-24 md:h-24 sm:w-20 sm:h-20  w-24 h-24 text-5xl font-bold flex items-center justify-center rounded-lg transition-all duration-300 ${
              board[index] === "X"
                ? "bg-indigo-500 text-white"
                : board[index] === "O"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } ${index === lastMove ? "flip" : ""}`}
            onClick={() => makeMove(index)}
            disabled={winner !== null || isTie}
          >
            {board[index]}
          </button>
        ))}
        {winningLine && <WinningLine combo={winningLine} />}
      </div>
    );
  };

  const WinningLine = ({ combo }: { combo: any }) => {
    const getLineStyle = () => {
      const start = combo[0];
      const end = combo[2];
      const startPos = getPosition(start);
      const endPos = getPosition(end);

      const dx = endPos.x - startPos.x;
      const dy = endPos.y - startPos.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      return {
        width: `${length}px`,
        transform: `rotate(${angle}deg)`,
        top: `${startPos.y + 56}px`,
        left: `${startPos.x + 56}px`,
        transformOrigin: "top left",
      };
    };

    const getPosition = (index: any) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      return {
        x: col * 128,
        y: row * 128,
      };
    };

    return (
      <div className="absolute bg-yellow-400 h-2" style={getLineStyle()}></div>
    );
  };

  //  content="Super XO, Tic-Tac-Toe, board game, strategy game, online game, multiplayer game"

  return (
    <>
      <div className="md:h-screen h-full w-screen overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 p-4 font-sans flex items-center justify-center">
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes flip {
            0% {
              transform: perspective(400px) rotateY(0);
            }
            100% {
              transform: perspective(400px) rotateY(360deg);
            }
          }
          @keyframes victory {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes textAnimation {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
          .fade-in {
            animation: fadeIn 0.5s ease-out;
          }
          .pulse {
            animation: pulse 2s infinite;
          }
          .flip {
            animation: flip 0.6s ease-in-out;
          }
          .victory-animation {
            animation: victory 0.5s ease-out;
          }
          .text-animation {
            animation: textAnimation 2s ease-in-out infinite;
          }
        `}</style>

        <div className="flex lg:flex-row md:flex-col-reverse flex-col gap-8 w-full max-w-7xl h-full ">
          {/* Left column for inputs, score, and current player info */}
          <div className="lg:w-1/3 sm:block hidden w-full pr-4 space-y-4 mt-16 justify-center h-full">
            <div
              className="bg-white rounded-lg p-4 shadow-lg fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="justify-between flex flex-row">
                <h2 className="text-xl font-bold mb-3 text-gray-800">
                  Game Settings
                </h2>
                <button
                  onClick={toggleMusic}
                  className="text-3xl focus:outline-none"
                >
                  {isMusicPlaying ? "🔊" : "🔇"}
                </button>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="playerX"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Player X:
                </label>
                <input
                  type="text"
                  id="playerX"
                  value={playerX}
                  onChange={(e) => setPlayerX(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-900"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="playerO"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Player O:
                </label>
                <input
                  type="text"
                  id="playerO"
                  value={playerO}
                  onChange={(e) => setPlayerO(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-900"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Move Limit:
                </label>
                <div className="flex rounded-md overflow-hidden">
                  {[3, 4, 5].map((limit) => (
                    <button
                      key={limit}
                      className={`flex-1 py-2 text-sm font-medium ${
                        moveLimit === limit
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } transition-colors duration-200`}
                      onClick={() => handleMoveLimitChange(limit)}
                    >
                      {limit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="bg-white sm:block hidden rounded-lg p-4 shadow-lg fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                Game Info
              </h2>
              <div className="text-sm text-gray-600">
                <div className="font-semibold text-indigo-800">
                  {playerX} Moves: {movesX.map(val => val + 1).join(", ")}
                </div>
                <div className="font-semibold text-purple-800">
                  {playerO} Moves: {movesO.map(val => val + 1).join(", ")}
                </div>
              </div>
            </div>
            {/* Score table */}
            <div
              className="bg-white sm:block hidden rounded-lg p-4 shadow-lg fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                Score Board
              </h2>
              <div className="flex justify-between items-center mb-2 bg-indigo-100 p-2 rounded-md">
                <span className="font-medium text-indigo-800">{playerX}</span>
                <span className="text-2xl font-bold text-indigo-600 pulse">
                  {scoreX}
                </span>
              </div>
              <div className="flex justify-between items-center bg-purple-100 p-2 rounded-md">
                <span className="font-medium text-purple-800">{playerO}</span>
                <span className="text-2xl font-bold text-purple-600 pulse">
                  {scoreO}
                </span>
              </div>
            </div>
          </div>

          {/* Right column for game board */}
          <div className="lg:w-2/3 w-full flex items-center justify-center">
            <div
              className="bg-white rounded-lg p-8 shadow-lg fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              {/* SUPER XO title inside the game board */}
              <h1 className="text-5xl font-extrabold mb-8 text-center fade-in">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  SUPER XO
                </span>
              </h1>

              {renderBoard()}

              {/* Current player display */}
              <div className="text-center mb-4">
                <span className="text-xl font-bold text-gray-800">
                  {!winner && !isTie
                    ? `Current Player: ${
                        currentPlayer === "X" ? playerX : playerO
                      }`
                    : ""}
                </span>
              </div>

              <div className="text-center">
                <button
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full text-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={resetGame}
                >
                  Reset Game
                </button>
              </div>
            </div>
          </div>
          <div
            className="bg-white sm:hidden block rounded-lg p-4 shadow-lg fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-xl font-bold mb-3 text-gray-800">Game Info</h2>
            <div className="text-sm text-gray-600">
              <div className="font-semibold text-indigo-800">
                {playerX} Moves: {movesX.join(", ")}
              </div>
              <div className="font-semibold text-purple-800">
                {playerO} Moves: {movesO.join(", ")}
              </div>
            </div>
          </div>
          <div
            className="bg-white sm:hidden block rounded-lg p-4 shadow-lg fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Score Board
            </h2>
            <div className="flex justify-between items-center mb-2 bg-indigo-100 p-2 rounded-md">
              <span className="font-medium text-indigo-800">{playerX}</span>
              <span className="text-2xl font-bold text-indigo-600 pulse">
                {scoreX}
              </span>
            </div>
            <div className="flex justify-between items-center bg-purple-100 p-2 rounded-md">
              <span className="font-medium text-purple-800">{playerO}</span>
              <span className="text-2xl font-bold text-purple-600 pulse">
                {scoreO}
              </span>
            </div>
          </div>
          <div
            className="bg-white sm:hidden block rounded-lg p-4  shadow-lg fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="justify-between flex flex-row">
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                Game Settings
              </h2>
              <button
                onClick={toggleMusic}
                className="text-3xl focus:outline-none"
              >
                {isMusicPlaying ? "🔊" : "🔇"}
              </button>
            </div>

            <div className="mb-3">
              <label
                htmlFor="playerX"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Player X:
              </label>
              <input
                type="text"
                id="playerX"
                value={playerX}
                onChange={(e) => setPlayerX(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-900"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="playerO"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Player O:
              </label>
              <input
                type="text"
                id="playerO"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-900"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Move Limit:
              </label>
              <div className="flex rounded-md overflow-hidden">
                {[3, 4, 5].map((limit) => (
                  <button
                    key={limit}
                    className={`flex-1 py-2 text-sm font-medium ${
                      moveLimit === limit
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors duration-200`}
                    onClick={() => handleMoveLimitChange(limit)}
                  >
                    {limit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showVictoryAnimation && (
          <div className="victory-animation fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-70">
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-4 text-animation">
                {isTie
                  ? "It's a Tie!"
                  : `${winner === "X" ? playerX : playerO} Wins!`}
              </div>
              <div className="text-8xl text-animation">
                {isTie ? "🤝" : "🏆"}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default XOGame;

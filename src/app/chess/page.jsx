"use client";
import React, { useState, useEffect } from "react";

// Constants for piece types
const PAWN = "p";
const ROOK = "r";
const KNIGHT = "n";
const BISHOP = "b";
const QUEEN = "q";
const KING = "k";

// Initial board setup
const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const ChessGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [gameStatus, setGameStatus] = useState("active"); // 'active', 'check', 'checkmate', 'stalemate', 'draw'
  const [moveHistory, setMoveHistory] = useState([]);
  const [castlingRights, setCastlingRights] = useState({
    white: { kingSide: true, queenSide: true },
    black: { kingSide: true, queenSide: true },
  });
  const [enPassantTarget, setEnPassantTarget] = useState(null);
  const [halfMoveClock, setHalfMoveClock] = useState(0);
  const [fullMoveNumber, setFullMoveNumber] = useState(1);

  // Helper functions
  const isWhitePiece = (piece) => piece === piece.toUpperCase();
  const isBlackPiece = (piece) => piece === piece.toLowerCase();
  const getOpponentColor = (color) => (color === "white" ? "black" : "white");

  // Function to get all possible moves for a piece
  // Function to get all possible moves for a piece
  const getPossibleMoves = (row, col, checkForCheck = true) => {
    if (row && col) {
      const piece = board[row][col];
      const pieceType = piece.toLowerCase();
      const isWhite = isWhitePiece(piece);
      let moves = [];

      switch (pieceType) {
        case PAWN:
          moves = getPawnMoves(row, col, isWhite);
          break;
        case ROOK:
          moves = getRookMoves(row, col, isWhite);
          break;
        case KNIGHT:
          moves = getKnightMoves(row, col, isWhite);
          break;
        case BISHOP:
          moves = getBishopMoves(row, col, isWhite);
          break;
        case QUEEN:
          moves = getQueenMoves(row, col, isWhite);
          break;
        case KING:
          moves = getKingMoves(row, col, isWhite);
          break;
      }

      // Filter out moves that would put the king in check
      if (checkForCheck) {
        moves = moves.filter(
          ([endRow, endCol]) =>
            !wouldBeInCheck(row, col, endRow, endCol, isWhite)
        );
      }

      return moves;
    }
  };

  // Implement move logic for each piece type
  const getPawnMoves = (row, col, isWhite) => {
    const moves = [];
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;

    // Move forward one square
    if (!board[row + direction][col]) {
      moves.push([row + direction, col]);

      // Move forward two squares from starting position
      if (row === startRow && !board[row + 2 * direction][col]) {
        moves.push([row + 2 * direction, col]);
      }
    }

    // Capture diagonally
    for (let i of [-1, 1]) {
      if (col + i >= 0 && col + i < 8) {
        const targetPiece = board[row + direction][col + i];
        if (targetPiece && isWhite !== isWhitePiece(targetPiece)) {
          moves.push([row + direction, col + i]);
        }
      }
    }

    // En passant
    if (enPassantTarget) {
      const [epRow, epCol] = enPassantTarget;
      if (row === (isWhite ? 3 : 4) && Math.abs(col - epCol) === 1) {
        moves.push([epRow + (isWhite ? -1 : 1), epCol]);
      }
    }

    return moves;
  };

  const getRookMoves = (row, col, isWhite) => {
    const moves = [];
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (!board[x][y]) {
          moves.push([x, y]);
        } else {
          if (isWhite !== isWhitePiece(board[x][y])) {
            moves.push([x, y]);
          }
          break;
        }
        x += dx;
        y += dy;
      }
    }

    return moves;
  };

  const getKnightMoves = (row, col, isWhite) => {
    const moves = [];
    const offsets = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (let [dx, dy] of offsets) {
      const x = row + dx;
      const y = col + dy;
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (!board[x][y] || isWhite !== isWhitePiece(board[x][y])) {
          moves.push([x, y]);
        }
      }
    }

    return moves;
  };

  const getBishopMoves = (row, col, isWhite) => {
    const moves = [];
    const directions = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (!board[x][y]) {
          moves.push([x, y]);
        } else {
          if (isWhite !== isWhitePiece(board[x][y])) {
            moves.push([x, y]);
          }
          break;
        }
        x += dx;
        y += dy;
      }
    }

    return moves;
  };

  const getQueenMoves = (row, col, isWhite) => {
    return [
      ...getRookMoves(row, col, isWhite),
      ...getBishopMoves(row, col, isWhite),
    ];
  };

  const getKingMoves = (row, col, isWhite) => {
    const moves = [];
    const offsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let [dx, dy] of offsets) {
      const x = row + dx;
      const y = col + dy;
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (!board[x][y] || isWhite !== isWhitePiece(board[x][y])) {
          moves.push([x, y]);
        }
      }
    }

    // Castling moves will be handled separately to avoid recursion

    return moves;
  };

  // Function to check if castling is possible
  const canCastle = (isWhite, isKingSide) => {
    const row = isWhite ? 7 : 0;
    const kingCol = 4;
    const rookCol = isKingSide ? 7 : 0;
    const direction = isKingSide ? 1 : -1;

    // Check if the path is clear
    for (let i = 1; i < (isKingSide ? 3 : 4); i++) {
      if (board[row][kingCol + i * direction]) {
        return false;
      }
    }

    // Check if the king or the rook has moved
    const castlingRights = isWhite
      ? castlingRights.white
      : castlingRights.black;
    if (isKingSide && !castlingRights.kingSide) return false;
    if (!isKingSide && !castlingRights.queenSide) return false;

    // Check if the king is in check or passes through a checked square
    for (let i = 0; i < 3; i++) {
      if (isSquareUnderAttack(board, row, kingCol + i * direction, isWhite)) {
        return false;
      }
    }

    return true;
  };

  // Function to check if a move would put the king in check
  const wouldBeInCheck = (startRow, startCol, endRow, endCol, isWhite) => {
    const tempBoard = board.map((row) => [...row]);
    tempBoard[endRow][endCol] = tempBoard[startRow][startCol];
    tempBoard[startRow][startCol] = null;

    const kingPos = findKing(tempBoard, isWhite);
    return isSquareUnderAttack(tempBoard, kingPos[0], kingPos[1], isWhite);
  };

  // Function to find the king's position
  const findKing = (board, isWhite) => {
    const kingSymbol = isWhite ? "K" : "k";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === kingSymbol) {
          return [i, j];
        }
      }
    }
  };

  // Function to check if a square is under attack
  const isSquareUnderAttack = (board, row, col, isWhite) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece && isWhite !== isWhitePiece(piece)) {
          const moves = getPossibleMoves(i, j, false);
          if (moves.some(([r, c]) => r === row && c === col)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Function to check if the current player is in check
  const isInCheck = (isWhite) => {
    const kingPos = findKing(board, isWhite);
    return isSquareUnderAttack(board, kingPos[0], kingPos[1], isWhite);
  };

  // Function to check if the current player is in checkmate
  const isInCheckmate = (isWhite) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece && isWhite === isWhitePiece(piece)) {
          const moves = getPossibleMoves(i, j);
          if (moves.length > 0) {
            return false;
          }
        }
      }
    }
    return isInCheck(isWhite);
  };

  // Function to check if the game is in stalemate
  const isInStalemate = (isWhite) => {
    if (isInCheck(isWhite)) {
      return false;
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece && isWhite === isWhitePiece(piece)) {
          const moves = getPossibleMoves(i, j);
          if (moves.length > 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // Function to check for insufficient material (K vs. K, K vs. KB, K vs. KN)
  const hasInsufficientMaterial = () => {
    const pieces = board.flat().filter((piece) => piece !== null);
    if (pieces.length === 2) return true; // K vs. K
    if (pieces.length === 3) {
      const nonKings = pieces.filter((piece) => piece.toLowerCase() !== KING);
      if (
        nonKings.length === 1 &&
        (nonKings[0].toLowerCase() === BISHOP ||
          nonKings[0].toLowerCase() === KNIGHT)
      ) {
        return true; // K vs. KB or K vs. KN
      }
    }
    return false;
  };

  // Function to handle piece movement
  const movePiece = (startRow, startCol, endRow, endCol) => {
    const newBoard = board.map((row) => [...row]);
    const movingPiece = newBoard[startRow][startCol];
    const isWhite = isWhitePiece(movingPiece);

    // Handle en passant capture
    if (
      movingPiece.toLowerCase() === PAWN &&
      endCol === enPassantTarget?.[1] &&
      endRow === (isWhite ? 2 : 5)
    ) {
      newBoard[isWhite ? 3 : 4][endCol] = null;
    }

    // Move the piece
    newBoard[endRow][endCol] = movingPiece;
    newBoard[startRow][startCol] = null;

    // Handle pawn promotion
    if (movingPiece.toLowerCase() === PAWN && (endRow === 0 || endRow === 7)) {
      newBoard[endRow][endCol] = isWhite ? QUEEN.toUpperCase() : QUEEN;
    }

    // Handle castling (continued)
    if (
      movingPiece.toLowerCase() === KING &&
      Math.abs(startCol - endCol) === 2
    ) {
      const rookStartCol = endCol > startCol ? 7 : 0;
      const rookEndCol = endCol > startCol ? endCol - 1 : endCol + 1;
      newBoard[endRow][rookEndCol] = newBoard[endRow][rookStartCol];
      newBoard[endRow][rookStartCol] = null;
    }

    // Update castling rights
    if (movingPiece === KING.toUpperCase()) {
      setCastlingRights((prev) => ({
        ...prev,
        white: { kingSide: false, queenSide: false },
      }));
    } else if (movingPiece === KING.toLowerCase()) {
      setCastlingRights((prev) => ({
        ...prev,
        black: { kingSide: false, queenSide: false },
      }));
    } else if (movingPiece === ROOK.toUpperCase()) {
      if (startRow === 7 && startCol === 0) {
        setCastlingRights((prev) => ({
          ...prev,
          white: { ...prev.white, queenSide: false },
        }));
      } else if (startRow === 7 && startCol === 7) {
        setCastlingRights((prev) => ({
          ...prev,
          white: { ...prev.white, kingSide: false },
        }));
      }
    } else if (movingPiece === ROOK.toLowerCase()) {
      if (startRow === 0 && startCol === 0) {
        setCastlingRights((prev) => ({
          ...prev,
          black: { ...prev.black, queenSide: false },
        }));
      } else if (startRow === 0 && startCol === 7) {
        setCastlingRights((prev) => ({
          ...prev,
          black: { ...prev.black, kingSide: false },
        }));
      }
    }

    // Set en passant target
    if (
      movingPiece.toLowerCase() === PAWN &&
      Math.abs(startRow - endRow) === 2
    ) {
      setEnPassantTarget([isWhite ? endRow + 1 : endRow - 1, endCol]);
    } else {
      setEnPassantTarget(null);
    }

    // Update half move clock
    if (movingPiece.toLowerCase() === PAWN || newBoard[endRow][endCol]) {
      setHalfMoveClock(0);
    } else {
      setHalfMoveClock((prev) => prev + 1);
    }

    // Update full move number
    if (!isWhite) {
      setFullMoveNumber((prev) => prev + 1);
    }

    // Update the board
    setBoard(newBoard);

    // Switch players
    setCurrentPlayer(isWhite ? "black" : "white");

    // Check game status
    updateGameStatus(newBoard, !isWhite);

    // Add move to history
    addMoveToHistory(
      startRow,
      startCol,
      endRow,
      endCol,
      movingPiece,
      newBoard[endRow][endCol]
    );
  };

  // Function to update game status
  const updateGameStatus = (newBoard, isWhite) => {
    const kingPos = findKing(newBoard, isWhite);
    if (isInCheck(kingPos[0], kingPos[1], isWhite)) {
      if (isInCheckmate(isWhite)) {
        setGameStatus("checkmate");
      } else {
        setGameStatus("check");
      }
    } else if (isInStalemate(isWhite)) {
      setGameStatus("stalemate");
    } else if (hasInsufficientMaterial()) {
      setGameStatus("draw");
    } else if (halfMoveClock >= 100) {
      setGameStatus("draw"); // 50-move rule
    } else {
      setGameStatus("active");
    }
  };

  // Function to add move to history
  const addMoveToHistory = (
    startRow,
    startCol,
    endRow,
    endCol,
    piece,
    capturedPiece
  ) => {
    const files = "abcdefgh";
    const ranks = "87654321";
    const moveNotation = `${piece}${files[startCol]}${ranks[startRow]}-${
      files[endCol]
    }${ranks[endRow]}${capturedPiece ? "x" : ""}`;
    setMoveHistory((prev) => [...prev, moveNotation]);
  };

  // Function to handle piece selection and movement
  const handleSquareClick = (row, col) => {
    if (gameStatus !== "active") return;

    if (!selectedPiece) {
      const piece = board[row][col];
      if (
        piece &&
        ((currentPlayer === "white" && isWhitePiece(piece)) ||
          (currentPlayer === "black" && isBlackPiece(piece)))
      ) {
        setSelectedPiece({ row, col });
      }
    } else {
      const possibleMoves = getPossibleMoves(
        selectedPiece.row,
        selectedPiece.col
      );
      if (possibleMoves.some(([r, c]) => r === row && c === col)) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
        setSelectedPiece(null);
      } else {
        setSelectedPiece(null);
      }
    }
  };

  // Function to get piece symbol
  const getPieceSymbol = (piece) => {
    switch (piece?.toLowerCase()) {
      case PAWN:
        return "♟";
      case ROOK:
        return "♜";
      case KNIGHT:
        return "♞";
      case BISHOP:
        return "♝";
      case QUEEN:
        return "♛";
      case KING:
        return "♚";
      default:
        return "";
    }
  };

  // Render function
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Chess Game</h1>
      <div className="bg-yellow-700 p-4 rounded-lg shadow-lg">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-16 h-16 flex items-center justify-center text-4xl cursor-pointer
                    ${
                      (rowIndex + colIndex) % 2 === 0
                        ? "bg-yellow-200"
                        : "bg-yellow-600"
                    }
                    ${
                      selectedPiece &&
                      selectedPiece.row === rowIndex &&
                      selectedPiece.col === colIndex
                        ? "bg-blue-400"
                        : ""
                    }
                    ${
                      getPossibleMoves(
                        selectedPiece?.row,
                        selectedPiece?.col
                      )?.some(([r, c]) => r === rowIndex && c === colIndex)
                        ? "bg-green-400"
                        : ""
                    }
                  `}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                <span
                  className={
                    piece && isWhitePiece(piece) ? "text-white" : "text-black"
                  }
                >
                  {getPieceSymbol(piece)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xl">Current Player: {currentPlayer}</p>
      <p className="mt-2 text-xl">Game Status: {gameStatus}</p>
      <div className="mt-4 max-h-40 overflow-y-auto">
        <h2 className="text-xl font-bold">Move History</h2>
        <ul>
          {moveHistory.map((move, index) => (
            <li key={index}>{`${index + 1}. ${move}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChessGame;

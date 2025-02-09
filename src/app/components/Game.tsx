
"use client";
import React, { useState } from "react";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import Image from "next/image";
import ClickOutsideHandler from "./ClickOutsideModal";

const Game: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: string[]): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Hàng ngang
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cột dọc
      [0, 4, 8], [2, 4, 6] // Đường chéo
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes("") ? null : "Draw";
  };

  const handleClick = (index: number) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);

    const result = calculateWinner(newSquares);
    if (result) {
      setWinner(result);
      if (result !== "Draw") {
        setScores({ ...scores, [result as "X" | "O"]: scores[result as "X" | "O"] + 1 });
      }
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen relative">
      {/* Hiển thị điểm số */}
      <ScoreBoard scores={scores} />

      {/* Hiển thị Player Icons */}
      <div className="flex items-center justify-between w-full">
        <div className={`flex flex-col  items-center transition-opacity ${isXNext ? "opacity-100" : "opacity-50"}`}>
          <Image src="/PlayerX.png" alt="Player 2" width={69} height={61} />
          <p className="text-lg font-sans text-black ">Player X</p>
        </div>
        <div className={`flex flex-col items-center transition-opacity ${!isXNext ? "opacity-100" : "opacity-50"}`}>
          <Image src="/PlayerO.png" alt="Player 1" width={69} height={61} />
          <p className="text-lg font-sans text-black ">Player O</p>
        </div>
      </div>

      {/* Bảng chơi */}
      <Board squares={squares} onClick={handleClick} />

      {/* Thông báo chiến thắng */}
      {winner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ClickOutsideHandler onClickOutside={resetGame}>
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
              <p className="text-2xl font-sans text-black">
                {winner === "Draw" ? "It's a Draw :>" : `Winner 🎉🎊`}
              </p>
              {winner === "X"
                ? (
                  <div className={`flex flex-col  items-center transition-opacity`}>
                    <Image src="/PlayerX.png" alt="Player 2" width={69} height={61} />
                    <p className="text-lg font-sans text-black ">Player X</p>
                  </div>
                )
                : winner === "O"
                  ? (
                    <div className={`flex flex-col items-center transition-opacity`}>
                      <Image src="/PlayerO.png" alt="Player 1" width={69} height={61} />
                      <p className="text-lg font-sans text-black ">Player O</p>
                    </div>
                  )
                  : (
                    <div className={`flex flex-row items-center gap-5 transition-opacity`}>
                      <Image src="/PlayerX.png" alt="Player 2" width={69} height={61} />
                      <Image src="/PlayerO.png" alt="Player 1" width={69} height={61} />

                    </div>
                  )}
            </div>
          </ClickOutsideHandler>
        </div>
      )
      }

      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Restart Game
      </button>
    </div >
  );
};

export default Game;


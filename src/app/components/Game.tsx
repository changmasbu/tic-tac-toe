
"use client";
import React, { useState } from "react";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import Image from "next/image";
import ClickOutsideHandler from "./ClickOutsideModal";
import CustomButton from "./ButtonComponenet";

const Game: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<string[][]>([]); // Lưu lịch sử các bước đi
  const [done, setDone] = useState<boolean>(false);
  const smooth = "transition-all duration-300 ease-in-out"
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
    setHistory([...history, squares]);

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);

    const result = calculateWinner(newSquares);
    if (result) {
      setWinner(result);
      setDone(true)
      setScores(prevScores => ({
        ...prevScores,
        ...(result === "Draw"
          ? { X: prevScores.X + 1, O: prevScores.O + 1 }
          : { [result]: prevScores[result as "X" | "O"] + 1 })
      }));
    }
    setIsXNext(!isXNext);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setSquares(previousState);
    setHistory(history.slice(0, history.length - 1));
    setIsXNext(!isXNext);
    setWinner(null);
    setDone(false);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setWinner(null);
    setIsXNext(true);
    setHistory([]);
    setDone(false);
  };

  const resetScore = () => {
    setSquares(Array(9).fill(""));
    setWinner(null);
    setIsXNext(true);
    setScores({ X: 0, O: 0 });
    setHistory([]);
    setDone(false);
  };


  return (
    <div className="flex flex-col justify-center max-w-[1100px] items-center gap-4 w-[1000px] min-h-screen relative">
      {/* ScoreBoard */}
      <ScoreBoard scores={scores} />
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        {/* Wrapper*/}
        <div className="flex flex-row justify-center md:justify-between w-full gap-10">
          {/* Player X */}
          <div className={`flex flex-col items-center ${smooth} ${isXNext ? "opacity-100" : "opacity-50 scale-90"}`}>
            <Image src="/PlayerX.svg" alt="Player X" width={219} height={360} className="md:w-full md:h-full w-[120px] h-[120px]" />
            <p className="text-[18px] md:text-[30px] font-sans text-black">Player X</p>
          </div>

          {/* Player O */}
          <div className={`flex flex-col items-center ${smooth} ${!isXNext ? "opacity-100" : "opacity-50 scale-90"}`}>
            <Image src="/PlayerO.svg" alt="Player O" width={219} height={219} className="md:w-full md:h-full w-[120px] h-[120px]" />
            <p className="text-[18px] md:text-[30px] font-sans text-black">Player O</p>
          </div>
        </div>

        {/* Board */}
        <Board isXNext={isXNext} squares={squares} onClick={handleClick} isWinners={done} />
      </div>
      {/* Thông báo chiến thắng */}
      {winner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ClickOutsideHandler onClickOutside={() => setWinner(null)}>
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
              <p className="text-2xl font-sans text-black">
                {winner === "Draw" ? "It's a Draw :>" : `Winner 🎉🎊`}
              </p>
              {winner === "X"
                ? (
                  <div className={`flex flex-col items-center transition-opacity`}>
                    <Image src="/PlayerX.svg" alt="Player 2" width={69} height={61} />
                    <p className="text-lg font-sans text-black ">Player X</p>
                  </div>
                )
                : winner === "O"
                  ? (
                    <div className={`flex flex-col items-center transition-opacity`}>
                      <Image src="/PlayerO.svg" alt="Player 1" width={69} height={61} />
                      <p className="text-lg font-sans text-black ">Player O</p>
                    </div>
                  )
                  : (
                    <div className={`flex flex-row items-center gap-5 transition-opacity`}>
                      <Image src="/PlayerX.svg" alt="Player 2" width={69} height={61} />
                      <Image src="/PlayerO.svg" alt="Player 1" width={69} height={61} />

                    </div>
                  )}
            </div>
          </ClickOutsideHandler>
        </div>
      )}
      <div className="flex flex-row justify-between w-auto gap-3 md:w-[290px]">
        <CustomButton onClick={handleUndo} iconSrc="/Undo.svg" className=" relative p-2" borderColor={"border-black"} ></CustomButton>
        <CustomButton onClick={resetGame} borderColor={"border-black"} textColor="text-black" className="relative p-2" >Restart</CustomButton>
        <CustomButton onClick={resetScore} borderColor={"border-black"} textColor="text-black" className="relative p-2" >Reset Score</CustomButton>
      </div>
    </div >
  );
};

export default Game;


"use client"
import React from "react";
import Square from "./Square";

type BoardProps = {
   squares: string[];
   onClick: (index: number) => void;
   isXNext?: boolean;
   isWinners?: boolean;
};

const Board: React.FC<BoardProps> = ({ squares, onClick, isXNext = true, isWinners = false }) => {
   const handleClick = (index: number) => {
      if (isWinners) return;
      onClick(index);
   };
   return (
      <div className="md:absolute flex justify-center m-[0px_auto] right-0 left-0">
         <div className={`min-w-[270px] max-w-[300px] grid grid-cols-3 gap-0 border-7 border-black p-1 shadow-[6px_8px_0px_0px_black]`}>
            {squares.map((square, index) => (
               <Square key={index} isXNext={isXNext} value={square} onClick={() => handleClick(index)} />

            ))}
         </div>
      </div>
   );
};


export default Board;



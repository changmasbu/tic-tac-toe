"use client"
import React from "react";
import Square from "./Square";

type BoardProps = {
   squares: string[];
   onClick: (index: number) => void;
};

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
   return (
      <div className="grid grid-cols-3 gap-0 border-7 border-black p-1 shadow-[6px_8px_0px_0px_black]">
         {squares.map((square, index) => (
            <Square key={index} value={square} onClick={() => onClick(index)} />
         ))}
      </div>
   );
};


export default Board;



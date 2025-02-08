"use client";
import React from "react";

type ScoreBoardProps = {
   scores: { X: number; O: number };
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
   return (
      <div className="flex justify-between w-64 p-4 bg-gray-100 rounded-lg shadow-md">
         <div className="text-xl font-bold font-sans text-[#59CE8F]">X: {scores.X}</div>
         <div className="text-xl font-bold font-sans text-[#4F98CA]">O: {scores.O}</div>
      </div>
   );
};

export default ScoreBoard;

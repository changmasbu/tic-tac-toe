// "use client";
// import Image from "next/image";
// import React from "react";

// type SquareProps = {
//    value: string;
//    onClick: () => void;
// };

// const Square: React.FC<SquareProps> = ({ value, onClick }) => {
//    return (
//       <button
//          className="w-[100px] h-[100px] flex items-center justify-center border-4 border-black bg-white text-4xl font-bold hover:bg-gray-200 transition"
//          onClick={onClick}
//       >
//          {value === "X" ? (
//             <Image src="/X.svg" alt="X" width={32} height={32} />
//          ) : value === "O" ? (
//             <Image src="/O.svg" alt="O" width={32} height={32} />
//          ) : null}
//       </button>
//    );
// };
// export default Square;
"use client";
import Image from "next/image";
import React, { useState } from "react";

type SquareProps = {
   value: string;
   onClick: () => void;
   isXNext: boolean;
};

const Square: React.FC<SquareProps> = ({ value, onClick, isXNext = true }) => {
   const [played, setPlayed] = useState(false);
   console.log(value)
   return (
      <button
         className={`w-[90px] h-[90px] md:w-[100px] md:h-[100px] flex items-center justify-center border-2 border-black bg-white text-4xl ${isXNext ? " hover:bg-[#ccfcd0]" : " hover:bg-[#c6f7fd]"}  transition`}
         onClick={() => {
            setPlayed(true);
            onClick();
         }}
      >
         {value === "X" ? (
            <div className={`piece ${played ? "drop" : ""}`}>
               <Image src="/X.svg" alt="X" width={50} height={50} />
            </div>
         ) : value === "O" ? (
            <div className={`piece ${played ? "drop" : ""}`}>
               <Image src="/O.svg" alt="O" width={50} height={50} />
            </div>
         ) : null}
      </button>
   );
};

export default Square;

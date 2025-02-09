// import React from "react";

// interface CustomButtonProps {
//    onClick?: () => void;
//    children: React.ReactNode;
//    className?: string;
//    bgColor?: string;
//    borderColor?: string;
//    textColor?: string;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({
//    onClick,
//    children,
//    className = "relative",
//    bgColor = "bg-transparent",
//    borderColor = "border-white",
//    textColor = "text-white"
// }) => {
//    return (
//       <button
//          onClick={onClick}
//          className={`px-6 py-3 ${textColor} ${bgColor} ${borderColor} border transition-transform duration-300 hover:scale-110 ${className}`}
//       >
//          {/* Tạo lớp border động nhưng không bị giật */}
//          <span
//             className={`absolute inset-0 border ${borderColor} transition-all duration-300 translate-x-1 translate-y-1`}
//          ></span>
//          <span className="relative">{children}</span>
//       </button>
//    );
// };

// export default CustomButton;
import React from "react";
import Image from "next/image";

interface CustomButtonProps {
   onClick?: () => void;
   children?: React.ReactNode;
   className?: string;
   bgColor?: string;
   borderColor?: string;
   textColor?: string;
   borderType?: "single" | "double"; // Border đơn hoặc đôi
   iconSrc?: string; // Đường dẫn icon
}

const CustomButton: React.FC<CustomButtonProps> = ({
   onClick,
   children,
   className = "relative px-6 py-3",
   bgColor = "bg-transparent",
   borderColor = "border-white",
   textColor = "text-white",
   borderType = "single",
   iconSrc,
}) => {
   return (
      <button
         onClick={onClick}
         className={` flex items-center justify-center gap-2 ${textColor} ${bgColor} ${borderColor} border transition-transform duration-300 hover:scale-105 ${className}`}
      >
         {/* Nếu là border đôi thì tạo lớp border động */}
         {borderType === "double" && (
            <span className={`absolute inset-0 border ${borderColor} transition-all duration-300 translate-x-1 translate-y-1`}></span>
         )}

         {/* Nếu có icon thì hiển thị */}
         {iconSrc && <Image src={iconSrc} alt="icon" width={34} height={34} />}

         {/* Nội dung của button */}
         {children && <span className="relative">{children}</span>}
      </button>
   );
};

export default CustomButton;

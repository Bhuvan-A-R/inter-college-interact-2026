"use client"
import React from "react";

interface OuterBoxProps {
  children: React.ReactNode; // To include any inner components like forms
  width?: string; // Optional width (e.g., "w-96")
  height?: string; // Optional height (e.g., "h-auto")
  bgColor?: string; // Background color (e.g., "bg-white" or "bg-gray-800")
}

const OuterBox: React.FC<OuterBoxProps> = ({
  children,
  width , // Default width
  height = "h-auto", // Default height
  bgColor = "bg-white", // Default background color
}) => {
  return (
    <div
      className={`rounded-lg shadow-lg p-6 ${width} ${height} ${bgColor} 
                  flex flex-col items-center justify-center`}
    >
      {children}
    </div>
  );
};

export default OuterBox;

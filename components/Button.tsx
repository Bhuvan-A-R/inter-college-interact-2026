"use client"
import React from "react";

const Button: React.FC<ButtonProps> = ({ label, OnClick } ) => {
    return (
        <div>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out" onClick={OnClick}>
        {label}
      </button>
      </div>
    );
  };


interface ButtonProps{
    label: string,
    OnClick?: () => void
}
export default Button;


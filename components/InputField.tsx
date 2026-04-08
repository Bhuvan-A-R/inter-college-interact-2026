"use client"
import React from 'react';

interface InputFieldProps {
  label: string; // Label text for the input field
  placeholder?: string; // Placeholder text for the input field
  type?: string; // Input type (e.g., text, password, email, etc.)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback for handling input changes
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type="text" ,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2 ">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-fit pr-2 pl-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-start"
      />
    </div>
  );
};

export default InputField;

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-neutral-800 mb-1.5">
        {label}
      </label>
      <input
        className={`w-full px-4 py-3 border ${error ? "border-red-500" : "border-neutral-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;

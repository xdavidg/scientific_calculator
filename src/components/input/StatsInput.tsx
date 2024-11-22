import React, { useState } from "react";

interface StatsInputProps {
  onSubmit: (numbers: number[]) => void;
  onClose: () => void;
  operation: 'MAD' | 'STD';
}

const StatsInput: React.FC<StatsInputProps> = ({ onSubmit, onClose, operation }) => {
  const [numbers, setNumbers] = useState<string>("");

  const handleSubmit = () => {
    const numberArray = numbers
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .map((n) => parseFloat(n));

    if (numberArray.some(isNaN)) {
      alert("Please enter valid numbers separated by commas");
      return;
    }

    onSubmit(numberArray);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[var(--keys-background)] p-4 rounded-lg w-80">
        <h3 className="text-[var(--text)] mb-4">
          Enter numbers for {operation === 'MAD' ? 'Mean Absolute Deviation' : 'Standard Deviation'} calculation
        </h3>
        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="e.g., 4,8,6,5,3"
          className="w-full p-2 mb-4 bg-[var(--display-background)] text-[var(--text)] rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsInput; 
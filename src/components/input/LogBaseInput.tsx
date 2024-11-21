import React, { useState } from "react";

interface LogBaseInputProps {
  onSubmit: (x: number, base: number) => void;
  onClose: () => void;
}

const LogBaseInput: React.FC<LogBaseInputProps> = ({ onSubmit, onClose }) => {
  const [values, setValues] = useState({
    x: "",
    base: ""
  });

  const handleSubmit = () => {
    const x = parseFloat(values.x);
    const base = parseFloat(values.base);

    if (isNaN(x) || isNaN(base)) {
      alert("Please enter valid numbers for all fields");
      return;
    }

    if (x <= 0) {
      alert("Value (x) must be positive");
      return;
    }

    if (base <= 0 || base === 1) {
      alert("Base must be positive and not equal to 1");
      return;
    }

    onSubmit(x, base);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[var(--keys-background)] p-4 rounded-lg w-80">
        <h3 className="text-[var(--text)] mb-4">Enter values for log_b(x)</h3>
        <div className="space-y-3">
          <div>
            <label className="text-[var(--text)] block mb-1">Value (x):</label>
            <input
              type="number"
              value={values.x}
              onChange={(e) => setValues({ ...values, x: e.target.value })}
              placeholder="Enter x"
              className="w-full p-2 bg-[var(--display-background)] text-[var(--text)] rounded"
            />
          </div>
          <div>
            <label className="text-[var(--text)] block mb-1">Base (b):</label>
            <input
              type="number"
              value={values.base}
              onChange={(e) => setValues({ ...values, base: e.target.value })}
              placeholder="Enter base"
              className="w-full p-2 bg-[var(--display-background)] text-[var(--text)] rounded"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
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

export default LogBaseInput; 
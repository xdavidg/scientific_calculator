import React, { useState } from "react";

interface ExponentialInputProps {
  onSubmit: (a: number, b: number, x: number) => void;
  onClose: () => void;
}

const ExponentialInput: React.FC<ExponentialInputProps> = ({ onSubmit, onClose }) => {
  const [values, setValues] = useState({
    a: "",
    b: "",
    x: ""
  });

  const handleSubmit = () => {
    const a = parseFloat(values.a);
    const b = parseFloat(values.b);
    const x = parseFloat(values.x);

    if (isNaN(a) || isNaN(b) || isNaN(x)) {
      alert("Please enter valid numbers for all fields");
      return;
    }

    if (b < 0) {
      alert("Base (b) must be positive for real number results");
      return;
    }

    onSubmit(a, b, x);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[var(--keys-background)] p-4 rounded-lg w-80">
        <h3 className="text-[var(--text)] mb-4">Enter values for ab^x calculation</h3>
        <div className="space-y-3">
          <div>
            <label className="text-[var(--text)] block mb-1">Coefficient (a):</label>
            <input
              type="number"
              value={values.a}
              onChange={(e) => setValues({ ...values, a: e.target.value })}
              placeholder="Enter a"
              className="w-full p-2 bg-[var(--display-background)] text-[var(--text)] rounded"
            />
          </div>
          <div>
            <label className="text-[var(--text)] block mb-1">Base (b):</label>
            <input
              type="number"
              value={values.b}
              onChange={(e) => setValues({ ...values, b: e.target.value })}
              placeholder="Enter b"
              className="w-full p-2 bg-[var(--display-background)] text-[var(--text)] rounded"
            />
          </div>
          <div>
            <label className="text-[var(--text)] block mb-1">Exponent (x):</label>
            <input
              type="number"
              value={values.x}
              onChange={(e) => setValues({ ...values, x: e.target.value })}
              placeholder="Enter x"
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

export default ExponentialInput;
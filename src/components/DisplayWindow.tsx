import React from 'react';

interface DisplayWindowProps {
  expression: string;
  result: string | number;
}

const DisplayWindow: React.FC<DisplayWindowProps> = ({ expression, result }) => {
  return (
    <div className="displayWindow bg-[var(--display-background)] text-[var(--text)]">
      <p className="expression opacity-50">{expression}</p>
      <p className="result">{result}</p>
    </div>
  );
};

export default DisplayWindow;
import React, { KeyboardEvent } from "react";

interface DisplayWindowProps {
  expression: string;
  result: string | number;
  onExpressionChange: (value: string) => void;
  onEnterPress: () => void;
}

const DisplayWindow: React.FC<DisplayWindowProps> = ({
  expression,
  result,
  onExpressionChange,
  onEnterPress,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterPress();
    }
  };

  return (
    <div className="displayWindow bg-[var(--display-background)] text-[var(--text)]">
      <input
        type="text"
        value={expression}
        onChange={(e) => onExpressionChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="expression opacity-50 w-full bg-transparent outline-none"
        placeholder="Type or use buttons..."
      />
      <p className="result">{result}</p>
    </div>
  );
};

export default DisplayWindow;

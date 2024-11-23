import React from "react";

interface KeysWindowProps {
  handleButton: (value: string) => void;
}

const KeysWindow: React.FC<KeysWindowProps> = ({ handleButton }) => {
  const sciKeys: string[] = [
    "sine",
    "cos",
    "ln",
    "log",
    "tan",
    "π",
    "e",
    "x²",
    "!",
    "√",
  ];

  const basicKeys: string[] = [
    "7",
    "8",
    "9",
    "*",
    "/",
    "4",
    "5",
    "6",
    "-",
    "(",
    "1",
    "2",
    "3",
    "+",
    ")",
    ".",
    "0",
    "DEL",
    "AC",
    "=",
  ];

  return (
    <div className="keysWindow bg-[var(--keys-background)]">
      <div className="keys_scientific">
        {sciKeys.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButton(item)}
            className="text-[var(--text)] hover:bg-[var(--key-hover)]"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="line bg-[var(--calculator-border)]"></div>
      <div className="keys_basic">
        {basicKeys.map((item, index) => (
          <button
            key={index}
            className={`
              ${item >= "0" && item <= "9" ? "number font-semibold" : ""}
              ${
                item === "="
                  ? "equal bg-[var(--equal-button)] text-[var(--equal-button-text)]"
                  : ""
              }
              text-[var(--text)] hover:bg-[var(--key-hover)]
            `}
            onClick={() => handleButton(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeysWindow;

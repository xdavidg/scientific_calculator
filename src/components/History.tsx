import React from "react";

interface HistoryProps {
  history: string[];
  clearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ history, clearHistory }) => {
  return (
    <div className="history-container p-4 bg-[var(--display-background)] border-t-[var(--calculator-border)]">
      <div className="history-header flex justify-end items-center">
        <button
          onClick={clearHistory}
          className="text-[var(--equal-button-text)] bg-[var(--equal-button)] px-4 py-2 rounded hover:bg-[var(--key-hover)]"
        >
          Clear History
        </button>
      </div>
      {history.length === 0 ? (
        <p className="mt-2">No calculations yet.</p>
      ) : (
        <ul className="history-list mt-2">
          {history.map((entry, index) => (
            <li key={index} className="p-2 border-b">
              {entry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;


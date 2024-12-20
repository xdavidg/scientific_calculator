import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";
import ExpandableSection from "./ExpandableSection";
import * as MathUtils from "./mathUtils";
import StatsInput from "./input/StatsInput";
import ExponentialInput from "./input/ExponentialInput";
import LogBaseInput from "./input/LogBaseInput";
import History from "./History";


// const HistorySection: React.FC<{
//   history: string[];
//   onClearHistory: () => void;
// }> = ({ history, onClearHistory }) => {
//   return (
//     <div className="history bg-[var(--display-background)] p-4 border-t-[var(--calculator-border)]">
//       <div className="history-header flex justify-between items-center">
//         <h3>History</h3>
//         <button
//           className="clear-history-button text-[var(--text)] bg-[var(--equal-button)] px-4 py-2 rounded"
//           onClick={onClearHistory}
//         >
//           Clear History
//         </button>
//       </div>
//       <ul className="history-list mt-2">
//         {history.map((entry, index) => (
//           <li key={index} className="history-item">
//             {entry}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [displayEXP, setDisplayEXP] = useState<string>("");
  const [result, setResult] = useState<string | number>("0");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMADInput, setShowMADInput] = useState(false);
  const [statsOperation, setStatsOperation] = useState<"MAD" | "STD">("MAD");
  const [showExpInput, setShowExpInput] = useState(false);
  const [showLogBaseInput, setShowLogBaseInput] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false); 



  const sciFunc: { [key: string]: string } = {
    sine: "sine",
    cos: "cos",
    tan: "tan",
    sinh: "sinh",
    ln: "ln",
    log: "log",
    π: "π",
    e: "e",
    "x²": "^2",
    "√": "sqrt",
    "^": "^",
    "!": "!",
    arccos: "arccos",
  };

  const calcResult = (): void => {
    if (expression.length !== 0) {
      try {
        let compute = MathUtils.evaluate(expression);
        compute = parseFloat(compute.toFixed(9));
        if (isNaN(compute)) {
          setResult("An Error Occurred!");
        } else {
          setResult(compute);
          setHistory([...history, `${expression} = ${compute}`]); 

        }
      } catch (error) {
        if (error instanceof Error) {
          setResult(error.message);
        } else {
          setResult("An Error Occurred!");
        }
      }
    } else {
      setResult("An Error Occurred!");
    }
  };

  const handleButton = (value: string): void => {
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (value === "log_b(x)") {
      setShowLogBaseInput(true);
    } else if (value === "ab^x") {
      setShowExpInput(true);
    } else if (value in sciFunc) {
      if (value === "x²") {
        setDisplayEXP(displayEXP + "^2");
        setExpression(expression + "^2");
      } else if (value === "√") {
        setDisplayEXP(displayEXP + "√(");
        setExpression(expression + "sqrt(");
      } else if (value === "π" || value === "e") {
        setDisplayEXP(displayEXP + value);
        setExpression(expression + value);
      } else if (value === "!") {
        setDisplayEXP(displayEXP + "!");
        setExpression(expression + "!");
      } else if (value === "arccos") {
        setDisplayEXP(displayEXP + "arccos(");
        setExpression(expression + "arccos(");
      } else {
        setDisplayEXP(displayEXP + value + "(");
        setExpression(expression + sciFunc[value] + "(");
      }
    } else if (value === "=") {
      calcResult();
    } else if (value === "MAD" || value === "σ") {
      setStatsOperation(value === "MAD" ? "MAD" : "STD");
      setShowMADInput(true);
    } else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  };

  const handleStatsSubmit = (numbers: number[]): void => {
    const operation = statsOperation === "MAD" ? "MAD" : "STD";
    const expression = `${operation}[${numbers.join(",")}]`;
    setExpression(expression + expression);
    setDisplayEXP(displayEXP + `${operation}(${numbers.join(",")})`);
  };

  const handleExponentialSubmit = (a: number, b: number, x: number): void => {
    const result = `(${a}*${b}^${x})`;
    setExpression(expression + result);
    setDisplayEXP(displayEXP + result);
  };

  const handleLogBaseSubmit = (x: number, base: number): void => {
    const expression = `log_${base}(${x})`;
    setExpression(expression);
    setDisplayEXP(expression);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const clearHistory = (): void => {
    setHistory([]);
  };

  const handleExpressionChange = (value: string): void => {
    setDisplayEXP(value);
    // Convert display expressions to evaluation format
    let evalExpression = value
      .replace(/π/g, "π")
      .replace(/√\(/g, "sqrt(")
      .replace(/\^2/g, "^2")
      .replace(/sin\(/g, "sine(")
      .replace(/MAD\(([\d,\s\.]+)\)/g, "MAD[$1]")
      .replace(/STD\(([\d,\s\.]+)\)/g, "STD[$1]")
      .replace(/σ\(([\d,\s\.]+)\)/g, "STD[$1]")
      .replace(/log_(\d+)\(/g, "log_$1(");

    setExpression(evalExpression);
  };

  const handleEnterPress = (): void => {
    calcResult();
  };

 

  return (
    <div className="calculator bg-[var(--keys-background)] border-[var(--calculator-border)] flex">
      <ExpandableSection
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        handleButton={handleButton}
      />
      <div className="flex-1">
        <DisplayWindow
          expression={displayEXP}
          result={result}
          onExpressionChange={handleExpressionChange}
          onEnterPress={handleEnterPress}
        />
        <KeysWindow handleButton={handleButton} />
        <button
          className="history-toggle-button text-[var(--equal-button-text)] bg-[var(--equal-button)] px-4 py-2 rounded hover:bg-[var(--key-hover)]"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
        {showHistory && <History history={history} clearHistory={clearHistory} />}
      </div>
      {showMADInput && (
        <StatsInput
          onSubmit={handleStatsSubmit}
          onClose={() => setShowMADInput(false)}
          operation={statsOperation}
        />
      )}
      {showExpInput && (
        <ExponentialInput
          onSubmit={handleExponentialSubmit}
          onClose={() => setShowExpInput(false)}
        />
      )}
      {showLogBaseInput && (
        <LogBaseInput
          onSubmit={handleLogBaseSubmit}
          onClose={() => setShowLogBaseInput(false)}
        />
      )}
    </div>
  );
};

export default Calculator;

import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";
import ExpandableSection from "./ExpandableSection";
import * as MathUtils from "./mathUtils";
import StatsInput from "./input/StatsInput";
import ExponentialInput from "./input/ExponentialInput";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [displayEXP, setDisplayEXP] = useState<string>("");
  const [result, setResult] = useState<string | number>("0");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMADInput, setShowMADInput] = useState(false);
  const [statsOperation, setStatsOperation] = useState<'MAD' | 'STD'>('MAD');
  const [showExpInput, setShowExpInput] = useState(false);

  const sciFunc: { [key: string]: string } = {
    sin: "sin",
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
      setStatsOperation(value === "MAD" ? 'MAD' : 'STD');
      setShowMADInput(true);
    } else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  };

  const handleStatsSubmit = (numbers: number[]): void => {
    const operation = statsOperation === 'MAD' ? 'MAD' : 'STD';
    const expression = `${operation}[${numbers.join(",")}]`;
    setExpression(expression + expression);
    setDisplayEXP(displayEXP + `${operation}(${numbers.join(",")})`);
  };

  const handleExponentialSubmit = (a: number, b: number, x: number): void => {
    const result = `(${a}*${b}^${x})`;
    setExpression(expression + result);
    setDisplayEXP(displayEXP + result);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="calculator bg-[var(--keys-background)] border-[var(--calculator-border)] flex">
      <ExpandableSection
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        handleButton={handleButton}
      />
      <div className="flex-1">
        <DisplayWindow expression={displayEXP} result={result} />
        <KeysWindow handleButton={handleButton} />
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
    </div>
  );
};

export default Calculator;

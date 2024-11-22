// Constants
export const PI = 3.141592653589793;
export const E = 2.718281828459045;

// BASIC ARITHMETIC FUNCTIONS
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;
export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};
// END OF BASIC ARITHMETIC FUNCTIONS

// ADVANCED ARITHMETIC FUNCTIONS
// Square root function
export const sqrt = (x: number): number => {
  if (x < 0) throw new Error("Cannot calculate square root of negative number");
  if (x === 0) return 0;
  let guess = x / 2;
  for (let i = 0; i < 15; i++) {
    guess = (guess + x / guess) / 2;
  }
  return guess;
};

// Factorial
export const factorial = (n: number): number => {
  if (n < 0 || n % 1 !== 0)
    throw new Error("Factorial is only defined for non-negative integers");
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Logarithmic functions
export const ln = (x: number): number => {
  if (x <= 0)
    throw new Error("Cannot calculate logarithm of non-positive number");

  // Constants for common logarithm values
  const LN2 = 0.693147180559945;
  const LN10 = 2.302585092994046;

  // For very large numbers, use log properties to reduce to smaller numbers
  if (x > 10) {
    // Find the largest power of 10 less than x
    let power = 0;
    let temp = x;
    while (temp >= 10) {
      temp /= 10;
      power += 1;
    }
    return ln(temp) + power * LN10;
  }

  // For very small numbers, use negative log property
  if (x < 0.1) {
    return -ln(1 / x);
  }

  // For numbers close to 1, use the series expansion directly
  if (0.9 <= x && x <= 1.1) {
    const y = x - 1;
    let term = y;
    let sum = term;
    let n = 2;

    while (abs(term) > 1e-15) {
      term = (-term * y * (n - 1)) / n;
      sum += term;
      n++;
    }
    return sum;
  }

  // For remaining numbers, reduce to [0.9, 1.1] range using power of 2
  let result = 0;
  let value = x;

  // Reduce large values
  while (value > 1.1) {
    value /= 2;
    result += LN2;
  }

  // Increase small values
  while (value < 0.9) {
    value *= 2;
    result -= LN2;
  }

  // Now value is in [0.9, 1.1], use series expansion
  const y = value - 1;
  let term = y;
  let sum = term;
  let n = 2;

  while (abs(term) > 1e-15) {
    term = (-term * y * (n - 1)) / n;
    sum += term;
    n++;
  }

  return result + sum;
};

// Logarithmic functions
export const log10 = (x: number): number => {
  return ln(x) / ln(10);
};

// Trigonometric functions
export const sin = (x: number): number => {
  x = x % (2 * PI);
  let result = 0;
  let term = x;
  for (let i = 1; i <= 15; i++) {
    result += term;
    term *= (-x * x) / (2 * i * (2 * i + 1));
  }
  return result;
};

export const cos = (x: number): number => {
  x = x % (2 * PI);
  let result = 1;
  let term = 1;
  for (let i = 1; i <= 15; i++) {
    term *= (-x * x) / ((2 * i - 1) * (2 * i));
    result += term;
  }
  return result;
};

export const tan = (x: number): number => {
  const sinX = sin(x);
  const cosX = cos(x);
  if (cosX === 0) throw new Error("Tangent undefined for this input");
  return sinX / cosX;
};
// END OF ADVANCED ARITHMETIC FUNCTIONS

// HELPER FUNCTIONS
// Exponential function : Helper function
export const exp = (x: number): number => {
  let result = 1;
  let term = 1;
  for (let i = 1; i <= 100; i++) {
    term *= x / i;
    result += term;
    if (abs(term) < 1e-15) break;
  }
  return result;
};

// Absolute value : Helper function
export const abs = (x: number): number => {
  return x < 0 ? -x : x;
};

// Floor function: Helper function
export const floor = (x: number): number => {
  return x - (x % 1);
};
// END OF HELPER FUNCTIONS

// SPECIAL FUNCTIONS
// Hyperbolic functions
export const sinh = (x: number): number => {
  return (exp(x) - exp(-x)) / 2;
};

// Power and root functions
export const power = (base: number, exponent: number): number => {
  if (base < 0 && exponent % 1 !== 0) {
    throw new Error(
      "Cannot raise a negative number to a non-integer exponent (results in complex number)"
    );
  }
  if (base === 0 && exponent < 0) {
    throw new Error("Cannot raise 0 to a negative exponent (division by zero)");
  }
  if (exponent === 0) return 1;
  if (exponent < 0) return 1 / power(base, -exponent);
  if (exponent % 1 !== 0) {
    return exp(exponent * ln(base));
  }
  let result = 1;
  while (exponent > 0) {
    if (exponent % 2 === 1) result *= base;
    exponent = floor(exponent / 2);
    base *= base;
  }
  return result;
};

// Inverse cosine (arccos)
export const arccos = (x: number): number => {
  if (x < -1 || x > 1)
    throw new Error("arccos is only defined for values between -1 and 1");

  if (x == -1) return PI;
  if (x == 1) return 0;

  let low = 0;
  let high = PI;
  let mid = 0;

  while (high - low > 1e-12) {
    mid = (low + high) / 2;
    const cosMid = cos(mid);

    if (cosMid > x) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return (low + high) / 2;
};

export const meanAbsoluteDeviation = (data: number[]): number => {
  if (data.length === 0) throw new Error("Data array cannot be empty");

  // Calculate the mean
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;

  // Calculate the mean absolute deviation
  const mad =
    data.reduce((sum, value) => sum + abs(value - mean), 0) / data.length;

  return mad;
};

export const standardDeviation = (data: number[]): number => {
  if (data.length === 0) throw new Error("Data array cannot be empty");

  // Calculate the mean
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;

  // Calculate sum of squared differences from mean
  const sumSquaredDiff = data.reduce((sum, value) => {
    const diff = value - mean;
    return sum + diff * diff;
  }, 0);

  // Calculate variance (mean of squared differences)
  const variance = sumSquaredDiff / data.length;

  // Return standard deviation (square root of variance)
  return sqrt(variance);
};

// Custom base logarithm function
export const logBase = (x: number, base: number): number => {
  if (x <= 0)
    throw new Error("Cannot calculate logarithm of non-positive number");
  if (base <= 0 || base === 1)
    throw new Error("Base must be positive and not equal to 1");

  return ln(x) / ln(base);
};

// END OF SPECIAL FUNCTIONS

// Custom expression parser and evaluator
export const evaluate = (expression: string): number => {
  // First, handle MAD and STD expressions separately before general tokenization
  const processStatExpression = (expr: string): string => {
    return expr.replace(/(?:MAD|STD)\[([-\d,\s\.]+)\]/g, (match, numbers) => {
      // Extract the operation (MAD or STD)
      const operation = match.startsWith("MAD") ? "MAD" : "STD";

      // Parse numbers properly handling negatives
      const numberArray = numbers
        .split(",")
        .map((n: string) => parseFloat(n.trim()));

      // Calculate result
      const result =
        operation === "MAD"
          ? meanAbsoluteDeviation(numberArray)
          : standardDeviation(numberArray);

      return result.toString();
    });
  };

  // Pre-process MAD and STD expressions
  expression = processStatExpression(expression);

  // Pre-process expressions where numbers are directly followed by constants
  expression = expression.replace(/(-?\d+)([πe])/g, '$1*$2');

  // Updated regex to handle negative numbers and negative constants
  const tokens = expression.match(
    /(?:-?\d*\.?\d+)|(?:-?[πe])|[-+*/()^!]|sin|cos|tan|sinh|ln|log_\d+|log|sqrt|arccos/g
  ) || [];

  const output: (number | string)[] = [];
  const operators: string[] = [];

  const precedence: { [key: string]: number } = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
    "!": 4,
    sin: 5,
    cos: 5,
    tan: 5,
    sinh: 5,
    ln: 5,
    log: 5,
    sqrt: 5,
    arccos: 5,
  };

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      output.push(parseFloat(token));
    } else if (token === "π" || token === "-π") {
      output.push(token === "π" ? PI : -PI);
    } else if (token === "e" || token === "-e") {
      output.push(token === "e" ? E : -E);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop()!);
      }
      operators.pop();
    } else {
      while (
        operators.length &&
        operators[operators.length - 1] !== "(" &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    }
  }

  while (operators.length) {
    output.push(operators.pop()!);
  }

  const stack: number[] = [];
  for (const token of output) {
    if (typeof token === "number") {
      stack.push(token);
    } else {
      // Check if token is a MAD expression
      if (token.startsWith("MAD[")) {
        const numbersMatch = token.match(/MAD\[(.*)\]/);
        if (!numbersMatch) throw new Error("Invalid MAD format");

        const numbers = numbersMatch[1]
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n !== "")
          .map((n) => {
            const num = parseFloat(n);
            if (isNaN(num))
              throw new Error("Invalid number in MAD calculation");
            return num;
          });

        if (numbers.length === 0)
          throw new Error("Empty array in MAD calculation");
        stack.push(meanAbsoluteDeviation(numbers));
      } else if (token.startsWith("STD[")) {
        const numbersMatch = token.match(/STD\[(.*)\]/);
        if (!numbersMatch) throw new Error("Invalid STD format");

        const numbers = numbersMatch[1]
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n !== "")
          .map((n) => {
            const num = parseFloat(n);
            if (isNaN(num))
              throw new Error("Invalid number in STD calculation");
            return num;
          });

        if (numbers.length === 0)
          throw new Error("Empty array in STD calculation");
        stack.push(standardDeviation(numbers));
      } else {
        // Add handling for log_b expression
        if (token.startsWith("log_")) {
          const base = parseInt(token.slice(4));
          const x = stack.pop()!;
          stack.push(logBase(x, base));
        } else {
          switch (token) {
            case "+": {
              const b = stack.pop()!;
              const a = stack.pop()!;
              stack.push(add(a, b));
              break;
            }
            case "-": {
              const b = stack.pop()!;
              const a = stack.pop()!;
              stack.push(subtract(a, b));
              break;
            }
            case "*": {
              const b = stack.pop()!;
              const a = stack.pop()!;
              stack.push(multiply(a, b));
              break;
            }
            case "/": {
              const b = stack.pop()!;
              const a = stack.pop()!;
              stack.push(divide(a, b));
              break;
            }
            case "^": {
              const b = stack.pop()!;
              const a = stack.pop()!;
              stack.push(power(a, b));
              break;
            }
            case "sin": {
              const a = stack.pop()!;
              stack.push(sin(a));
              break;
            }
            case "cos": {
              const a = stack.pop()!;
              stack.push(cos(a));
              break;
            }
            case "tan": {
              const a = stack.pop()!;
              stack.push(tan(a));
              break;
            }
            case "sinh": {
              const a = stack.pop()!;
              stack.push(sinh(a));
              break;
            }
            case "ln": {
              const a = stack.pop()!;
              stack.push(ln(a));
              break;
            }
            case "log": {
              const a = stack.pop()!;
              stack.push(log10(a));
              break;
            }
            case "sqrt": {
              const a = stack.pop()!;
              stack.push(sqrt(a));
              break;
            }
            case "!": {
              const a = stack.pop()!;
              stack.push(factorial(a));
              break;
            }
            case "arccos": {
              const a = stack.pop()!;
              stack.push(arccos(a));
              break;
            }
          }
        }
      }
    }
  }

  return stack[0];
};

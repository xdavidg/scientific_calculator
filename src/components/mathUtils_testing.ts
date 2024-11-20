//  *******WRITE YOUR FUNCTIONS HERE******
//  *******DO NOT USE MATH LIB******
//
//

// Constants
export const PI = 3.141592653589793;
export const E = 2.718281828459045;

// Basic arithmetic
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;
export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

// Floor function
export const floor = (x: number): number => {
  return x - (x % 1);
};

// Absolute value
export const abs = (x: number): number => {
  return x < 0 ? -x : x;
};

// Power and root functions
export const power = (base: number, exponent: number): number => {
  if (base < 0 && exponent % 1 !== 0) {
    throw new Error(
      "Cannot raise a negative number to a non-integer exponent (results in complex number)",
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

export const sqrt = (x: number): number => {
  if (x < 0) throw new Error("Cannot calculate square root of negative number");
  if (x === 0) return 0;
  let guess = x / 2;
  for (let i = 0; i < 10; i++) {
    guess = (guess + x / guess) / 2;
  }
  return guess;
};

// Exponential function
export const exp = (x: number): number => {
  let result = 1;
  let term = 1;
  for (let i = 1; i <= 100; i++) {
    term *= x / i;
    result += term;
    if (abs(term) < 1e-10) break;
  }
  return result;
};

// Trigonometric functions
export const sin = (x: number): number => {
  x = x % (2 * PI);
  let result = 0;
  let term = x;
  for (let i = 1; i <= 10; i++) {
    result += term;
    term *= (-x * x) / (2 * i * (2 * i + 1));
  }
  return result;
};

export const cos = (x: number): number => {
  x = x % (2 * PI);
  let result = 1;
  let term = 1;
  for (let i = 1; i <= 10; i++) {
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

// Hyperbolic functions
export const sinh = (x: number): number => {
  return (exp(x) - exp(-x)) / 2;
};

// Logarithmic functions
export const ln = (x: number): number => {
  if (x <= 0)
    throw new Error("Cannot calculate logarithm of non-positive number");
  let guess = x - 1;
  for (let i = 0; i < 100; i++) {
    guess = guess + (2 * (x - exp(guess))) / (x + exp(guess));
    if (abs((x - exp(guess)) / x) < 1e-10) break;
  }
  return guess;
};

export const log10 = (x: number): number => {
  return ln(x) / ln(10);
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

/*
// Inverse cosine (arccos)
export const arccos = (x: number): number => {
  if (x < -1 || x > 1)
    throw new Error("arccos is only defined for values between -1 and 1");
  return PI / 2 - arcsin(x);
};

// Helper function for arccos
export const arcsin = (x: number): number => {
  if (x < -1 || x > 1)
    throw new Error("arcsin is only defined for values between -1 and 1");
  return atan(x / sqrt(1 - x * x));
};

// Helper function for arcsin
export const atan = (x: number): number => {
  let result = 0;
  let term = x;
  let sign = 1;
  for (let i = 1; i <= 100; i += 2) {
    result += (sign * term) / i;
    term *= x * x;
    sign *= -1;
    if (abs(term / i) < 1e-10) break;
  }
  return result;
};
*/

// Custom expression parser and evaluator
export const evaluate = (expression: string): number => {
  const tokens =
    expression.match(
      /(\d+\.?\d*|[\+\-\*/$$$$\^!]|sin|cos|tan|sinh|ln|log|sqrt|π|e|arccos)/g,
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
    } else if (token === "π") {
      output.push(PI);
    } else if (token === "e") {
      output.push(E);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop()!);
      }
      operators.pop(); // Remove the '('
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

  return stack[0];
};

// Mean Absolute Deviation (MAD)
export const meanAbsoluteDeviation = (data: number[]): number => {
  if (data.length === 0) throw new Error("Data array cannot be empty");

  // Calculate the mean
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;

  // Calculate the mean absolute deviation
  const mad = data.reduce((sum, value) => sum + abs(value - mean), 0) / data.length;

  return mad;
};

// Approximate cosine using Taylor series
export const cosine = (x: number, terms: number = 20): number =>{
  let sum = 0;
   for (let n = 0; n < terms; n++) {
     const term = power(-1, n) * power(x, 2 * n) / factorial(2 * n);
     sum += term;
   }
   return sum;
 }

//Inverse Cosine Function using the bisection method
export const arccos = (x: number): number => {
  if (x < -1 || x > 1)
    throw new Error("arccos is only defined for values between -1 and 1");

  if (x == -1) return PI; 
  if (x == 1) return 0; 

  //It gives an angle from 0 to PI
  let low = 0; 
  let high = PI; 
  let mid = 0;

  //Do several iterations until the interval is sufficiently small 
  while (high - low > 1e-7) { 
    mid = (low + high) / 2;

    // Compute cosine of midpoint
    const cosMid = cosine(mid); 
    
    if (cosMid > x) { //arccos lies in the interval [mid, high]
      low = mid;
    } else { //arccos lies in the interval [low, mid]
      high = mid;
    }
  }

  return (low + high) / 2;
};


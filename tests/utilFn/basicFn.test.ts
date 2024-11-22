import { expect, test, describe } from "vitest";
import {
  add,
  subtract,
  multiply,
  divide,
} from "../../src/components/mathUtils";

describe("add function", () => {
  test("1 + 2 is 3", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("-1 + -1 is -2", () => {
    expect(add(-1, -1)).toBe(-2);
  });

  test("0 + 5 is 5", () => {
    expect(add(0, 5)).toBe(5);
  });
});

describe("subtract function", () => {
  test("5 - 2 is 3", () => {
    expect(subtract(5, 2)).toBe(3);
  });

  test("0 - 5 is -5", () => {
    expect(subtract(0, 5)).toBe(-5);
  });

  test("-3 - (-3) is 0", () => {
    expect(subtract(-3, -3)).toBe(0);
  });
});

describe("multiply function", () => {
  test("2 * 3 is 6", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test("-2 * 3 is -6", () => {
    expect(multiply(-2, 3)).toBe(-6);
  });

  test("0 * 5 is 0", () => {
    expect(multiply(0, 5)).toBe(0);
  });
});

describe("divide function", () => {
  test("6 / 3 is 2", () => {
    expect(divide(6, 3)).toBe(2);
  });

  test("-6 / 3 is -2", () => {
    expect(divide(-6, 3)).toBe(-2);
  });

  test("division by zero throws an error", () => {
    expect(() => divide(5, 0)).toThrow("Division by zero");
  });
});

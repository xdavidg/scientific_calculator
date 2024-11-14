import { expect, test, describe } from "vitest";
import { power } from "./mathUtils";

describe("power function", () => {
  test("2 raise to 3 is 8", () => {
    expect(power(2, 3)).toBe(8);
  });

  test("5 raise to 0 is 1", () => {
    expect(power(5, 0)).toBe(1);
  });

  test("3 raise to 1 is 3", () => {
    expect(power(3, 1)).toBe(3);
  });

  test("2 raise to -3 is 0.125", () => {
    expect(power(2, -3)).toBe(0.125);
  });

  test("10 raise to -2 is 0.01", () => {
    expect(power(10, -2)).toBe(0.01);
  });

  test("-2 raise to -3 is -0.125", () => {
    expect(power(-2, -3)).toBe(-0.125);
  });

  test("9 raise to 0.5 is 3", () => {
    expect(power(9, 0.5)).toBeCloseTo(3, 5);
  });

  test("8 raise to 1/3 is 2", () => {
    expect(power(8, 1 / 3)).toBeCloseTo(2, 5);
  });

  test("27 raise to 2/3 is 9", () => {
    expect(power(27, 2 / 3)).toBeCloseTo(9, 5);
  });

  test("0 raise to 5 is 0", () => {
    expect(power(0, 5)).toBe(0);
  });

  test("0 raise to 0 is 1", () => {
    expect(power(0, 0)).toBe(1);
  });

  test("0 raise to -1 is error", () => {
    expect(() => power(0, -1)).toThrow(
      "Cannot raise 0 to a negative exponent (division by zero)",
    );
  });

  test("-2 raise to 3 is -8", () => {
    expect(power(-2, 3)).toBe(-8);
  });

  test("-2 raise to 4 is 16", () => {
    expect(power(-2, 4)).toBe(16);
  });
});

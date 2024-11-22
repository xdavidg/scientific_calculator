import { expect, test, describe } from "vitest";
import { ln } from "../../src/components/mathUtils";

describe("ln function", () => {
  test("throws error for non-positive input", () => {
    expect(() => ln(0)).toThrow(
      "Cannot calculate logarithm of non-positive number",
    );
    expect(() => ln(-1)).toThrow(
      "Cannot calculate logarithm of non-positive number",
    );
  });

  test("ln of 1 is 0", () => {
    expect(ln(1)).toBe(0);
  });

  test("ln of a number greater than 10 is correctly calculated", () => {
    expect(ln(100)).toBeCloseTo(4.605170186, 6);
  });

  test("ln of a small number (x < 0.1) is correctly calculated", () => {
    expect(ln(0.01)).toBeCloseTo(-4.605170186, 6);
  });

  test("ln of a number close to 1 is correctly calculated", () => {
    expect(ln(1.05)).toBeCloseTo(0.04879, 5);
  });

  test("ln of a very large number is correctly calculated", () => {
    expect(ln(1000)).toBeCloseTo(6.907755, 6);
  });
});

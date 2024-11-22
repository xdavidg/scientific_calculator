import { expect, test, describe } from "vitest";
import { log10 } from "../../src/components/mathUtils";

describe("log10 function", () => {
  test("throws error for non-positive input", () => {
    expect(() => log10(0)).toThrow(
      "Cannot calculate logarithm of non-positive number",
    );
    expect(() => log10(-1)).toThrow(
      "Cannot calculate logarithm of non-positive number",
    );
  });

  test("log10 of 1 is 0", () => {
    expect(log10(1)).toBe(0);
  });

  test("log10 of 10 is 1", () => {
    expect(log10(10)).toBe(1);
  });

  test("log10 of 100 is 2", () => {
    expect(log10(100)).toBeCloseTo(2, 5);
  });

  test("log10 of a number greater than 10 is correctly calculated", () => {
    expect(log10(1000)).toBeCloseTo(3, 5);
  });
});

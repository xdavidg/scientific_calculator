import { describe, test, expect } from "vitest";
import { logBase } from "../src/components/mathUtils_testing";

describe("Custom Base Logarithm Function", () => {
  test("log base 10 of 100 outputs 2", () => {
    expect(logBase(100, 10)).toBeCloseTo(2, 3);
  });

  test("log base 10 of 1000 outputs 3", () => {
    expect(logBase(1000, 10)).toBeCloseTo(3, 3);
  });

  test("log base 10 of 0.1 outputs -1", () => {
    expect(logBase(0.1, 10)).toBeCloseTo(-1, 3);
  });

  test("log base 2 of 8 outputs 3", () => {
    expect(logBase(8, 2)).toBeCloseTo(3, 3);
  });

  test("log base 2 of 16 outputs 4", () => {
    expect(logBase(16, 2)).toBeCloseTo(4, 3);
  });

  test("log base 2 of 0.5 outputs -1", () => {
    expect(logBase(0.5, 2)).toBeCloseTo(-1, 3);
  });

  test("log of 1 with any base outputs 0", () => {
    expect(logBase(1, 2)).toBeCloseTo(0, 3);
    expect(logBase(1, 10)).toBeCloseTo(0, 3);
    expect(logBase(1, 5)).toBeCloseTo(0, 3);
  });

  test("handles very small numbers", () => {
    expect(logBase(1e-10, 10)).toBeCloseTo(-10, 3);
  });

  test("handles very large numbers", () => {
    expect(logBase(1e10, 10)).toBeCloseTo(10, 3);
  });

  test("input 0 throws an error", () => {
    expect(() => {
      logBase(0, 10);
    }).toThrow("Cannot calculate logarithm of non-positive number");
  });

  test("negative input throws an error", () => {
    expect(() => {
      logBase(-1, 10);
    }).toThrow("Cannot calculate logarithm of non-positive number");
  });

  test("base 0 throws an error", () => {
    expect(() => {
      logBase(10, 0);
    }).toThrow("Base must be positive and not equal to 1");
  });

  test("base 1 throws an error", () => {
    expect(() => {
      logBase(10, 1);
    }).toThrow("Base must be positive and not equal to 1");
  });

  test("negative base throws an error", () => {
    expect(() => {
      logBase(10, -2);
    }).toThrow("Base must be positive and not equal to 1");
  });
}); 
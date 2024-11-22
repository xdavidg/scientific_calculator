import { describe, test, expect } from "vitest";
import { evaluate, PI } from "../src/components/mathUtils.ts";

describe("Evaluate with individual transcendental fn", () => {
  describe("Power function with evaluate", () => {
    test("-2^(0.5) to throw an error", () => {
      expect(() => evaluate("-2^(0.5)")).toThrow();
    });

    test("0^(-1) to throw an error", () => {
      expect(() => evaluate("0^(-2)")).toThrow();
    });

    test("2^(-3) to be 0.125", () => {
      expect(evaluate("2^(-3)")).toBe(0.125);
    });

    test("9^(1/2) to be 3", () => {
      expect(evaluate("9^(1/2)")).toBeCloseTo(3, 5);
    });
  });

  describe("Inverse Cosine Function with evaluate", () => {
    test("arccos(1) to be 0", () => {
      expect(evaluate("arccos(1)")).toBe(0);
    });

    test("arccos(0) to be 3.14", () => {
      expect(evaluate("arccos(-1)")).toBe(PI);
    });

    test("arccos(-2) to throw an error", () => {
      expect(() => evaluate("arccos(-2)")).toThrow();
    });

    test("arccos(2) to throw an error", () => {
      expect(() => evaluate("arccos(2)")).toThrow();
    });
  });

  describe("Log Base Function with evaluate", () => {
    test("log_2(8) to be 3", () => {
      expect(evaluate("log_2(8)")).toBe(3);
    });

    test("log_0(3) to throw an error", () => {
      expect(() => {
        evaluate("log_0(8)");
      }).toThrow();
    });

    test("log_-2(4) to throw an error", () => {
      expect(() => {
        evaluate("log_0(8)");
      }).toThrow();
    });
  });

  describe("Mean Absolute Deviation Function with evaluate", () => {
    test("MAD[4,8,6,5,3] is 1.44", () => {
      expect(evaluate("MAD[4,8,6,5,3]")).toBe(1.44);
    });

    test("MAD[1.5,2.5,3.5,4.5] is 1", () => {
      expect(evaluate("MAD[1.5,2.5,3.5,4.5]")).toBe(1);
    });

    test("MAD[-5,-2,0,2,5] is 2.8", () => {
      expect(evaluate("MAD[-5,-2,0,2,5]")).toBe(2.8);
    });
  });

  describe("Hyperbolic Sine Function with evaluate", () => {
    test("sinh(0) is 0 ", () => {
      expect(evaluate("sinh(0)")).toBeCloseTo(0, 3);
    });

    test("sinh(-1) is ~-1.175", () => {
      expect(evaluate("sinh(-1)")).toBeCloseTo(-1.175201194, 3);
    });

    test("sinh(ln(2) is 0.75", () => {
      expect(evaluate("sinh(ln(2)")).toBeCloseTo(0.75, 2);
    });
  });

  describe("Standard Deviation Function with evaluate", () => {
    test("STD[2,4,4,4,5,5,7,9] is ~2", () => {
      expect(evaluate("STD[2,4,4,4,5,5,7,9]")).toBeCloseTo(2, 3);
    });

    test("STD[5,5,5,5] is 0", () => {
      expect(evaluate("STD[5,5,5,5]")).toBe(0);
    });

    test("STD[-5,-2,0,2,5] is ~3.406", () => {
      expect(evaluate("STD[-5,-2,0,2,5]")).toBeCloseTo(3.406, 3);
    });
  });
});

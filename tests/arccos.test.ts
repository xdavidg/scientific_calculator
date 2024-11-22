import { describe, test, expect } from "vitest";
import { arccos, PI } from "../src/components/mathUtils";

describe("Inverse Cosine Function", () => {
  test("input 1 outputs 0", () => {
    expect(arccos(1)).toBe(0);
  });

  test("input 0.866 outputs ~0.523", () => {
    expect(arccos(0.866)).toBeCloseTo(0.523, 2);
  });

  test("input 0.707 outputs ~0.785", () => {
    expect(arccos(0.707)).toBeCloseTo(0.785, 2);
  });

  test("input 0.5 outputs ~1.047", () => {
    expect(arccos(0.5)).toBeCloseTo(1.047, 3);
  });

  test("input 0 outputs 1.570", () => {
    expect(arccos(0)).toBeCloseTo(1.570796, 5);
  });

  test("input -0.5 outputs ~2.094", () => {
    expect(arccos(-0.5)).toBeCloseTo(2.094, 3);
  });

  test("input -0.707 outputs ~2.356", () => {
    expect(arccos(-0.707)).toBeCloseTo(2.356, 2);
  });

  test("input -0.866 outputs ~2.618", () => {
    expect(arccos(-0.866)).toBeCloseTo(2.618, 2);
  });

  test("input -1 outputs 3.141", () => {
    expect(arccos(-1)).toBe(PI);
  });

  test("input < -2 throws an error", () => {
    expect(() => {
      arccos(-2);
    }).toThrow();
  });

  test("input > 2 throws an error", () => {
    expect(() => {
      arccos(2);
    }).toThrow();
  });
});

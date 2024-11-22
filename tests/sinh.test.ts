import { describe, test, expect } from "vitest";
import { sinh, ln } from "../src/components/mathUtils";

describe("Hyperbolic Sine Function", () => {
  test("sinh of 0 is 0", () => {
    expect(sinh(0)).toBeCloseTo(0, 3);
  });

  test("sinh of 1 is ~1.175", () => {
    expect(sinh(1)).toBeCloseTo(1.175201194, 3);
  });

  test("sinh of -1 is ~-1.175", () => {
    expect(sinh(-1)).toBeCloseTo(-1.175201194, 3);
  });

  test("sinh of 2 is ~3.627", () => {
    expect(sinh(2)).toBeCloseTo(3.626860408, 3);
  });

  test("sinh of -2 is ~-3.627", () => {
    expect(sinh(-2)).toBeCloseTo(-3.626860408, 3);
  });

  test("sinh of 0.5 is ~0.521", () => {
    expect(sinh(0.5)).toBeCloseTo(0.521095305, 3);
  });

  test("sinh of -0.5 is ~-0.521", () => {
    expect(sinh(-0.5)).toBeCloseTo(-0.521095305, 3);
  });

  test("sinh is an odd function", () => {
    const x = 1.5;
    expect(sinh(x)).toBeCloseTo(-sinh(-x), 3);
  });

  test("sinh follows the identity cosh²x - sinh²x = 1", () => {
    const x = 1;
    const coshX = (sinh(x + 0.000001) - sinh(x)) / 0.000001;
    expect(coshX * coshX - sinh(x) * sinh(x)).toBeCloseTo(1, 2);
  });

  test("handles very small numbers", () => {
    expect(sinh(1e-10)).toBeCloseTo(1e-10, 3);
  });

  test("sinh of ln(2) matches expected value", () => {
    expect(sinh(ln(2))).toBeCloseTo(0.75, 2);
  });

  test("handles large positive numbers", () => {
    const result = sinh(10);
    expect(result).toBeGreaterThan(0);
    expect(isFinite(result)).toBe(true);
  });

  test("handles large negative numbers", () => {
    const result = sinh(-10);
    expect(result).toBeLessThan(0);
    expect(isFinite(result)).toBe(true);
  });
});


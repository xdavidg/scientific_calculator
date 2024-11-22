import { describe, test, expect } from "vitest";
import { standardDeviation } from "../src/components/mathUtils";

describe("Standard Deviation Function", () => {
  test("[2,4,4,4,5,5,7,9] outputs ~2", () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2, 3);
  });

  test("[5,5,5,5] outputs 0", () => {
    expect(standardDeviation([5, 5, 5, 5])).toBe(0);
  });

  test("[10] outputs 0", () => {
    expect(standardDeviation([10])).toBe(0);
  });

  test("[1, 100, 200, 300] outputs ~111.468", () => {
    expect(standardDeviation([1, 100, 200, 300])).toBeCloseTo(111.468, 3);
  });

  test("[-5,-2,0,2,5] outputs ~3.406", () => {
    expect(standardDeviation([-5, -2, 0, 2, 5])).toBeCloseTo(3.406, 3);
  });

  test("[1.5,2.5,3.5,4.5] outputs ~1.118", () => {
    expect(standardDeviation([1.5, 2.5, 3.5, 4.5])).toBeCloseTo(1.118, 3);
  });

  test("[] throws error", () => {
    expect(() => {
      standardDeviation([]);
    }).toThrow("Data array cannot be empty");
  });

  test("[0,0,0,0] outputs 0", () => {
    expect(standardDeviation([0, 0, 0, 0])).toBe(0);
  });

  test("large numbers [1000,2000,3000,4000] outputs ~1118.034", () => {
    expect(standardDeviation([1000, 2000, 3000, 4000])).toBeCloseTo(
      1118.034,
      3,
    );
  });

  test("small numbers [0.01,0.02,0.03,0.04] outputs ~0.011", () => {
    expect(standardDeviation([0.01, 0.02, 0.03, 0.04])).toBeCloseTo(0.011, 3);
  });

  test("mixed positive and negative [-10,0,10] outputs ~8.165", () => {
    expect(standardDeviation([-10, 0, 10])).toBeCloseTo(8.165, 3);
  });

  test("all negative numbers [-4,-3,-2,-1] outputs ~1.118", () => {
    expect(standardDeviation([-4, -3, -2, -1])).toBeCloseTo(1.118, 3);
  });
});


import { describe, test, expect } from "vitest";
import { meanAbsoluteDeviation } from "../src/components/mathUtils";

describe("Mean Absolute Deviation", () => {
  test("[4,8,6,5,3] is 1.44", () => {
    expect(meanAbsoluteDeviation([4, 8, 6, 5, 3])).toBe(1.44);
  });

  test("[5,5,5,5] is 0", () => {
    expect(meanAbsoluteDeviation([5, 5, 5, 5])).toBe(0);
  });

  test("[10] is 0", () => {
    expect(meanAbsoluteDeviation([10])).toBe(0);
  });

  test("[1, 100, 200, 300] is 99.75", () => {
    expect(meanAbsoluteDeviation([1, 100, 200, 300])).toBe(99.75);
  });

  test("[-5,-2,0,2,5] is 2.8", () => {
    expect(meanAbsoluteDeviation([-5, -2, 0, 2, 5])).toBe(2.8);
  });

  test("[1.5,2.5,3.5,4.5] is 1", () => {
    expect(meanAbsoluteDeviation([1.5, 2.5, 3.5, 4.5])).toBe(1);
  });

  test("[] to throw error", () => {
    expect(() => {
      meanAbsoluteDeviation([]);
    }).toThrow();
  });

  test("[0,0,0,0] is 0", () => {
    expect(meanAbsoluteDeviation([0, 0, 0, 0])).toBe(0);
  });
});

import { expect, test, describe } from "vitest";
import { sin } from "../../src/components/mathUtils";

describe("sine function", () => {
  test("sine of 0 is 0", () => {
    expect(sin(0)).toBe(0);
  });

  test("sine of 1.5708 radians is 1", () => {
    expect(sin(1.5708)).toBeCloseTo(1, 5);
  });

  test("sine of -1.5708 radians is -1", () => {
    expect(sin(-1.5708)).toBeCloseTo(-1, 5);
  });

  test("sine of a very small number is approximately equal to that number", () => {
    expect(sin(0.0001)).toBeCloseTo(0.0001, 5);
  });

  test("sine of a large number is calculated correctly", () => {
    expect(sin(100)).toBeCloseTo(-0.5064, 4);
  });
});

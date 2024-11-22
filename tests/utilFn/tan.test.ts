import { expect, test, describe } from "vitest";
import { tan } from "../../src/components/mathUtils";
describe("tan function", () => {
  test("tan of 0 is 0", () => {
    expect(tan(0)).toBe(0);
  });

  test("tan of 0.7854 radians is 1", () => {
    expect(tan(0.7854)).toBeCloseTo(1, 5);
  });

  test("tan of 1.0472 radians is approximately 1.732", () => {
    expect(tan(1.0472)).toBeCloseTo(1.732, 3);
  });

  test("tan of -0.7854 radians is -1", () => {
    expect(tan(-0.7854)).toBeCloseTo(-1, 5);
  });
});

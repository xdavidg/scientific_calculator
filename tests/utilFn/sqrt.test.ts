import { expect, test, describe } from "vitest";
import { sqrt } from "../../src/components/mathUtils";

describe("sqrt function", () => {
  test("throws error for negative input", () => {
    expect(() => sqrt(-1)).toThrow(
      "Cannot calculate square root of negative number",
    );
  });
});

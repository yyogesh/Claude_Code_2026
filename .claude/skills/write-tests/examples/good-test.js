import { describe, it, expect } from "vitest";
import { slugify } from "../src/utils/slugify.js";

// Example of our style only. Not a real test in this repo.
describe("slugify", () => {
  it("should turn spaces into dashes", () => {
    expect(slugify("Buy milk")).toBe("buy-milk");
  });

  it("should return an empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });

  it("should return an empty string when the input is not a string", () => {
    expect(slugify(42)).toBe("");
  });

  it("should remove characters that are not letters or numbers", () => {
    expect(slugify("Fix bug #12!")).toBe("fix-bug-12");
  });
});
import { describe, it, expect } from "vitest";
import { parseDueDate } from "../src/utils/parseDueDate.js";

describe("parseDueDate", () => {
  it("should turn a YYYY-MM-DD string into a UTC date", () => {
    expect(parseDueDate("2026-10-31")).toEqual(new Date(Date.UTC(2026, 9, 31)));
  });

  it("should return null for empty input", () => {
    expect(parseDueDate("")).toBeNull();
  });

  it("should return null when the input is not a string", () => {
    expect(parseDueDate(20261031)).toBeNull();
  });

  it("should return null for a day that does not exist", () => {
    expect(parseDueDate("2026-02-30")).toBeNull();
  });

  it("should accept February 29 in a leap year only", () => {
    expect(parseDueDate("2028-02-29")).toEqual(new Date(Date.UTC(2028, 1, 29)));
    expect(parseDueDate("2026-02-29")).toBeNull();
  });
});

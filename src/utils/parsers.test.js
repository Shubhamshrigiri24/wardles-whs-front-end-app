import { extractNumbersAndTimeUnit } from "./parsers";

describe("extractNumbersAndTimeUnit", () => {
  it("extracts numbers and units", () => {
    expect(extractNumbersAndTimeUnit("between 5.6 and 7 hrs")).toEqual({
      numbers: [20160, 25200],
      foundUnit: "hrs",
      normalisedUnit: "hour",
      min: 20160,
      max: 25200,
    });
    expect(extractNumbersAndTimeUnit("6 and 3.2 not 5")).toEqual({
      numbers: [3.2, 5, 6],
      foundUnit: undefined,
      normalisedUnit: "none",
      min: 3.2,
      max: 6,
    });
    expect(extractNumbersAndTimeUnit("")).toEqual({
      numbers: [],
      foundUnit: undefined,
      normalisedUnit: "none",
      min: null,
      max: null,
    });
    expect(extractNumbersAndTimeUnit("should be 0.5 days")).toEqual({
      numbers: [43200],
      foundUnit: "days",
      normalisedUnit: "day",
      min: 43200,
      max: 43200,
    });
  });
});

import { validateDob, roundDate } from "./validation";
const now = new Date("2020-06-12T12:11:10");
describe("roundDate", () => {
  it("should return a date with just years, months, days", () => {
    const roundedDate = roundDate(now);
    expect(roundedDate).toBeTruthy();

    expect(roundedDate.getFullYear()).toBe(now.getFullYear());
    expect(roundedDate.getFullYear()).toBeTruthy();

    expect(roundedDate.getMonth()).toBe(now.getMonth());
    expect(roundedDate.getMonth() + 1).toBeTruthy();

    expect(roundedDate.getDate()).toBe(now.getDate());
    expect(roundedDate.getDate()).toBeTruthy();

    expect(roundedDate.toISOString().split("T")[1]).toBe("00:00:00.000Z");
  });
});
describe("validateDob", () => {
  it("should return false if dob is less than 2 years ago", () => {
    const invalidDob = new Date("2018-06-08T12:00:00");
    const mockTime = new Date("2020-06-07T12:00:00");
    const isValid = validateDob(invalidDob, mockTime);
    expect(isValid).toBe(false);
  });
  it("should return true if dob is exactly 2 years ago", () => {
    const validDob = new Date("2018-06-07T12:00:00");
    const mockTime = new Date("2020-06-07T12:00:00");
    const isValid = validateDob(validDob, mockTime);
    expect(isValid).toBe(true);
  });
});

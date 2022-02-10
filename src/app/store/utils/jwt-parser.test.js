import parser from "./jwt-parser";

// Test JWT:
// - subject: 1234
// - email: digital@example.com
const JWT =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEaWdpdGFsIFBoYXJtYWN5IiwiaWF0IjoxNTE4NTQ0OTk2LCJleHAiOjc4NjE0MjgxOTYsImF1ZCI6IkRpZ2l0YWwgUGhhcm1hY3kiLCJzdWIiOiIxMjM0IiwiZW1haWwiOiJkaWdpdGFsQGV4YW1wbGUuY29tIn0.ap69gLE2AYizYJyGYgv53Fi1Fa-WtLD3q34tt343eBQ";

describe("JWT parser", () => {
  it("should return the expected subject", () => {
    const { sub } = parser(JWT);
    expect(sub).toEqual("1234");
  });
  it("should return the expected email", () => {
    const { email } = parser(JWT);
    expect(email).toEqual("digital@example.com");
  });
});

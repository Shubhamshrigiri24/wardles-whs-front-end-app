// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
// This is needed to test with react-hook-form.
import "mutationobserver-shim";

// Need to make sure it doesn't try to fire analytic events
beforeAll(() => {
  jest.mock("@welldigital/ui-common/Analytics");
});

import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";

declare module "vitest" {
  interface Assertion<T = any>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

HTMLFormElement.prototype.requestSubmit = function () {
  this.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
};

expect.extend(matchers);

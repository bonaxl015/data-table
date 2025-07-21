import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useSearchForm from "../hooks/useSearchForm";

describe("Given useSearchForm hook", () => {
  it("should return a valid Ant Design form instance", () => {
    const { result } = renderHook(() => useSearchForm<{ keyword: string }>());

    expect(result.current.searchFormInstance).toBeDefined();
    expect(typeof result.current.searchFormInstance.getFieldsValue).toBe(
      "function",
    );
    expect(typeof result.current.searchFormInstance.setFieldsValue).toBe(
      "function",
    );
    expect(typeof result.current.searchFormInstance.validateFields).toBe(
      "function",
    );
  });
});

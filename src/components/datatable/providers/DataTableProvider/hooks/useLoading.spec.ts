import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useLoading from "../hooks/useLoading";

describe("Given useLoading hook", () => {
  it("should initialize with false and update isLoading correctly", () => {
    const { result } = renderHook(() => useLoading());

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.updateLoading(true);
    });
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.updateLoading(false);
    });
    expect(result.current.isLoading).toBe(false);
  });
});

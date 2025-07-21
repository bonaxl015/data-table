import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import usePageInfo from "../hooks/usePageInfo";
import { PageDefaultValues } from "../../../enums/pageInfo";

describe("Given usePageInfo hook", () => {
  it("should initialize with default values and update page info correctly", () => {
    const { result } = renderHook(() => usePageInfo());

    expect(result.current.pageSizeNumber).toBe(PageDefaultValues.PAGE_SIZE);
    expect(result.current.pageNumber).toBe(PageDefaultValues.PAGE_NUMBER);
    expect(result.current.totalItems).toBe(0);

    act(() => {
      result.current.updatePageSizeNumber(50);
    });
    expect(result.current.pageSizeNumber).toBe(50);

    act(() => {
      result.current.updatePageNumber(3);
    });
    expect(result.current.pageNumber).toBe(3);

    act(() => {
      result.current.updateTotalItems(200);
    });
    expect(result.current.totalItems).toBe(200);
  });
});

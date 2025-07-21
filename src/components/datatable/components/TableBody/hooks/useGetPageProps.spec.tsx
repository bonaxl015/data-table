import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import useGetPageProps from "./useGetPageProps";
import { useDataTable } from "../../../providers";

vi.mock("../../../providers", () => ({
  useDataTable: vi.fn(),
}));

vi.mock("../../../hooks/useRequestData", () => ({
  __esModule: true,
  default: () => ({
    handleRequestData: vi.fn(),
  }),
}));

describe("Given useGetPageProps hook", () => {
  const updatePageNumber = vi.fn();
  const updatePageSizeNumber = vi.fn();
  const handleRequestData = vi.fn();
  const getFieldsValue = vi.fn().mockReturnValue({ search: "test" });

  const mockDataTable = {
    searchFormInstance: { getFieldsValue },
    pageSizeNumber: 20,
    pageNumber: 2,
    totalItems: 88,
    createInfoObject: vi.fn().mockReturnValue({}),
    updatePageSizeNumber,
    updatePageNumber,
  };

  const onSearchMock = vi.fn();

  beforeEach(() => {
    vi.doMock("../../../hooks/useRequestData", () => ({
      default: () => ({ handleRequestData }),
    }));

    (useDataTable as Mock).mockReturnValue(mockDataTable);
  });

  it("returns correct paginationProps", () => {
    const { result } = renderHook(() =>
      useGetPageProps(["10", "20", "50"], 10, onSearchMock),
    );

    const { paginationProps } = result.current;

    expect(paginationProps).toBeDefined();
    expect(paginationProps.pageSizeOptions).toEqual(["10", "20", "50"]);
    expect(paginationProps.pageSize).toBe(20);
    expect(paginationProps.current).toBe(2);
    expect(paginationProps.total).toBe(88);
    expect(typeof paginationProps.onChange).toBe("function");
  });

  it("calls updatePageNumber and updatePageSizeNumber on onChange", () => {
    const { result } = renderHook(() =>
      useGetPageProps(["10", "20", "50"], 10, onSearchMock),
    );

    act(() => {
      result.current.paginationProps.onChange?.(3, 50);
    });

    expect(updatePageNumber).toHaveBeenCalledWith(3);
    expect(updatePageSizeNumber).toHaveBeenCalled();
  });
});

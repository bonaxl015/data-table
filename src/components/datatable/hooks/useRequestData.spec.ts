import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import useRequestData from "./useRequestData";
import { useDataTable } from "../providers";

vi.mock("../providers", async () => {
  return {
    useDataTable: vi.fn(),
  };
});

describe("useRequestData", () => {
  const updateLoading = vi.fn();
  const requestData = vi.fn();
  const updateDataSource = vi.fn();
  const updatePageNumber = vi.fn();
  const updatePageSizeNumber = vi.fn();
  const updateTotalItems = vi.fn();

  const mockUseDataTable = useDataTable as unknown as Mock;

  const mockSearchResponse = {
    dataSource: [{ id: 1, name: "Item 1" }],
    total: 100,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseDataTable.mockReturnValue({
      updateLoading,
      requestData,
      updateDataSource,
      updatePageNumber,
      updatePageSizeNumber,
      updateTotalItems,
    });
  });

  it("calls requestData and updates states properly", async () => {
    const onSearch = vi.fn();
    requestData.mockResolvedValueOnce(mockSearchResponse);

    const { result } = renderHook(() => useRequestData(onSearch));

    await act(async () => {
      await result.current.handleRequestData({
        pageNumber: 1,
        pageSize: 10,
        values: { keyword: "test" },
      });
    });

    expect(updateLoading).toHaveBeenCalledWith(true);
    expect(requestData).toHaveBeenCalledWith(
      {
        pageNumber: 1,
        pageSize: 10,
        values: { keyword: "test" },
      },
      onSearch,
    );

    expect(updatePageNumber).toHaveBeenCalledWith(1);
    expect(updatePageSizeNumber).toHaveBeenCalledWith(10);
    expect(updateDataSource).toHaveBeenCalledWith(
      mockSearchResponse.dataSource,
    );
    expect(updateTotalItems).toHaveBeenCalledWith(mockSearchResponse.total);
    expect(updateLoading).toHaveBeenLastCalledWith(false);
  });

  it("handles null response gracefully", async () => {
    const onSearch = vi.fn();
    requestData.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useRequestData(onSearch));

    await act(async () => {
      await result.current.handleRequestData({
        pageNumber: 2,
        pageSize: 5,
        values: {},
      });
    });

    expect(updateDataSource).not.toHaveBeenCalled();
    expect(updateTotalItems).not.toHaveBeenCalled();
    expect(updateLoading).toHaveBeenLastCalledWith(false);
  });

  it("does not call requestData if onSearch is falsy", async () => {
    const { result } = renderHook(() =>
      useRequestData<FormData, { id: number }>(null as any),
    );

    await act(async () => {
      await result.current.handleRequestData({
        pageNumber: 1,
        pageSize: 10,
        values: {} as any,
      });
    });

    expect(requestData).not.toHaveBeenCalled();
    expect(updateLoading).not.toHaveBeenCalled();
  });
});

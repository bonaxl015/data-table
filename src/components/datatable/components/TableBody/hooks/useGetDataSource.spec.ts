import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useGetDataSource from "./useGetDataSource";
import * as providerModule from "../../../providers";

describe("Given useGetDataSource hook", () => {
  const mockUpdateDataSource = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(providerModule, "useDataTable").mockReturnValue({
      dataSource: [{ id: 1, name: "John" }],
      updateDataSource: mockUpdateDataSource,
    } as any);
  });

  it("returns current dataSource from context", () => {
    const { result } = renderHook(() =>
      useGetDataSource([{ id: 1, name: "John" }]),
    );

    expect(result.current.updatedDataSource).toEqual([{ id: 1, name: "John" }]);
  });

  it("calls updateDataSource when dataSourceFromProps has values", () => {
    const dataFromProps = [{ id: 2, name: "Alice" }];

    renderHook(() => useGetDataSource(dataFromProps));

    expect(mockUpdateDataSource).toHaveBeenCalledWith(dataFromProps);
  });

  it("does NOT call updateDataSource when dataSourceFromProps is empty", () => {
    renderHook(() => useGetDataSource([]));

    expect(mockUpdateDataSource).not.toHaveBeenCalled();
  });
});

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useDataSource from "../hooks/useDataSource";

describe("Given useDataSource hook", () => {
  it("should initialize with an empty array and update dataSource correctly", () => {
    const { result } = renderHook(() => useDataSource<{ id: number }>());

    expect(result.current.dataSource).toEqual([]);

    const newData = [{ id: 1 }, { id: 2 }];
    act(() => {
      result.current.updateDataSource(newData);
    });

    // Assert updated state
    expect(result.current.dataSource).toEqual(newData);
  });
});

import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useGetColumns from "./useGetColumns";
import { ColumnProps } from "antd/es/table/Column";

describe("Given useGetColumns hook", () => {
  const baseColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
  ];

  const actionColumn = {
    title: "Action",
    key: "action",
    render: () => <button>Action</button>,
  };

  it("returns columns as-is when actionColumnObject is undefined", () => {
    const { result } = renderHook(() =>
      useGetColumns(
        baseColumns,
        undefined as unknown as ColumnProps<string> | null,
      ),
    );

    expect(result.current.updatedColumns).toEqual(baseColumns);
  });

  it("appends actionColumnObject when provided", () => {
    const { result } = renderHook(() =>
      useGetColumns(baseColumns, actionColumn),
    );

    expect(result.current.updatedColumns).toEqual([
      ...baseColumns,
      actionColumn,
    ]);
  });

  it("memoizes result when dependencies are unchanged", () => {
    const { result, rerender } = renderHook(
      ({ cols, action }) => useGetColumns(cols, action),
      {
        initialProps: { cols: baseColumns, action: actionColumn },
      },
    );

    const firstResult = result.current.updatedColumns;
    rerender({ cols: baseColumns, action: actionColumn });

    expect(result.current.updatedColumns).toBe(firstResult); // same reference
  });
});

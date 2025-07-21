import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataTableContext, useDataTable } from ".";
import { PageDefaultValues } from "../../../enums/pageInfo";
import type { DataTableContextType } from "../types/DataTableContext.types";

const defaultContextValue: DataTableContextType<any, any> = {
  dataSource: [{ id: 1 }],
  updateDataSource: () => {},
  isLoading: false,
  updateLoading: () => {},
  requestData: () =>
    Promise.resolve({
      dataSource: [],
      total: 0,
    }),
  createInfoObject: () => ({
    values: {},
    pageNumber: PageDefaultValues.PAGE_NUMBER,
    pageSize: PageDefaultValues.PAGE_SIZE,
  }),
  searchFormInstance: {} as any,
  pageSizeNumber: PageDefaultValues.PAGE_SIZE,
  updatePageSizeNumber: () => {},
  pageNumber: PageDefaultValues.PAGE_NUMBER,
  updatePageNumber: () => {},
  totalItems: 0,
  updateTotalItems: () => {},
};

describe("Given useDataTable hook", () => {
  it("should return context value when inside provider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DataTableContext.Provider value={defaultContextValue}>
        {children}
      </DataTableContext.Provider>
    );

    const { result } = renderHook(
      () =>
        useDataTable<
          typeof defaultContextValue.searchFormInstance,
          { id: number }
        >(),
      { wrapper },
    );

    expect(result.current.dataSource).toEqual([{ id: 1 }]);
    expect(typeof result.current.updateLoading).toBe("function");
  });
});

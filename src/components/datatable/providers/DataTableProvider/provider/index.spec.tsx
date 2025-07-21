import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataTableProvider } from ".";
import { useDataTable } from "../context";

const TestConsumer = () => {
  const context = useDataTable<any, { id: number }>();
  return (
    <>
      <div data-testid="dataSource">{JSON.stringify(context.dataSource)}</div>
      <div data-testid="loading">{String(context.isLoading)}</div>
      <div data-testid="pageSize">{context.pageSizeNumber}</div>
      <div data-testid="pageNumber">{context.pageNumber}</div>
      <div data-testid="totalItems">{context.totalItems}</div>
    </>
  );
};

describe("Given DataTableProvider", () => {
  it("should provide default context values to children", () => {
    render(
      <DataTableProvider>
        <TestConsumer />
      </DataTableProvider>,
    );

    expect(screen.getByTestId("dataSource").textContent).toBe("[]");
    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("pageSize").textContent).toBe("10");
    expect(screen.getByTestId("pageNumber").textContent).toBe("1");
    expect(screen.getByTestId("totalItems").textContent).toBe("0");
  });
});

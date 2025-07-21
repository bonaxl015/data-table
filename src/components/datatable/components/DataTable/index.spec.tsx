import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import "@testing-library/jest-dom";
import DataTable from ".";

vi.mock("../TableHeader", () => ({
  default: () => <div data-testid="table-header">Mock Header</div>,
}));

vi.mock("../TableBody", () => ({
  default: forwardRef(function TableBody() {
    return <div data-testid="table-body">Mock Body</div>;
  }),
}));

vi.mock("./styles/DataTableWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper">{children}</div>
  ),
}));

vi.mock("../../providers", () => ({
  DataTableProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="provider">{children}</div>
  ),
}));

describe("Given DataTable component", () => {
  const props = {
    columns: [],
    dataSource: [],
    form: {},
    rowKey: "id",
  };

  it("renders DataTable with wrapper, header and body", () => {
    render(<DataTable {...props} />);

    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("table-header")).toBeInTheDocument();
    expect(screen.getByTestId("table-body")).toBeInTheDocument();
    expect(screen.getByTestId("provider")).toBeInTheDocument();
  });

  it("forwards ref to TableBody", () => {
    const ref = createRef<any>();

    render(<DataTable {...props} ref={ref} />);

    expect(ref.current).toBe(null);
  });
});

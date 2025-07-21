import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TableHeader from ".";

vi.mock("../SearchFields", () => ({
  default: vi.fn(() => <div data-testid="search-fields">SearchFields</div>),
}));

describe("Given TableHeader component", () => {
  const baseProps = {
    searchFields: [],
    searchButtonText: "Search",
    resetButtonText: "Reset",
    extraOperationButtons: [],
    tableOperations: <div data-testid="table-ops">TableOps</div>,
    loadDataImmediately: true,
    onSearch: vi.fn(),
    onBeforeReset: vi.fn(),
  };

  it("renders SearchFields component with correct props", () => {
    render(<TableHeader {...baseProps} />);

    expect(screen.getByTestId("search-fields")).toBeInTheDocument();
  });

  it("renders tableOperations when provided", () => {
    render(<TableHeader {...baseProps} />);
    expect(screen.getByTestId("table-ops")).toBeInTheDocument();
  });

  it("does not render tableOperations if not provided", () => {
    const { queryByTestId } = render(
      <TableHeader {...baseProps} tableOperations={undefined} />,
    );
    expect(queryByTestId("table-ops")).not.toBeInTheDocument();
  });
});

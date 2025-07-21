import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import TableBody from ".";
import { PageDefaultValues } from "../../enums/pageInfo";

vi.mock("antd/es/table", () => ({
  __esModule: true,
  default: vi.fn((props) => (
    <div data-testid="antd-table">
      Mocked Table - Columns: {props.columns?.length}, Data:{" "}
      {props.dataSource?.length}
    </div>
  )),
}));

vi.mock("./hooks/useDisplayAction", () => ({
  default: vi.fn(() => ({
    actionColumnObject: { key: "actions", render: vi.fn() },
  })),
}));

vi.mock("./hooks/useGetColumns", () => ({
  default: vi.fn(() => ({
    updatedColumns: [{ title: "Name", dataIndex: "name" }],
  })),
}));

vi.mock("./hooks/useGetPageProps", () => ({
  default: vi.fn(() => ({
    paginationProps: { current: 1, pageSize: 10 },
  })),
}));

vi.mock("./hooks/useGetDataSource", () => ({
  default: vi.fn(({ dataSource }) => ({
    updatedDataSource: dataSource,
  })),
}));

vi.mock("../../providers", () => ({
  useDataTable: () => ({
    isLoading: false,
    searchFormInstance: {},
    pageSizeNumber: 10,
    pageNumber: 1,
    totalItems: 100,
    updatePageSizeNumber: vi.fn(),
    updateTotalItems: vi.fn(),
  }),
}));

describe("Given TableBody component", () => {
  const baseProps = {
    actionsColumn: [],
    columns: [{ title: "Name", dataIndex: "name" }],
    pageSizeOptions: ["10", "20"],
    defaultPageSize: PageDefaultValues.PAGE_SIZE,
    dataSource: [{ name: "John" }],
    onSearch: vi.fn(),
  };

  it("renders mocked Table with correct props", () => {
    render(<TableBody {...baseProps} />);
    expect(screen.getByTestId("antd-table")).toBeInTheDocument();
    expect(screen.getByText(/Mocked Table - Columns: 1/)).toBeInTheDocument();
  });

  it("exposes dataTable refs via useImperativeHandle", () => {
    const TestWrapper = () => {
      const ref = useRef(null);
      return (
        <>
          <TableBody {...baseProps} ref={ref} />
          <button
            onClick={() => {
              if (ref.current) {
                // test the ref's shape
                expect(ref.current).toHaveProperty("dataSource");
                expect(ref.current).toHaveProperty("searchFormInstance");
                expect(ref.current).toHaveProperty("pageSizeNumber");
                expect(ref.current).toHaveProperty("pageNumber");
                expect(ref.current).toHaveProperty("totalItems");
              }
            }}
          >
            Test Ref
          </button>
        </>
      );
    };

    render(<TestWrapper />);
    screen.getByText("Test Ref").click(); // triggers the expect()
  });
});

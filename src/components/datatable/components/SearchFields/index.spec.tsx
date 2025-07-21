import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFields from ".";
import { ButtonDefaultText } from "../../enums/buttonText";
import { PageDefaultValues } from "../../enums/pageInfo";
import Input from "antd/es/input";

vi.mock("antd/es/form", async () => {
  const FormMock = ({ children, layout }: any) => (
    <form data-testid="form" data-layout={layout}>
      {children}
    </form>
  );

  FormMock.Item = function Item({ children, ...props }: any) {
    return (
      <div data-testid="form-item" {...props}>
        {children}
      </div>
    );
  };

  return {
    __esModule: true,
    default: FormMock,
  };
});

vi.mock("antd/es/button", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ children, onClick, loading, ...rest }: any) => (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  ),
}));

vi.mock("antd/es/space", () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="space">{children}</div>,
}));

vi.mock("../../providers", () => {
  return {
    useDataTable: () => ({
      isLoading: false,
      createInfoObject: vi.fn((values, page, size) => ({
        values,
        page,
        size,
      })),
      searchFormInstance: {
        validateFields: vi.fn(() => Promise.resolve({ name: "John" })),
        resetFields: vi.fn(),
      },
    }),
  };
});

const handleRequestDataMock = vi.fn();

vi.mock("../../hooks/useRequestData", () => ({
  default: () => ({
    handleRequestData: handleRequestDataMock,
  }),
}));

describe("Given SearchFields Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    searchFields: [
      {
        name: "name",
        label: "Name",
        children: <Input autoComplete="off" maxLength={20} />,
      },
    ],
    onSearch: vi.fn(),
    loadDataImmediately: false,
  };

  it("renders wrapper, search fields and buttons", () => {
    render(<SearchFields {...defaultProps} />);

    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByText(ButtonDefaultText.FILTER)).toBeInTheDocument();
    expect(screen.getByText(ButtonDefaultText.RESET)).toBeInTheDocument();
  });

  it("submits filter when clicking filter button", async () => {
    render(<SearchFields {...defaultProps} />);

    const filterBtn = screen.getByRole("button", {
      name: ButtonDefaultText.FILTER,
    });
    fireEvent.click(filterBtn);

    await new Promise((r) => setTimeout(r, 0));

    expect(handleRequestDataMock).toHaveBeenCalledWith({
      values: { name: "John" },
      page: PageDefaultValues.PAGE_NUMBER,
      size: PageDefaultValues.PAGE_SIZE,
    });
  });

  it("resets form and submits on reset button click", async () => {
    render(<SearchFields {...defaultProps} />);

    const resetBtn = screen.getByRole("button", {
      name: ButtonDefaultText.RESET,
    });
    fireEvent.click(resetBtn);

    await new Promise((r) => setTimeout(r, 0)); // flush promises

    expect(handleRequestDataMock).toHaveBeenCalled();
  });

  it("loads data immediately if enabled", async () => {
    render(<SearchFields {...defaultProps} loadDataImmediately={true} />);

    await new Promise((r) => setTimeout(r, 0)); // flush promises

    expect(handleRequestDataMock).toHaveBeenCalled();
  });

  it("calls onBeforeReset if provided", async () => {
    const onBeforeReset = vi.fn();

    render(<SearchFields {...defaultProps} onBeforeReset={onBeforeReset} />);

    fireEvent.click(
      screen.getByRole("button", { name: ButtonDefaultText.RESET }),
    );

    await new Promise((r) => setTimeout(r, 0));

    expect(onBeforeReset).toHaveBeenCalled();
    expect(handleRequestDataMock).toHaveBeenCalled();
  });

  it("renders extraOperationButtons when passed", () => {
    render(
      <SearchFields
        {...defaultProps}
        extraOperationButtons={<div data-testid="extra-btns">Extra</div>}
      />,
    );

    expect(screen.getByTestId("extra-btns")).toBeInTheDocument();
  });
});

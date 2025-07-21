import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useSearchRequest from "../hooks/useSearchRequest";

type FormObjectType = { keyword: string };
type RecordType = { id: number; name: string };

describe("Given useSearchRequest hook", () => {
  it("should create an info object with given form data and pagination", () => {
    const { result } = renderHook(() =>
      useSearchRequest<FormObjectType, RecordType>(),
    );

    const formData = { keyword: "test" };
    const pageNumber = 1;
    const pageSize = 10;

    const info = result.current.createInfoObject(
      formData,
      pageNumber,
      pageSize,
    );

    expect(info).toEqual({
      values: formData,
      pageNumber,
      pageSize,
    });
  });

  it("should call onSearch and return result in requestData", async () => {
    const { result } = renderHook(() =>
      useSearchRequest<FormObjectType, RecordType>(),
    );

    const mockOnSearch = vi.fn().mockResolvedValue({
      data: [{ id: 1, name: "Item 1" }],
      total: 1,
    });

    const input = {
      values: { keyword: "item" },
      pageNumber: 1,
      pageSize: 5,
    };

    let resultData;
    await act(async () => {
      resultData = await result.current.requestData(input, mockOnSearch);
    });

    expect(mockOnSearch).toHaveBeenCalledWith(input);
    expect(resultData).toEqual({
      data: [{ id: 1, name: "Item 1" }],
      total: 1,
    });
  });

  it("should return null when no onSearch is provided", async () => {
    const { result } = renderHook(() =>
      useSearchRequest<FormObjectType, RecordType>(),
    );

    const input = {
      values: { keyword: "no-op" },
      pageNumber: 1,
      pageSize: 10,
    };

    let resultData;
    await act(async () => {
      resultData = await result.current.requestData(input, null as any);
    });

    expect(resultData).toBeNull();
  });
});

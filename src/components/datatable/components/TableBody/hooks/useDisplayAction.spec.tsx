import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useDisplayAction from "./useDisplayAction";

type TestRecord = { id: number; name: string };

describe("Given useDisplayAction hook", () => {
  it("returns a valid action column object when actions exist", () => {
    const onClickMock = vi.fn();
    const isDisplayMock = vi.fn().mockReturnValue(true);
    const isDisabledMock = vi.fn().mockReturnValue(false);

    const actions = [
      {
        title: "Edit",
        onClick: onClickMock,
        isDisplay: isDisplayMock,
        isDisabled: isDisabledMock,
      },
    ];

    const { result } = renderHook(() => useDisplayAction<TestRecord>(actions));
    const actionColumn = result.current.actionColumnObject;

    expect(actionColumn).toBeDefined();
    expect(actionColumn?.title).toBe("Actions");
    expect(typeof actionColumn?.render).toBe("function");

    const renderedButtons = actionColumn?.render?.(
      "",
      {
        id: 1,
        name: "Test User",
      },
      1,
    );

    expect(renderedButtons).toBeTruthy();
    expect(isDisplayMock).toHaveBeenCalled();
  });

  it("returns null if no actions are provided", () => {
    const { result } = renderHook(() => useDisplayAction<TestRecord>([]));
    expect(result.current.actionColumnObject).toBeNull();
  });
});

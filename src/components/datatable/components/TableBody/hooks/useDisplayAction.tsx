import { Button, Space } from "antd";
import { ColumnProps } from "antd/es/table";
import { ActionsColumnType } from "../types/TableBody.types";
import { useCallback, useMemo } from "react";
import { useDisplayActionOutput } from "../types/useDisplayAction.types";

function useDisplayAction<RecordType>(
  actionsColumn: ActionsColumnType<RecordType>[] = [],
): useDisplayActionOutput<RecordType> {
  const displayActionButtons = useCallback(
    (record: RecordType) => {
      const filteredActions = actionsColumn.filter((item) =>
        item.isDisplay?.(),
      );

      return (
        <Space>
          {filteredActions.map((item, index) => (
            <Button
              key={index}
              type="link"
              onClick={() => {
                item.onClick(record);
              }}
              disabled={item.isDisabled?.(record)}
            >
              {item.title}
            </Button>
          ))}
        </Space>
      );
    },
    [actionsColumn],
  );

  const actionColumnObject: ColumnProps<RecordType> | null = useMemo(
    () =>
      actionsColumn.length
        ? {
            key: "actions",
            dataIndex: "actions",
            title: "Actions",
            align: "center",
            render: (_text, record) => displayActionButtons(record),
          }
        : null,
    [actionsColumn.length, displayActionButtons],
  );

  return { actionColumnObject };
}

export default useDisplayAction;

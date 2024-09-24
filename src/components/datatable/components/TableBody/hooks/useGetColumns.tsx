import { ColumnsType } from "antd/es/table";
import { useDisplayActionOutput } from "../types/useDisplayAction.types";
import { useMemo } from "react";

function useGetColumns<RecordType>(
  columns: ColumnsType<RecordType> | undefined = [],
  actionColumnObject: useDisplayActionOutput<RecordType>["actionColumnObject"],
) {
  const updatedColumns = useMemo(
    () =>
      actionColumnObject ? [...columns, ...[actionColumnObject]] : columns,
    [actionColumnObject, columns],
  );

  return { updatedColumns };
}

export default useGetColumns;

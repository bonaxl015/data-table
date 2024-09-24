import { ColumnProps } from "antd/es/table";

export type useDisplayActionOutput<RecordType> = {
  actionColumnObject: ColumnProps<RecordType> | null;
};

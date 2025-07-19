import { Table } from "antd";
import { TableBodyProps } from "./types/TableBody.types";
import useDisplayAction from "./hooks/useDisplayAction";
import useGetColumns from "./hooks/useGetColumns";
import useGetPageProps from "./hooks/useGetPageProps";
import useGetDataSource from "./hooks/useGetDataSource";
import { useDataTable } from "../../providers";

const TableBody = <FormObjectType, RecordType extends object>({
  actionsColumn = [],
  columns,
  pageSizeOptions,
  defaultPageSize,
  dataSource = [],
  onSearch,
  ...restProps
}: TableBodyProps<FormObjectType, RecordType>) => {
  const { actionColumnObject } = useDisplayAction<RecordType>(actionsColumn);
  const { updatedColumns } = useGetColumns<RecordType>(
    columns,
    actionColumnObject,
  );
  const { paginationProps } = useGetPageProps<FormObjectType, RecordType>(
    pageSizeOptions,
    defaultPageSize,
    onSearch,
  );
  const { updatedDataSource } = useGetDataSource<FormObjectType, RecordType>(
    dataSource as RecordType[],
  );
  const { isLoading } = useDataTable();

  console.log("111111111", paginationProps);

  return (
    <Table
      {...restProps}
      bordered
      size="small"
      columns={updatedColumns}
      pagination={paginationProps}
      dataSource={updatedDataSource}
      loading={isLoading}
    />
  );
};

export default TableBody;

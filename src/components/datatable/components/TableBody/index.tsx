import {
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useImperativeHandle,
} from "react";
import { Table } from "antd";
import { TableBodyProps } from "./types/TableBody.types";
import useDisplayAction from "./hooks/useDisplayAction";
import useGetColumns from "./hooks/useGetColumns";
import useGetPageProps from "./hooks/useGetPageProps";
import useGetDataSource from "./hooks/useGetDataSource";
import { useDataTable } from "../../providers";
import { PageDefaultValues } from "../../enums/pageInfo";
import { DataTableRefs } from "../../types";

function TableBodyInner<FormObjectType, RecordType extends object>(
  {
    actionsColumn = [],
    columns,
    pageSizeOptions,
    defaultPageSize,
    dataSource = [],
    onSearch,
    ...restProps
  }: TableBodyProps<FormObjectType, RecordType>,
  ref: Ref<DataTableRefs<FormObjectType, RecordType>>,
) {
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
  const {
    isLoading,
    searchFormInstance,
    pageSizeNumber,
    pageNumber,
    totalItems,
    updatePageSizeNumber,
    updateTotalItems,
  } = useDataTable<FormObjectType, RecordType>();
  const totalData = dataSource.length;

  useEffect(() => {
    updatePageSizeNumber(defaultPageSize ?? PageDefaultValues.PAGE_SIZE);
    updateTotalItems(totalData);
  }, [defaultPageSize, totalData, updatePageSizeNumber, updateTotalItems]);

  useImperativeHandle(ref, () => ({
    dataSource: updatedDataSource,
    searchFormInstance,
    pageSizeNumber,
    pageNumber,
    totalItems,
  }));

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
}

const TableBody = forwardRef(TableBodyInner) as <
  FormObjectType,
  RecordType extends object,
>(
  props: TableBodyProps<FormObjectType, RecordType> & {
    ref?: Ref<DataTableRefs<FormObjectType, RecordType>>;
  },
) => ReactElement;

export default TableBody;

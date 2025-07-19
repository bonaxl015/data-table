import { Ref, useImperativeHandle } from "react";
import TableBody from "../../../TableBody";
import TableHeader from "../../../TableHeader";
import { useDataTable } from "../../../../providers";
import DataTableWrapper from "../../styles/DataTableWrapper";
import { DataTableProps, DataTableRefs } from "../../../../types";

const InnerDataTableWithRefs = <FormObjectType, RecordType extends object>(
  props: DataTableProps<FormObjectType, RecordType>,
  ref: Ref<DataTableRefs<FormObjectType, RecordType>>,
) => {
  const {
    dataSource,
    searchFormInstance,
    pageSizeNumber,
    pageNumber,
    totalItems,
  } = useDataTable<FormObjectType, RecordType>();

  useImperativeHandle(
    ref,
    () => ({
      dataSource,
      searchFormInstance,
      pageSizeNumber,
      pageNumber,
      totalItems,
    }),
    [dataSource, searchFormInstance, pageSizeNumber, pageNumber, totalItems],
  );

  return (
    <DataTableWrapper>
      <TableHeader {...props} />
      <TableBody {...props} />
    </DataTableWrapper>
  );
};

export default InnerDataTableWithRefs;

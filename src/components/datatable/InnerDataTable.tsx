import { Ref, useImperativeHandle } from "react";
import TableBody from "./components/TableBody/TableBody";
import TableHeader from "./components/TableHeader/TableHeader";
import { useDataTable } from "./providers/DataTableContext";
import DataTableWrapper from "./styles/DataTableWrapper";
import { DataTableProps } from "./types/DataTable.types";
import { DataTableRefs } from "./types/DataTableRef.types";

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

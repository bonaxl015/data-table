import { forwardRef, Ref } from "react";
import TableBody from "../TableBody";
import TableHeader from "../TableHeader";
import DataTableWrapper from "./styles/DataTableWrapper";
import { DataTableProvider } from "../../providers";
import { DataTableProps } from "../../types/DataTable.types";
import { DataTableRefs } from "../../types/DataTableRef.types";

const DataTableForwardedRefs = <FormObjectType, RecordType extends object>(
  props: DataTableProps<FormObjectType, RecordType>,
  ref?: Ref<DataTableRefs<FormObjectType, RecordType>>,
) => (
  <DataTableProvider>
    <DataTableWrapper>
      <TableHeader {...props} />
      <TableBody {...props} ref={ref} />
    </DataTableWrapper>
  </DataTableProvider>
);

const DataTable = forwardRef(DataTableForwardedRefs);

export default DataTable;

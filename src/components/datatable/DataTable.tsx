import { forwardRef, Ref } from "react";
import InnerDataTableWithRefs from "./InnerDataTable";
import { DataTableProvider } from "./providers/DataTableContext";
import { DataTableProps } from "./types/DataTable.types";
import { DataTableRefs } from "./types/DataTableRef.types";

const DataTableWithRefs = <FormObjectType, RecordType extends object>(
  props: DataTableProps<FormObjectType, RecordType>,
  ref: Ref<DataTableRefs<FormObjectType, RecordType>>,
) => {
  return (
    <DataTableProvider>
      {InnerDataTableWithRefs({ ...props }, ref)}
    </DataTableProvider>
  );
};

const DataTable = forwardRef(DataTableWithRefs);

export default DataTable;

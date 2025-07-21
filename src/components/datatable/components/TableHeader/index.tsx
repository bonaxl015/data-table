import TableHeaderWrapper from "./styles/TableHeaderWrapper";
import SearchFields from "../SearchFields";
import { TableHeaderProps } from "./types/TableHeader.types";

function TableHeader<FormObjectType, RecordType extends object>({
  searchFields,
  searchButtonText,
  resetButtonText,
  extraOperationButtons,
  tableOperations,
  loadDataImmediately,
  onSearch,
  onBeforeReset,
}: TableHeaderProps<FormObjectType, RecordType>) {
  return (
    <TableHeaderWrapper>
      <SearchFields
        searchFields={searchFields}
        searchButtonText={searchButtonText}
        resetButtonText={resetButtonText}
        extraOperationButtons={extraOperationButtons}
        loadDataImmediately={loadDataImmediately}
        onSearch={onSearch}
        onBeforeReset={onBeforeReset}
      />
      {tableOperations && <div>{tableOperations}</div>}
    </TableHeaderWrapper>
  );
}

export default TableHeader;

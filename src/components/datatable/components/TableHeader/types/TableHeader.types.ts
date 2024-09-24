import { SearchFieldProps } from "../../SearchFields/types/SearchForm.types";
import { TableOperationProps } from "../../TableOperations/types/TableOperations.types";

export type TableHeaderProps<FormObjectType, RecordType> = SearchFieldProps<
  FormObjectType,
  RecordType
> &
  TableOperationProps;

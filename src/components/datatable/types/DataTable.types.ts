import { TableHeaderProps } from "../components/TableHeader/types/TableHeader.types";
import { TableBodyProps } from "../components/TableBody/types/TableBody.types";

export type DataTableProps<FormObjectType, RecordType> = TableBodyProps<
  FormObjectType,
  RecordType
> &
  TableHeaderProps<FormObjectType, RecordType>;

import { TableProps } from "antd";
import { ReactNode } from "react";
import { PageSizeOptions } from "./useGetPageProps.types";
import { OnSearchFunction } from "../../SearchFields/types/SearchForm.types";

export type ActionsColumnType<RecordType> = {
  title: ReactNode;
  isDisplay?: (record?: RecordType) => boolean;
  isDisabled?: (record?: RecordType) => boolean;
  onClick: (record?: RecordType) => unknown;
};

export interface TableBodyProps<FormObjectType, RecordType>
  extends TableProps<RecordType> {
  actionsColumn?: ActionsColumnType<RecordType>[];
  pageSizeOptions?: PageSizeOptions;
  defaultPageSize?: number;
  onSearch?: OnSearchFunction<FormObjectType, RecordType>;
}

import { FormItemProps } from "antd";
import { ReactNode } from "react";

export type SearchFieldsType = FormItemProps[] | never[];

export type OnSearchParams<FormObjectType> = {
  values: FormObjectType;
  pageNumber: number;
  pageSize: number;
};

export type OnSearchResponseData<RecordType> = {
  dataSource: RecordType[];
  total: number;
};

export type OnSearchFunction<FormObjectType, RecordType> =
  | undefined
  | ((
      info: OnSearchParams<FormObjectType>,
    ) =>
      | OnSearchResponseData<RecordType>
      | Promise<OnSearchResponseData<RecordType>>);

export interface SearchFieldProps<FormObjectType, RecordType> {
  searchFields?: SearchFieldsType;
  searchButtonText?: ReactNode;
  resetButtonText?: ReactNode;
  extraOperationButtons?: ReactNode;
  loadDataImmediately?: boolean;
  onSearch?: OnSearchFunction<FormObjectType, RecordType>;
  onBeforeReset?: () => void;
}

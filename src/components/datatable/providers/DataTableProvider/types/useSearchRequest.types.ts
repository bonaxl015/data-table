import {
  OnSearchFunction,
  OnSearchResponseData,
} from "../../components/SearchFields/types/SearchForm.types";

export type OnSearchParams<FormObjectType> = {
  values: FormObjectType;
  pageNumber: number;
  pageSize: number;
};

export type RequestDataFunctionType<FormObjectType, RecordType> = (
  info: OnSearchParams<FormObjectType>,
  onSearch: OnSearchFunction<FormObjectType, RecordType>,
) => Promise<OnSearchResponseData<RecordType> | null>;

export type CreateInfoObjectType<FormObjectType> = (
  formData: FormObjectType,
  pageNumber: number,
  pageSize: number,
) => OnSearchParams<FormObjectType>;

export type UseSearchRequestOutput<FormObjectType, RecordType> = {
  requestData: RequestDataFunctionType<FormObjectType, RecordType>;
  createInfoObject: CreateInfoObjectType<FormObjectType>;
};

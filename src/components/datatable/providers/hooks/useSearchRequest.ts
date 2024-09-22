import { useCallback } from "react";
import {
  OnSearchParams,
  UseSearchRequestOutput,
} from "../types/useSearchRequest.types";
import {
  OnSearchFunction,
  OnSearchResponseData,
} from "../../components/SearchFields/types/SearchForm.types";

const useSearchRequest = <
  FormObjectType,
  RecordType extends object,
>(): UseSearchRequestOutput<FormObjectType, RecordType> => {
  const createInfoObject = useCallback(
    (formData: FormObjectType, pageNumber: number, pageSize: number) => ({
      values: formData,
      pageNumber,
      pageSize,
    }),
    [],
  );

  const requestData = useCallback(
    async (
      { values, pageNumber, pageSize }: OnSearchParams<FormObjectType>,
      onSearch: OnSearchFunction<FormObjectType, RecordType>,
    ): Promise<OnSearchResponseData<RecordType> | null> => {
      if (onSearch) {
        const searchResult = await onSearch?.({ values, pageNumber, pageSize });
        return searchResult;
      }
      return null;
    },
    [],
  );

  return { requestData, createInfoObject };
};

export default useSearchRequest;

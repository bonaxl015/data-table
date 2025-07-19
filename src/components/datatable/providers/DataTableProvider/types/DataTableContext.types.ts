import { ReactNode } from "react";
import { UseSearchRequestOutput } from "./useSearchRequest.types";
import { UseDataSourceOutput } from "./useDataSource.types";
import { UseLoadingOutput } from "./useLoading.types";
import { UsePageInfoOutput } from "./usePageInfo.types";
import { UseSearchFormOutput } from "./useSearchForm.types";

export type DataTableContextType<FormObjectType, RecordType> =
  UseDataSourceOutput<RecordType> &
    UseLoadingOutput &
    UsePageInfoOutput &
    UseSearchFormOutput<FormObjectType> &
    UseSearchRequestOutput<FormObjectType, RecordType>;

export interface DataTableProviderProps {
  children: ReactNode;
}

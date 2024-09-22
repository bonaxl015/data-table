import { Context, createContext, useContext } from "react";
import {
  DataTableContextType,
  DataTableProviderProps,
} from "./types/DataTableContext.types";
import useDataSource from "./hooks/useDataSource";
import useLoading from "./hooks/useLoading";
import useSearchRequest from "./hooks/useSearchRequest";
import useSearchForm from "./hooks/useSearchForm";
import usePageInfo from "./hooks/usePageInfo";
import { dataContextInitData } from "./data/dataTableContextInitData";

const DataTableContext = createContext(dataContextInitData);

export const useDataTable = <FormObjectType, RecordType extends object>() => {
  const context = useContext(
    DataTableContext as Context<
      DataTableContextType<FormObjectType, RecordType>
    >,
  );
  if (!context) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context;
};

export const DataTableProvider = <FormObjectType, RecordType extends object>({
  children,
}: DataTableProviderProps) => {
  const { dataSource, updateDataSource } = useDataSource<RecordType>();
  const { isLoading, updateLoading } = useLoading();
  const {
    pageSizeNumber,
    updatePageSizeNumber,
    pageNumber,
    updatePageNumber,
    totalItems,
    updateTotalItems,
  } = usePageInfo();
  const { searchFormInstance } = useSearchForm<FormObjectType>();
  const { requestData, createInfoObject } = useSearchRequest<
    FormObjectType,
    RecordType
  >();

  return (
    <DataTableContext.Provider
      value={{
        dataSource,
        updateDataSource,
        isLoading,
        updateLoading,
        requestData,
        createInfoObject,
        searchFormInstance,
        pageSizeNumber,
        updatePageSizeNumber,
        pageNumber,
        updatePageNumber,
        totalItems,
        updateTotalItems,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};

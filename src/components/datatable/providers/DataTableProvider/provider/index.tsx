import { DataTableContext } from "../context";
import useDataSource from "../hooks/useDataSource";
import useLoading from "../hooks/useLoading";
import usePageInfo from "../hooks/usePageInfo";
import useSearchForm from "../hooks/useSearchForm";
import useSearchRequest from "../hooks/useSearchRequest";
import { DataTableProviderProps } from "../types/DataTableContext.types";

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

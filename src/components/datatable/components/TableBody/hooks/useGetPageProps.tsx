import {
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import PageTotalDisplay from "../styles/PageTotalDisplay";
import { TablePaginationConfig } from "antd/es/table";
import {
  GetPagePropsOutput,
  PageSizeOptions,
} from "../types/useGetPageProps.types";
import { useDataTable } from "../../../providers/DataTableContext";
import { OnSearchFunction } from "../../SearchFields/types/SearchForm.types";
import useRequestData from "../../../hooks/useRequestData";
import { PageDefaultValues } from "../../../enums/pageInfo";

function useGetPageProps<FormObjectType, RecordType extends object>(
  pageSizeOptions: PageSizeOptions = [10, 20, 50, 100],
  defaultPageSize: number = PageDefaultValues.PAGE_SIZE,
  onSearch: OnSearchFunction<FormObjectType, RecordType>,
): GetPagePropsOutput {
  const {
    searchFormInstance,
    pageSizeNumber,
    pageNumber,
    totalItems,
    createInfoObject,
    updatePageSizeNumber,
    updatePageNumber,
  } = useDataTable<FormObjectType, RecordType>();
  const { handleRequestData } = useRequestData(onSearch);

  useEffect(() => {
    updatePageNumber(PageDefaultValues.PAGE_NUMBER);
  }, [pageSizeNumber, updatePageNumber]);

  const handleSetPageSizeNumber = useCallback(
    (page: number, pageSize: number) => {
      return (prevState: SetStateAction<number>) => {
        const formValues = searchFormInstance.getFieldsValue(true);
        const pageNumValue =
          prevState === pageSize ? page : PageDefaultValues.PAGE_NUMBER;
        const infoObject = createInfoObject(formValues, pageNumValue, pageSize);
        handleRequestData(infoObject);
        return pageSize;
      };
    },
    [createInfoObject, handleRequestData, searchFormInstance],
  );

  const handlePaginationChange = useCallback(
    (page: number, pageSize: number): void => {
      updatePageNumber(page);
      updatePageSizeNumber(handleSetPageSizeNumber(page, pageSize));
    },
    [handleSetPageSizeNumber, updatePageNumber, updatePageSizeNumber],
  );

  const paginationProps: TablePaginationConfig = useMemo(
    () => ({
      size: "small",
      responsive: true,
      showSizeChanger: true,
      defaultPageSize,
      pageSizeOptions,
      current: pageNumber,
      pageSize: pageSizeNumber,
      total: totalItems,
      showTotal: (total): ReactNode => (
        <PageTotalDisplay>Total of {total} items</PageTotalDisplay>
      ),
      onChange: handlePaginationChange,
    }),
    [
      defaultPageSize,
      handlePaginationChange,
      pageNumber,
      pageSizeNumber,
      pageSizeOptions,
      totalItems,
    ],
  );

  return { paginationProps };
}

export default useGetPageProps;

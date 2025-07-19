import { Context, createContext, useContext } from "react";
import { FormInstance } from "antd";
import { PageDefaultValues } from "../../../enums/pageInfo";
import { DataTableContextType } from "../types/DataTableContext.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataContextInitData: DataTableContextType<any, any> = {
  dataSource: [],
  updateDataSource: () => {},
  isLoading: false,
  updateLoading: () => {},
  requestData: () =>
    new Promise((resolve) => {
      resolve({
        dataSource: [],
        total: 0,
      });
    }),
  createInfoObject: () => ({
    values: {},
    pageNumber: PageDefaultValues.PAGE_NUMBER,
    pageSize: PageDefaultValues.PAGE_SIZE,
  }),
  searchFormInstance: {} as FormInstance,
  pageSizeNumber: PageDefaultValues.PAGE_SIZE,
  updatePageSizeNumber: () => {},
  pageNumber: PageDefaultValues.PAGE_NUMBER,
  updatePageNumber: () => {},
  totalItems: 0,
  updateTotalItems: () => {},
};

export const DataTableContext = createContext(dataContextInitData);

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

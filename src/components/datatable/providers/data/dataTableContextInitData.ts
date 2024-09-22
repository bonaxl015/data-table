import { FormInstance } from "antd";
import { PageDefaultValues } from "../../enums/pageInfo";
import { DataTableContextType } from "../types/DataTableContext.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dataContextInitData: DataTableContextType<any, any> = {
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

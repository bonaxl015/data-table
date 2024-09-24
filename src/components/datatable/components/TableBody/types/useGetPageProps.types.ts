import { TablePaginationConfig } from "antd";

export type PageSizeOptions = string[] | number[];

export type GetPagePropsOutput = {
  paginationProps: TablePaginationConfig;
};

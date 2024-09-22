import { SetStateAction } from "react";

export type UpdatePageSizeInput =
  | number
  | ((prevState: SetStateAction<number>) => number);

export type UsePageInfoOutput = {
  pageSizeNumber: number;
  updatePageSizeNumber: (pageSize: UpdatePageSizeInput) => void;
  pageNumber: number;
  updatePageNumber: (page: number) => void;
  totalItems: number;
  updateTotalItems: (totalCount: number) => void;
};

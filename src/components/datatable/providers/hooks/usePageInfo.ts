import { useCallback, useState } from "react";
import { PageDefaultValues } from "../../enums/pageInfo";
import {
  UpdatePageSizeInput,
  UsePageInfoOutput,
} from "../types/usePageInfo.types";

const usePageInfo = (): UsePageInfoOutput => {
  const [pageSizeNumber, setPageSizeNumber] = useState<number>(
    PageDefaultValues.PAGE_SIZE,
  );
  const [pageNumber, setPageNumber] = useState<number>(
    PageDefaultValues.PAGE_NUMBER,
  );
  const [totalItems, setTotalItems] = useState<number>(0);

  const updatePageSizeNumber = useCallback((pageSize: UpdatePageSizeInput) => {
    setPageSizeNumber(pageSize);
  }, []);

  const updatePageNumber = useCallback((page: number) => {
    setPageNumber(page);
  }, []);

  const updateTotalItems = useCallback((totalCount: number) => {
    setTotalItems(totalCount);
  }, []);

  return {
    pageSizeNumber,
    updatePageSizeNumber,
    pageNumber,
    updatePageNumber,
    totalItems,
    updateTotalItems,
  };
};

export default usePageInfo;

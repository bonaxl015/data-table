import { OnSearchFunction } from "../components/SearchFields/types/SearchForm.types";
import { useDataTable } from "../providers/DataTableContext";
import { OnSearchParams } from "../providers/types/useSearchRequest.types";
import {
  HandleRequestDataFunction,
  UseRequestDataOutput,
} from "../types/useRequestData.types";

const useRequestData = <FormObjectType, RecordType extends object>(
  onSearch: OnSearchFunction<FormObjectType, RecordType>,
): UseRequestDataOutput<FormObjectType> => {
  const {
    updateLoading,
    requestData,
    updateDataSource,
    updatePageNumber,
    updatePageSizeNumber,
    updateTotalItems,
  } = useDataTable<FormObjectType, RecordType>();

  const handleRequestData: HandleRequestDataFunction<FormObjectType> = async (
    infoObject: OnSearchParams<FormObjectType>,
  ) => {
    if (onSearch) {
      updateLoading(true);
      requestData(infoObject, onSearch)
        .then((responseData) => {
          if (responseData) {
            updatePageNumber(infoObject.pageNumber);
            updatePageSizeNumber(infoObject.pageSize);
            updateDataSource(responseData?.dataSource || []);
            updateTotalItems(responseData?.total || 0);
          }
        })
        .finally(() => {
          updateLoading(false);
        });
    }
  };

  return { handleRequestData };
};

export default useRequestData;

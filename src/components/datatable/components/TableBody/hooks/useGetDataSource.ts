import { useEffect } from "react";
import { useDataTable } from "../../../providers/DataTableContext";
import { UseGetDataSourceOutput } from "../types/useGetDataSource.types";

const useGetDataSource = <FormObjectType, RecordType extends object>(
  dataSourceFromProps: RecordType[],
): UseGetDataSourceOutput<RecordType> => {
  const { dataSource, updateDataSource } = useDataTable<
    FormObjectType,
    RecordType
  >();

  useEffect(() => {
    if (dataSourceFromProps?.length) {
      updateDataSource(dataSourceFromProps);
    }
  }, [dataSource, dataSourceFromProps, updateDataSource]);

  return { updatedDataSource: dataSource };
};

export default useGetDataSource;

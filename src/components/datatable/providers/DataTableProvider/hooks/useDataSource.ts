import { useCallback, useState } from "react";
import { UseDataSourceOutput } from "../types/useDataSource.types";

const useDataSource = <RecordType>(): UseDataSourceOutput<RecordType> => {
  const [dataSource, setDataSource] = useState<RecordType[]>([]);

  const updateDataSource = useCallback((data: RecordType[]): void => {
    setDataSource(data);
  }, []);

  return { dataSource, updateDataSource };
};

export default useDataSource;

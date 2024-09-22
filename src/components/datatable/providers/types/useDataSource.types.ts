export type UseDataSourceOutput<RecordType> = {
  dataSource: RecordType[];
  updateDataSource: (data: RecordType[]) => void;
};

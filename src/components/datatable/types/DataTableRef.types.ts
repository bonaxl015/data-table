import { FormInstance } from "antd";

export type DataTableRefs<FormObjectType, RecordType> =
  | {
      dataSource: RecordType[];
      searchFormInstance: FormInstance<FormObjectType>;
      pageSizeNumber: number;
      pageNumber: number;
      totalItems: number;
    }
  | undefined;

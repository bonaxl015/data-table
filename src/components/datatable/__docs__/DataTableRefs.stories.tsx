import type { Meta, StoryObj } from "@storybook/react";
import {
  actionsColumn,
  columns,
  dataSourceHundredData,
  searchFields,
} from "./mock-data";
import { DataTable } from "../index";
import { createRef } from "react";

const meta: Meta<typeof DataTable> = {
  title: "Refs",
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tableRef = createRef<any>();

export const AccessRefs: Story = {
  args: {
    rowKey: "id",
    ref: tableRef,
    columns,
    searchFields,
    actionsColumn,
    onSearch: (info) => {
      console.log("info", info);
      console.log("tableRef", tableRef);
      return {
        dataSource: dataSourceHundredData,
        total: dataSourceHundredData.length,
      };
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";
import {
  actionsColumn,
  columns,
  dataSource,
  dataSourceHundredData,
  searchFields,
} from "./mock-data";

const meta: Meta<typeof Example> = {
  title: "Pagination",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Basic: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource: dataSourceHundredData,
    searchFields,
    actionsColumn,
  },
};

export const SetDefaultPageSize: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource: dataSourceHundredData,
    searchFields,
    actionsColumn,
    defaultPageSize: 20,
  },
};

export const SetPageSizeOptions: Story = {
  args: {
    rowKey: "id",
    columns,
    searchFields,
    actionsColumn,
    pageSizeOptions: [10, 50, 100, 500, 1000],
    onSearch: (info) => {
      console.log("info", info);
      return {
        dataSource,
        total: 100,
      };
    },
  },
};

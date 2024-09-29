import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";
import {
  columns,
  dataSource,
  emptySearchFields,
  extraOperationButtons,
  searchFields,
  searchFieldsRequired,
  tableOperations,
} from "./mock-data";
import { message } from "antd";

const meta: Meta<typeof Example> = {
  title: "Search Fields",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Custom: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource,
    searchFields,
    searchButtonText: "Search",
    resetButtonText: "Reset",
    extraOperationButtons,
  },
};

export const Empty: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource,
    searchFields: emptySearchFields,
  },
};

export const Required: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource,
    searchFields: searchFieldsRequired,
  },
};

export const TableOperations: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource,
    searchFields,
    tableOperations,
  },
};

export const OnsearchWithPromise: Story = {
  args: {
    rowKey: "id",
    columns,
    searchFields,
    tableOperations,
    loadDataImmediately: false,
    onSearch: (info) =>
      new Promise((resolve) => {
        console.log("info", info);
        resolve({
          dataSource,
          total: 10,
        });
      }),
  },
};

export const OnsearchWithoutPromise: Story = {
  args: {
    rowKey: "id",
    columns,
    searchFields,
    tableOperations,
    loadDataImmediately: false,
    onSearch: (info) => {
      console.log("info", info);
      return {
        dataSource,
        total: 5,
      };
    },
  },
};

export const BeforeReset: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource,
    searchFields,
    onBeforeReset: () => {
      console.log("onBeforeReset executed");
      message.info("onBeforeReset executed");
    },
  },
};

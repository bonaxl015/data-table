import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";
import { columns, dataSource, searchFields } from "./mock-data";

const meta: Meta<typeof Example> = {
  title: "Normal",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const BasicUsage: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource,
    searchFields,
  },
};

export const EmptyDataSource: Story = {
  args: {
    rowKey: "id",
    columns,
    searchFields,
  },
};

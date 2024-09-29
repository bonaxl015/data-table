import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";
import { actionsColumn, columns, dataSource, searchFields } from "./mock-data";

const meta: Meta<typeof Example> = {
  title: "Columns",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Actions: Story = {
  args: {
    rowKey: "id",
    columns,
    dataSource,
    searchFields,
    actionsColumn,
  },
};

export const ActionsWithoutDataSource: Story = {
  args: {
    rowKey: "id",
    columns,
    searchFields,
    actionsColumn,
  },
};

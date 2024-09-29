import { Button, Input, InputNumber, Space } from "antd";
import React from "react";

type AlignType = "right" | "center" | "left";

export const columns = [
  {
    key: "number",
    title: "No",
    dataIndex: "number",
    align: "center" as AlignType,
    render: (_text, _record, index) => <p>{index + 1}</p>,
  },
  {
    key: "firstName",
    title: "First Name",
    dataIndex: "firstName",
    align: "center" as AlignType,
  },
  {
    key: "lastName",
    title: "Last Name",
    dataIndex: "lastName",
    align: "center" as AlignType,
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    align: "center" as AlignType,
  },
];

export const searchFields = [
  {
    name: "firstName",
    label: "First Name",
    children: <Input autoComplete="off" maxLength={20} />,
  },
  {
    name: "lastName",
    label: "Last Name",
    children: <Input autoComplete="off" maxLength={20} />,
  },
  {
    name: "age",
    label: "Age",
    children: <InputNumber autoComplete="off" min={0} max={99} />,
  },
];

export const searchFieldsRequired = [
  {
    name: "firstName",
    label: "First Name",
    children: <Input autoComplete="off" maxLength={20} />,
    required: true,
    rules: [
      {
        required: true,
        message: "First Name is required",
      },
    ],
  },
  {
    name: "lastName",
    label: "Last Name",
    children: <Input autoComplete="off" maxLength={20} />,
    required: true,
    rules: [
      {
        required: true,
        message: "Last Name is required",
      },
    ],
  },
  {
    name: "age",
    label: "Age",
    children: <InputNumber autoComplete="off" min={0} max={99} />,
    required: true,
    rules: [
      {
        required: true,
        message: "Age is required",
      },
    ],
  },
];

export const emptySearchFields = [];

export const dataSource = [
  {
    id: 1,
    firstName: "Harvin",
    lastName: "Gay",
    age: 22,
  },
  {
    id: 2,
    firstName: "Teezy",
    lastName: "Gay",
    age: 34,
  },
];

export const dataSourceHundredData = Array(100)
  .fill(1)
  .map((_item, index) => ({
    id: index + 1,
    firstName: "Teezy",
    lastName: "Gay",
    age: index + 1,
  }));

export const extraOperationButtons = (
  <Space>
    <Button>Extra 1</Button>
    <Button>Extra 2</Button>
    <Button>Extra 3</Button>
  </Space>
);

export const tableOperations = (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <p>Additional Operations</p>
    <Button> Additional Operations</Button>
  </div>
);

export const actionsColumn = [
  {
    title: "Edit",
    isDisplay: () => true,
    onClick: (record) => {
      console.log(record);
    },
  },
  {
    title: "Edit Hide",
    isDisplay: () => false,
    onClick: (record) => {
      console.log(record);
    },
  },
  {
    title: "Disabled",
    isDisplay: () => true,
    isDisabled: (record) => record.age < 5,
    onClick: (record) => {
      console.log(record);
    },
  },
  {
    title: <span style={{ color: "red" }}>Delete</span>,
    isDisplay: () => true,
    onClick: (record) => {
      console.log(record);
    },
  },
];

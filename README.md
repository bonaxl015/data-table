# DataTable

Component library that extends the usage of antd library to 
display data with complete functionality such as search filters, 
table row operations, paginations and lots of custom functionalities.

#### Peer Dependencies

```
  "antd": "^5.20.5",
  "react": "^18.3.1"
```

#### Basic Usage

```ts
import { DataTable } from "@bonaxl015/data-table";
import { Input } from "antd";

const App = () => {
  const columns = [
    {
      key: 'number',
      title: 'No',
      dataIndex: 'number',
      align: 'center',
      render: (_text, _record, index) => <p>{index + 1}</p>
    },
    {
      key: 'firstName',
      title: 'First Name',
      dataIndex: 'firstName',
      align: 'center'
    },
    {
      key: 'lastName',
      title: 'Last Name',
      dataIndex: 'lastName',
      align: 'center'
    },
    {
      key: 'age',
      title: 'Age',
      dataIndex: 'age',
      align: 'center'
    }
  ];

  const dataSource = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      age: 11
    },
    {
      id: 2,
      firstName: 'Marco',
      lastName: 'Dela Rosa',
      age: 22
    },
    {
      id: 3,
      firstName: 'Gerald',
      lastName: 'Santos',
      age: 33
    }
  ]

  const searchFields = [
    {
      name: 'firstName',
      label: 'First Name',
      children: <Input />,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      children: <Input />,
    }
  ]

  const actionsColumn = [
    {
      title: "Edit",
      isDisplay: () => true,
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

  return (
    <DataTable
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      searchFields={searchFields}
      actionsColumn={actionsColumn}
      pageSizeOptions={[10, 20, 50, 100]}
    />
  );
};

export default App;
```
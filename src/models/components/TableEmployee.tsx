import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
import moment from "moment";

import { IEmployee } from "../../interfaces/Employee";
import { useGetEmployeesQuery } from "../../api/employee";
import { Link } from "react-router-dom";
type TableRowSelection<T> = TableProps<T>["rowSelection"];

const TableEmployee = () => {
  const { data: employees = [], isLoading } = useGetEmployeesQuery({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableColumnsType<IEmployee> = [
    {
      title: "NIK",
      dataIndex: "staff_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Mother Name",
      dataIndex: "mother_name",
    },
    {
      title: "Marriage Status",
      dataIndex: "marriage_id",
    },
    {
      title: "Possition",
      dataIndex: "possition_id",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "KTP No.",
      dataIndex: "ktp_no",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile_no",
    },
    {
      title: "Tel No",
      dataIndex: "entitle_ot",
    },
    {
      title: "Department",
      dataIndex: "department_id",
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IEmployee> = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div className="box_table">
      <div className="action_table">
        <Button type="primary">
          <FileAddOutlined />
          <Link to="/add-employee">Add</Link>
        </Button>
        <Button danger>
          <DeleteOutlined />
          Delete
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={employees.data}
        loading={isLoading}
        pagination={{ defaultPageSize: 20 }}
      />
    </div>
  );
};

export default TableEmployee;

import React, { useState } from "react";
import { Table, Button, Checkbox, message, Modal, Pagination } from "antd";
import moment from "moment";
import { FileAddOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "../../api/employee";
import { Link } from "react-router-dom";

const TableNew = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { data: employees = [], refetch } = useGetEmployeesQuery({
    page: currentPage,
    size: pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Cập nhật current_page khi chuyển trang
  };

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleRemoveSelected = async () => {
    try {
      await deleteEmployee(selectedRowKeys);
      setSelectedRowKeys([]);
      refetch();
      message.success("Employees deleted successfully.");
      setConfirmVisible(false); // Đóng Modal sau khi xóa thành công
    } catch (error) {
      console.error("Error deleting employees:", error);
      message.error("Failed to delete employees.");
    }
  };

  const handleSelectAll = (e: any) => {
    const checked = e.target.checked;
    const allIds = employees.data.map((employee) => employee.id);
    setSelectedRowKeys(checked ? allIds : []);
  };

  const columns = [
    {
      title: <Checkbox onChange={handleSelectAll} />,
      dataIndex: "selected",
      render: (_text: string, record: any) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={() =>
            onSelectChange(
              selectedRowKeys.includes(record.id)
                ? selectedRowKeys.filter((key) => key !== record.id)
                : [...selectedRowKeys, record.id]
            )
          }
        />
      ),
    },
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
      title: "Position",
      dataIndex: "position_id",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (text: string) => moment(text).format("DD/MM/YYYY"),
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

  const dataSource = employees.data
    ? employees.data.map((employee) => ({
        ...employee,
        key: employee.staff_id,
      }))
    : [];

  const showConfirmModal = () => {
    setConfirmVisible(true);
  };

  return (
    <div className="box_table">
      <div className="header_table">
        <div className="title">
          <h3>Employee Management</h3>
        </div>
      </div>
      <div className="action_table">
        <Button type="primary">
          <FileAddOutlined />
          <Link to="/add-employee">Add</Link>
        </Button>
        <Button
          type="primary"
          danger
          disabled={selectedRowKeys.length === 0}
          onClick={showConfirmModal}
        >
          <DeleteOutlined />
          Delete
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      {/* Pagination */}
      <Pagination
        style={{ marginTop: "16px", textAlign: "center" }}
        total={employees.total} // Tổng số Employee
        pageSize={pageSize}
        current={currentPage}
        onChange={handlePageChange}
      />

      {/* Modal confirm khi xóa */}
      <Modal
        title="Confirm Deletion"
        visible={confirmVisible}
        onOk={handleRemoveSelected}
        onCancel={() => setConfirmVisible(false)}
        okText="OK"
        cancelText="Cancel"
      >
        Are you sure you want to delete the selected employees?
      </Modal>
    </div>
  );
};

export default TableNew;

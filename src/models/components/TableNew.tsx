import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Checkbox,
  message,
  Modal,
  Pagination,
  Spin,
} from "antd";
import moment from "moment";
import {
  FileAddOutlined,
  DeleteOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "../../api/employee";
import { Link, useNavigate } from "react-router-dom";
import { IEmployee } from "../../interfaces/Employee";

const TableNew = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const pageSize = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 1000);

    return () => clearTimeout(timeout); // Clear timeout khi searchKeyword thay đổi
  }, [searchKeyword]); // Chỉ gọi lại useEffect khi searchKeyword thay đổi
  const {
    data: employees = [],
    refetch,
    isLoading: isEmployeesLoading,
  } = useGetEmployeesQuery({
    page: currentPage,
    size: pageSize,
    search: searchKeyword,
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value); // Cập nhật từ khóa tìm kiếm khi người dùng nhập
    setCurrentPage(1); // Reset trang về trang đầu tiên khi tìm kiếm
  };
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
    const allIds = employees.data.map((employee: IEmployee) => employee.id);
    setSelectedRowKeys(checked ? allIds : []);
  };

  const handleDoubleCick = (record: IEmployee) => {
    navigate(`/add-or-update-employee/${record.id}`);
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
    ? employees.data.map((employee: IEmployee) => ({
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
        <div className="box_search">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search ..."
            value={searchKeyword}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="action_table">
        <Button type="primary">
          <FileAddOutlined />
          <Link to="/add-or-update-employee">Add</Link>
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
      <Spin
        spinning={isEmployeesLoading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          onRow={(record) => ({
            onDoubleClick: () => handleDoubleCick(record),
          })}
        />
        <div className="row_pagination">
          <Pagination
            style={{ marginTop: "16px", textAlign: "center" }}
            total={employees.total}
            pageSize={pageSize}
            current={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </Spin>

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

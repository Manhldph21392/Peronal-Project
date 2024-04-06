import React, { useState } from "react";
import { Tabs } from "antd";
import { Button, DatePicker, Form } from "antd";
import EmployeeInfomation from "./EmployeeInfomation";
import ContractInfomation from "./ContractInfomation";
import EmploymentDetails from "./EmploymentDetails";
import SalaryWages from "./SalaryWages";
import Other from "./Other";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const FormAddEmployee = () => {
  const [activeTab, setActiveTab] = useState("1");

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleAddButtonClick = () => {
    // Đây là nơi xử lý khi nút "Add" được nhấn
    console.log("Add button clicked!");
    // Thêm mã logic ở đây để lấy dữ liệu từ các Tab và thực hiện các hành động cần thiết
  };

  return (
    <div>
      <div className="title_page">
        <h2>Employee Management</h2>
        <Button type="primary" onClick={handleAddButtonClick}>Add</Button>
      </div>
      <Form {...formItemLayout} variant="filled">
        <div className="box_tabs">
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Employee Information" key="1">
              <EmployeeInfomation />
            </TabPane>
            <TabPane tab="Contract Information" key="2">
              <ContractInfomation />
            </TabPane>
            <TabPane tab="Employment Details" key="3">
              <EmploymentDetails />
            </TabPane>
            <TabPane tab="Salary & Wages" key="4">
              <SalaryWages />
            </TabPane>
            <TabPane tab="Others" key="5">
              <Other />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </div>
  );
};

export default FormAddEmployee;

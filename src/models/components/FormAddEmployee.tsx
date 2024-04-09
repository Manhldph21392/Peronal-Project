import React, { useState } from "react";
import { Tabs, message } from "antd";
import { Button, Form } from "antd";
import { useAppSelector } from "../../stores/store";

import EmployeeInfomation from "./EmployeeInfomation";
import ContractInfomation from "./ContractInfomation";
import EmploymentDetails from "./EmploymentDetails";
import SalaryWages from "./SalaryWages";
import Other from "./Other";
import { useCreateEmployeeMutation } from "../../api/employee";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const FormAddEmployee = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [createEmployee, { isLoading: isCreatingEmployee }] =
    useCreateEmployeeMutation();
    const navigate = useNavigate();

  // Lấy dữ liệu từ Redux store
  const employeeInfomation = useAppSelector(
    (state) => state.employee.employeeInfomation
  );
  const contractInfomation = useAppSelector(
    (state) => state.employee.contractInfomation
  );
  const employmentDetails = useAppSelector(
    (state) => state.employee.employmentDetails
  );
  const salaryWages = useAppSelector((state) => state.employee.salaryWages);
  const other = useAppSelector((state) => state.employee.other);
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

  const handleAddButtonClick = async () => {
    try {
      await createEmployee({
        ...employeeInfomation,
        ...contractInfomation,
        ...employmentDetails,
        ...salaryWages,
        ...other,
      });
      navigate("/table-employee");
      message.success("Add employee successfully");
    } catch (error) {
      message.error("Failed to add employee. Please try again later");
    }
  };

  return (
    <div>
      <div className="title_page">
        <h2>Employee Management</h2>
        <Button
          type="primary"
          onClick={handleAddButtonClick}
          disabled={isCreatingEmployee}
        >
          {isCreatingEmployee ? "Adding..." : "Add"}
        </Button>
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

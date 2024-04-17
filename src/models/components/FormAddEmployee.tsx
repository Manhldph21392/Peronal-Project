import React, { useState } from "react";
import { Tabs, message } from "antd";
import { Button, Form } from "antd";
import { useAppSelector } from "../../stores/store";

import EmployeeInfomation from "./EmployeeInfomation";
import ContractInfomation from "./ContractInfomation";
import EmploymentDetails from "./EmploymentDetails";
import SalaryWages from "./SalaryWages";
import Other from "./Other";
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../api/employee";
import { useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../../interfaces/Employee";

const { TabPane } = Tabs;

const FormAddEmployee = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [createEmployee, { isLoading: isCreatingEmployee }] =
    useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const hasId = !!id;
  const [employeeInfoData, setEmployeeInfoData] = useState<IEmployee>();


  const updateEmployeeInfoData = (data: IEmployee) => {
    setEmployeeInfoData(data);
  };
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

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

const handleAddEmployee = async () => {
  try {
    await createEmployee({
      ...employeeInfomation,
      ...contractInfomation,
      ...employmentDetails,
      ...salaryWages,
      ...other,
    });
    navigate("/employee");
    message.success("Add employee successfully");
  } catch (error) {
    message.error("Failed to add employee. Please try again later");
  }
};

const handleUpdateEmployee = async () => {
  try {
    await updateEmployee({
      ...employeeInfoData,
    });
    navigate("/employee");
    message.success("Update employee successfully");
  } catch (error) {
    message.error("Failed to update employee. Please try again later");
  }
};


const handleButtonClick = async () => {
  if (hasId) {
    // Nếu có ID, thực hiện cập nhật
    await handleUpdateEmployee();
  } else {
    // Nếu không có ID, thực hiện thêm mới
    await handleAddEmployee();
  }
};
  return (
    <div>
      <div className="title_page">
        <h2>Employee Management</h2>
        {hasId ? (
          <Button
            type="primary"
            onClick={handleButtonClick}
            disabled={isCreatingEmployee}
          >
            {isCreatingEmployee ? "Updating..." : "Update"}
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleButtonClick}
            disabled={isCreatingEmployee}
          >
            {isCreatingEmployee ? "Adding..." : "Add"}
          </Button>
        )}
      </div>
      <div className="box_tabs">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Employee Information" key="1">
            <EmployeeInfomation onUpdateEmployeeInfo={updateEmployeeInfoData} id = {id} />
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
    </div>
  );
};

  export default FormAddEmployee;

import { useState } from "react";
import { Form, Tabs, message, notification } from "antd";
import { Button } from "antd";
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
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const { TabPane } = Tabs;

const FormAddEmployee = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [createEmployee, { isLoading: isCreatingEmployee }] =
    useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const hasId = !!id;

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
      const response = await createEmployee({
        ...employeeInfomation,
        ...contractInfomation,
        ...employmentDetails,
        ...salaryWages,
        ...other,
        dob: employeeInfomation.dob,
        contract_start_date: contractInfomation.contract_start_date,
      });

      if ("error" in response) {
        const errorResponse = response as { error: any };

        if (errorResponse.error.status) {
          const errorMessage =
            errorResponse.error.data?.message || "Unknown error";
          notification.error({
            message: "Thêm nhân viên không thành công",
            description: errorMessage,
            placement: "topRight",
          });
        } else {
          const errorMessage = errorResponse.error.message || "Unknown error";
          notification.error({
            message: "Thêm nhân viên không thành công",
            description: errorMessage,
            placement: "topRight",
          });
        }
      } else {
        const successResponse = response as { data: any };
        navigate("/employee");
        notification.success({
          message: "Thêm nhân viên thành công",
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: "Thêm nhân viên không thành công",
        description: "Vui lòng thử lại sau",
        placement: "topRight",
      });
    }
  };
  const handleUpdateEmployee = async () => {
    try {
      await updateEmployee({
        ...employeeInfomation,
        ...contractInfomation,
        ...employmentDetails,
        ...salaryWages,
        ...other,
        dob: employeeInfomation.dob,
        contract_start_date: contractInfomation.contract_start_date,
        id,
      });

      notification.success({
        message: "Cập nhật thông tin nhân viên thành công",
        placement: "topRight",
      });

      navigate("/employee");
    } catch (error) {
      notification.error({
        message: "Cập nhật thông tin nhân viên không thành công",
        description: "Vui lòng thử lại sau",
        placement: "topRight",
      });
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
            {isCreatingEmployee ? "Updating..." : "Save Change"}
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
        <Form>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Employee Information" key="1">
              <EmployeeInfomation id={id} />
            </TabPane>
            <TabPane tab="Contract Information" key="2">
              <ContractInfomation id={id} />
            </TabPane>
            <TabPane tab="Employment Details" key="3">
              <EmploymentDetails id={id} />
            </TabPane>
            <TabPane tab="Salary & Wages" key="4">
              <SalaryWages id={id} />
            </TabPane>
            <TabPane tab="Others" key="5">
              <Other id={id} />
            </TabPane>
          </Tabs>
        </Form>
      </div>
    </div>
  );
};

export default FormAddEmployee;

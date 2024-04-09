import { Checkbox, CheckboxProps, Form, Select } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store"; // Import hook useAppDispatch
import {
  useGetDepartmentsQuery,
  useGetPositionQuery,
} from "../../api/employee";
import { updateEmploymentDetails } from "../../slices/employe";

type Props = {};

const EmploymentDetails = (props: Props) => {
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery({});
  const { data: positions, isLoading: isPositionsLoading } =
    useGetPositionQuery({});

  const dispatch = useAppDispatch();
  const { employmentDetails } = useAppSelector((state) => state.employee);
  const handleDepartmentChange = (value: number) => {
    dispatch(
      updateEmploymentDetails({
        ...employmentDetails,
        department_id: value,
      })
    );
  };

  // Function to handle change in position selection
  const handlePositionChange = (value: number) => {
    dispatch(
      updateEmploymentDetails({
        ...employmentDetails,
        position_id: value,
      })
    );
  };
  // const handleHiddenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(
  //     updateEmploymentDetails({
  //       ...employmentDetails,
  //       hidden_on_payroll: e.target.checked.toString(),
  //     })
  //   );
  // };
  const handleHiddenChange: CheckboxProps["onChange"] = (e) => {
    dispatch(
      updateEmploymentDetails({
        ...employmentDetails,
        hidden_on_payroll: e.target.checked?"1":"0",
      })
    );
  };
  return (
    <div className="box_add">
      <div className="header-form">
        <h2 className="title">Employment Details</h2>
        <div className="status_required">
          Required (<span>*</span>)
        </div>
      </div>
      <div className="content_employment">
        <Form.Item label="Department" name="department_id">
          <Select
            placeholder="Select a department"
            style={{ width: "100%" }}
            loading={isDepartmentsLoading}
            onChange={handleDepartmentChange}
          >
            {departments &&
              departments.map((department) => (
                <Select.Option key={department.id} value={department.id}>
                  {department.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Position" name="position_id">
          <Select
            placeholder="Select a position"
            style={{ width: "100%" }}
            loading={isPositionsLoading}
            onChange={handlePositionChange}
          >
            {positions &&
              positions.map((position) => (
                <Select.Option key={position.id} value={position.id}>
                  {position.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Hidden Payroll" name="hidden_on_payroll">
          <Checkbox
            onChange={handleHiddenChange}
            value={Number(employmentDetails.hidden_on_payroll)}
          ></Checkbox>
        </Form.Item>
      </div>
    </div>
  );
};

export default EmploymentDetails;

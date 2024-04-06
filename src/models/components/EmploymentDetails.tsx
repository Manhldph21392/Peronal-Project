import { DatePicker, Form, Select } from "antd";
import React from "react";
import {
  useGetDepartmentsQuery,
  useGetPositionQuery,
} from "../../api/employee";

type Props = {};

const EmploymentDetails = (props: Props) => {
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery({});
  const { data: positions, isLoading: isPositionsLoading } =
    useGetPositionQuery({});

  return (
    <div className="box_add">
      <div className="header-form">
        <h2 className="title">Employment Details</h2>
        <div className="status_required">
          Required (<span>*</span>)
        </div>
      </div>
      <div className="content_employment">
        <Form.Item label="Department" name="department">
          <Select
            placeholder="Select a department"
            style={{ width: "100%" }}
            loading={isDepartmentsLoading}
          >
            {departments &&
              departments.map((department) => (
                <Select.Option key={department.id} value={department.id}>
                  {department.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Position" name="position">
          <Select
            placeholder="Select a position"
            style={{ width: "100%" }}
            loading={isPositionsLoading}
          >
            {positions &&
              positions.map((position) => (
                <Select.Option key={position.id} value={position.id}>
                  {position.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default EmploymentDetails;

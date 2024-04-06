import { Form, Input, InputNumber } from "antd";
import React from "react";

type Props = {};

const SalaryWages = (props: Props) => {
  return (
    <div className="box_add">
      <div className="header-form">
        <h2 className="title">Salary & Wages</h2>
       
      </div>
      <div className="content_employment">
        <Form.Item label="Basic salary" name="basic_salary">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Basic salary(Audit)" name="salary_audit">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Safety Insurance Amount"
          name="safety_insurance_amount"
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Meal Allowance" name="meal_allowance">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </div>
    </div>
  );
};

export default SalaryWages;

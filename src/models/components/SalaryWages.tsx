import { Form, Input, InputNumber } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { updateSalaryWages } from "../../slices/employe";

type Props = {};

const SalaryWages = (props: Props) => {
  const dispatch = useAppDispatch();
  const { salaryWages } = useAppSelector((state) => state.employee);
  const handleBasicSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueBasicSalary = Number(e.target.value);
    if (valueBasicSalary) {
      dispatch(
        updateSalaryWages({
          ...salaryWages,
          salary: valueBasicSalary,
        })
      );
    }
  };
  const handleBasicSalaryAuditChange = (value: number) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        basic_audit: value,
      })
    );
  };
  const handleSafetyInsuranceAmountChange = (value: number) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        satefy_insurance: value,
      })
    );
  };
  const handleMealAllowanceChange = (value: number) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        meal_allowance: value,
      })
    );
  };
  return (
    <div className="box_add">
      <div className="header-form">
        <h2 className="title">Salary & Wages</h2>
      </div>
      <div className="content_employment">
        <Form.Item label="Basic salary" name="basic_salary">
          <InputNumber style={{ width: "100%" }} value={salaryWages.salary} />
        </Form.Item>
        <Form.Item label="Basic salary(Audit)" name="salary_audit">
          <InputNumber
            style={{ width: "100%" }}
            value={salaryWages.basic_audit}
          />
        </Form.Item>
        <Form.Item
          label="Safety Insurance Amount"
          name="safety_insurance_amount"
        >
          <InputNumber
            style={{ width: "100%" }}
            value={salaryWages.satefy_insurance}
          />
        </Form.Item>
        <Form.Item label="Meal Allowance" name="meal_allowance">
          <InputNumber
            style={{ width: "100%" }}
            value={salaryWages.meal_allowance}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default SalaryWages;

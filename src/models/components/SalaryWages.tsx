import { Form, InputNumber } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { updateSalaryWages } from "../../slices/employe";
import { useGetEmployeeByIdQuery } from "../../api/employee";

const SalaryWages = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const { salaryWages } = useAppSelector((state) => state.employee);
  const [form] = Form.useForm();
  const { data: SalaryWagesData } = useGetEmployeeByIdQuery(id || "");

  useEffect(() => {
    if (SalaryWagesData) {
      form.setFieldsValue(SalaryWagesData);
    }
  });
  const handleBasicSalaryChange = (value: number | null) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        salary: value,
      })
    );
  };
  const handleBasicSalaryAuditChange = (value: number | null) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        basic_audit: value,
      })
    );
  };
  const handleSafetyInsuranceAmountChange = (value: number | null) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        satefy_insurance: value,
      })
    );
  };
  const handleMealAllowanceChange = (value: number | null) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        meal_allowance: value,
      })
    );
  };
  return (
    <Form form={form} >
      <div className="box_add">
        <div className="header-form">
          <h2 className="title">Salary & Wages</h2>
        </div>
        <div className="content_employment">
          <Form.Item label="Basic salary" name="basic_salary">
            <InputNumber
              style={{ width: "100%" }}
              value={salaryWages.salary}
              onChange={handleBasicSalaryChange}
            />
          </Form.Item>
          <Form.Item label="Basic salary(Audit)" name="audit_salary">
            <InputNumber
              style={{ width: "100%" }}
              value={salaryWages.basic_audit}
              onChange={handleBasicSalaryAuditChange}
            />
          </Form.Item>
          <Form.Item
            label="Safety Insurance Amount"
            name="safety_insurance_amount"
          >
            <InputNumber
              style={{ width: "100%" }}
              value={salaryWages.satefy_insurance}
              onChange={handleSafetyInsuranceAmountChange}
            />
          </Form.Item>
          <Form.Item label="Meal Allowance" name="meal_allowance">
            <InputNumber
              style={{ width: "100%" }}
              value={salaryWages.meal_allowance}
              onChange={handleMealAllowanceChange}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default SalaryWages;

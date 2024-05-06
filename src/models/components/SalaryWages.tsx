import { Form, InputNumber } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { ISalaryWages, updateSalaryWages } from "../../slices/employe";
import { useGetEmployeeByIdQuery } from "../../api/employee";

const SalaryWages = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const { salaryWages } = useAppSelector((state) => state.employee);
  const [form] = Form.useForm();
  const { data: SalaryWagesData } = useGetEmployeeByIdQuery(id || "");

  useEffect(() => {
    if (SalaryWagesData) {
      const {
        basic_salary,
        audit_salary,
        safety_insurance,
        health_insurance,
        meal_allowance,
      } = SalaryWagesData;
      const SalaryData: ISalaryWages = {
        basic_salary,
        audit_salary,
        safety_insurance,
        health_insurance,
        meal_allowance,
      };
      form.setFieldsValue(SalaryWagesData);
      dispatch(updateSalaryWages(SalaryData));
    }
  }, [SalaryWagesData]);
  const handleBasicSalaryChange = (value: number | null) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        basic_salary: value,
      })
    );
  };
  const handleBasicSalaryAuditChange = (value: number | null) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        audit_salary: value,
      })
    );
  };
  const handleSafetyInsuranceAmountChange = (value: number | null) => {
    dispatch(
      updateSalaryWages({
        ...salaryWages,
        safety_insurance: value,
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
    <Form form={form}>
      <div className="box_add">
        <div className="header-form">
          <h2 className="title">Salary & Wages</h2>
        </div>
        <div className="content_employment">
          <Form.Item label="Basic salary" name="basic_salary">
            <InputNumber
              style={{ width: "100%" }}
              value={salaryWages.basic_salary}
              onChange={handleBasicSalaryChange}
            />
          </Form.Item>
          <Form.Item label="Basic salary(Audit)" name="audit_salary">
            <InputNumber
              style={{ width: "100%" }}
              value={salaryWages.audit_salary}
              onChange={handleBasicSalaryAuditChange}
            />
          </Form.Item>
          <Form.Item
            label="Safety Insurance Amount"
            name="safety_insurance"
          >
            <InputNumber
              style={{ width: "100%" }}
              value={salaryWages.safety_insurance}
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

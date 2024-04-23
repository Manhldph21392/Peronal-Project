import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetDepartmentsQuery,
  useGetBenefitQuery,
  useGetEmployeeByIdQuery,
} from "../../api/employee";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { updateOther } from "../../slices/employe";

const Other = ({ id }: any) => {
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery({});
  const { data: benefits, isLoading: isBenefitsLoading } = useGetBenefitQuery(
    {}
  );
  const [gradeOptions, setGradeOptions] = useState<any[]>([]);
  const [benefitList, setBenefitList] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { other } = useAppSelector((state) => state.employee);
  const { data: otherData } = useGetEmployeeByIdQuery(id || "");
  const [form] = Form.useForm();

  useEffect(() => {
    if (otherData) {
      form.setFieldsValue(otherData);
    }
  });

 




  useEffect(() => {
    if (departments) {
      const grades = departments.map((department: any) => ({
        label: department.name,
        value: department.id,
      }));
      setGradeOptions(grades);
    }
  }, [departments]);

  useEffect(() => {
    if (benefits) {
      const benefitNames = benefits.map((benefit: any) => benefit.name);
      setBenefitList(benefitNames);
    }
  }, [benefits]);
  const handleBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setBenefitList([...benefitList, e.target.value]);
    } else {
      setBenefitList(benefitList.filter((item) => item !== e.target.value));
    }
  };
  const handleGradeChange = (value: number) => {
    dispatch(updateOther({ ...other, grade: value }));
  };
  useEffect(() => {
    if (benefits) {
      const benefitNames = benefits.map((benefit: any) => ({
        label: benefit.name,
        value: benefit.id,
      }));
      setBenefitList(benefitNames);
    }
  }, [benefits]);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form form={form}>
      <div className="box_add">
        <div className="header-form">
          <h2 className="title">Others</h2>
        </div>
        <div className="content_other">
          <Form.Item label="Grade" name="grade">
            <Select
              style={{ width: "100%" }}
              loading={isDepartmentsLoading}
              options={gradeOptions}
              value={other.grade}
              onChange={handleGradeChange}
            />
          </Form.Item>
          <Form.Item label="Benefit" name="benefit">
            <div className="list_benefit">
              <Select
                mode="multiple"
                style={{ width: "400px" }}
                placeholder="Select benefits"
                onChange={handleChange}
                loading={isBenefitsLoading}
                options={benefitList}
                
              />
            </div>
          </Form.Item>
          <Form.Item label="Benefit(Photo)" name="benefit_photo">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Form.Item>
          <Form.Item label="Remark" name="remark">
            <Input />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Other;

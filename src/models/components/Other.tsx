import { Button, Form, Input, Select, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useGetDepartmentsQuery, useGetBenefitQuery } from "../../api/employee";

type Props = {};

const Other = (props: Props) => {
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery({});
  const { data: benefits, isLoading: isBenefitsLoading } = useGetBenefitQuery(
    {}
  );
  const [gradeOptions, setGradeOptions] = useState<any[]>([]);
  const [benefitList, setBenefitList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  return (
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
          />
        </Form.Item>
        <Form.Item label="Benefit" name="benefit">
          <div className="list_benefit">
            <ul>
              {benefitList.map((benefit, index) => (
                <li key={index}>
                  <div className="benefit_item">{benefit}</div>
                  <div className="actions_benefit">
                    <Button danger>
                      <DeleteOutlined />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={showModal}
            >
              Add Benefit
            </Button>
            <Modal
              title="Add Benefit"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form.Item label="Name" name="benefit_name">
                <Input style={{ width: "100%" }} placeholder="Name" />
              </Form.Item>
              <Form.Item label="Code" name="code">
                <Input style={{ width: "100%" }} placeholder="Code" />
              </Form.Item>
              <Form.Item label="Type" name="type">
                <Input style={{ width: "100%" }} placeholder="Type" />
              </Form.Item>
            </Modal>
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
  );
};

export default Other;

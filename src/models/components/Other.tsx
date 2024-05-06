import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Upload,
  UploadProps,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetDepartmentsQuery,
  useGetBenefitQuery,
  useGetEmployeeByIdQuery,
} from "../../api/employee";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { IOther, updateOther } from "../../slices/employe";

const Other = ({ id }: any) => {
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery({});
  const { data: benefits, isLoading: isBenefitsLoading } = useGetBenefitQuery(
    {}
  );
  const [gradeOptions, setGradeOptions] = useState<any[]>([]);
  const [benefitList, setBenefitList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const { other } = useAppSelector((state) => state.employee);
  const { data: otherData } = useGetEmployeeByIdQuery(id || "");
  const [form] = Form.useForm();

  useEffect(() => {
    if (otherData) {
      const { grade_id, remark, benefits } = otherData;
      const otherDataTab: IOther = {
        grade_id,
        remark,
        benefits,
      };
      form.setFieldsValue(otherDataTab);
    }
  }, [otherData]);

  useEffect(() => {
    if (departments) {
      const grades = departments.map((department: any) => ({
        label: department.name,
        value: department.id,
      }));
      setGradeOptions(grades);
    }
  }, [departments]);

  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);

        setFileList([
          ...fileList,
          {
            name: info.file.name,
            createdAt: new Date().toISOString(),
          },
        ]);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const handleBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setBenefitList([...benefitList, e.target.value]);
    } else {
      setBenefitList(benefitList.filter((item) => item !== e.target.value));
    }
  };
  const handleGradeChange = (value: number) => {
    form.setFieldsValue({ grade_id: value }); // Cập nhật giá trị grade_id trong form
    dispatch(updateOther({ ...other, grade_id: value })); // Cập nhật state other
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

  const handleRemarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateOther({ ...other, remark: e.target.value }));
  };
  const dataSource = [{}];
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div className="">
      <div className="box_add">
        <div className="header-form">
          <h2 className="title">Others</h2>
        </div>
        <Form form={form}>
          <div className="content_other">
            <Form.Item label="Grade" name="grade_id">
              <Select
                style={{ width: "100%" }}
                loading={isDepartmentsLoading}
                options={gradeOptions}
                value={other.grade_id}
                onChange={handleGradeChange}
              />
            </Form.Item>
            <Form.Item label="Benefit" name="benefits">
              <div className="list_benefit">
                <Select
                  mode="multiple"
                  style={{ width: "400px" }}
                  placeholder="Select benefits"
                  onChange={handleBenefitChange}
                  loading={isBenefitsLoading}
                  options={benefitList}
                />
              </div>
            </Form.Item>
            <Form.Item label="Benefit(Photo)" name="benefit_photo">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Form.Item>
            <Form.Item label="Remark" name="remark">
              <Input onChange={handleRemarkChange} />
            </Form.Item>
          </div>
        </Form>
        <div className="table_upload">
          <div className="header_table_upload">
            <div className="title_upload">
              <h3>Document</h3>
            </div>
            <div className="btn_upload">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          </div>
          <Table dataSource={dataSource} columns={columns} />;
        </div>
      </div>
    </div>
  );
};

export default Other;

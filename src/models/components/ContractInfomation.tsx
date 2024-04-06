import React from "react";
import { DatePicker, Form, Select, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

const props: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
type Props = {};

const ContractInfomation = (props: Props) => {
  const dataSource = [{}];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div>
      <div className="box_add">
        <div className="header-form">
          <h2 className="title">Contract Information</h2>
          <div className="status_required">
            Required (<span>*</span>)
          </div>
        </div>
        <div className="contract_infomation">
          <div className="short_line">
            <Form.Item
              label="Date start"
              name="date_start"
              rules={[
                { required: true, message: "Please, date start is required!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Employee type"
              name="employee_type"
              rules={[
                {
                  required: true,
                  message: "Please, employee type is required!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a employee type"
                options={[
                  {
                    value: "permanent",
                    label: "Permanent",
                  },
                  {
                    value: "part_time",
                    label: "Part time",
                  },
                  {
                    value: "contract",
                    label: "Contract",
                  }
                ]}
              />
            </Form.Item>
          </div>
          <div className="contract">
            <h3>Contract</h3>
            <div className="long_line">
              <Form.Item label="Contract Date From" name="contract_date_from">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="To" name={"contract_date_to"}>
                <DatePicker />
              </Form.Item>
            </div>
          </div>
          <div className="contract">
            <h3>Extension Contract</h3>
            <div className="long_line">
              <Form.Item
                label="Contract Date From"
                name="contract_from_extension"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="To" name={"contract_to_extension"}>
                <DatePicker />
              </Form.Item>
            </div>
          </div>
          <div className="table_contract">
            <div className="table_contract_title">
              <h4>CONTRACT:</h4>
            </div>
            <p>Please upload pdf, png, xlsx, docx file format!</p>
            <div className="table_contract_content">
              <div className="content_left">
                <Form.Item label="Contract Date" name={"contract_date"}>
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Contract Name" name={"contract_name"}>
                  <DatePicker />
                </Form.Item>
                <div className="group_button">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload file</Button>
                  </Upload>
                  <Button>Add</Button>
                </div>
              </div>
              <div className="content_right">
                <Table dataSource={dataSource} columns={columns} />;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInfomation;

import React from "react";
import { DatePicker, Form, Input, Select, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { updateContractInfomation } from "../../slices/employe";
import moment from "moment";
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

const ContractInfomation = () => {
  const dispatch: any = useAppDispatch();
  const { contractInfomation } = useAppSelector((state) => state.employee);

  const handleDateStartChange = (date: moment.Moment | null) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      dispatch(
        updateContractInfomation({
          ...contractInfomation,
          contract_start_date: dateString,
        })
      );
    }
  };
  const handleEmployeeTypeChange = (value: number) => {
    dispatch(
      updateContractInfomation({
        ...contractInfomation,
        type: value,
      })
    );
  };
  const handleContractDateFromChange = (date: moment.Moment | null) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      dispatch(
        updateContractInfomation({
          ...contractInfomation,
          contract_date_from: dateString,
        })
      );
    }
  };
  const handleContractDateToChange = (date: moment.Moment | null) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      dispatch(
        updateContractInfomation({
          ...contractInfomation,
          contract_date_to: dateString,
        })
      );
    }
  };
  const handleContractFromExtensionChange = (date: moment.Moment | null) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      dispatch(
        updateContractInfomation({
          ...contractInfomation,
          contract_from_extension: dateString,
        })
      );
    }
  };
  const handleContractToExtensionChange = (date: moment.Moment | null) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      dispatch(
        updateContractInfomation({
          ...contractInfomation,
          contract_to_extension: dateString,
        })
      );
    }
  };
  const handleContractDateChange = (date: moment.Moment | null) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      dispatch(
        updateContractInfomation({
          ...contractInfomation,
          contract_date: dateString,
        })
      );
    }
  };
  const handleContractNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateContractInfomation({
        ...contractInfomation,
        contract_name: e.target.value,
      })
    );
  };
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
              <DatePicker
                style={{ width: "100%" }}
                onChange={handleDateStartChange}
              />
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
                onChange={handleEmployeeTypeChange}
                value={contractInfomation.type}
                options={[
                  {
                    value: 0,
                    label: "Permanent",
                  },
                  {
                    value: 1,
                    label: "Part time",
                  },
                  {
                    value: 2,
                    label: "Contract",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="contract">
            <h3>Contract</h3>
            <div className="long_line">
              <Form.Item label="Contract Date From" name="contract_date_from">
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={handleContractDateFromChange}
                />
              </Form.Item>
              <Form.Item label="To" name={"contract_date_to"}>
                <DatePicker onChange={handleContractDateToChange} />
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
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={handleContractFromExtensionChange}
                />
              </Form.Item>
              <Form.Item label="To" name={"contract_to_extension"}>
                <DatePicker onChange={handleContractToExtensionChange} />
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
                  <DatePicker onChange={handleContractDateChange} />
                </Form.Item>
                <Form.Item label="Contract Name" name={"contract_name"}>
                  <Input onChange={handleContractNameChange} />
                </Form.Item>
                <div className="group_button">
                  <Upload {...props}>
                    <Button className="btn btn-upload" icon={<UploadOutlined />}>Upload file</Button>
                  </Upload>
                  <Button className="btn btn-add">Add</Button>
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

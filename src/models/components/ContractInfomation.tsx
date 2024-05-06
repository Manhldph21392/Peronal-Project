import { useEffect } from "react";
import { DatePicker, Form, Select } from "antd";
import type { UploadProps } from "antd";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import {
  IContractInfomation,
  updateContractInfomation,
} from "../../slices/employe";
import moment from "moment";
import { useGetEmployeeByIdQuery } from "../../api/employee";
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

const ContractInfomation = ({ id }: any) => {
  const dispatch: any = useAppDispatch();
  const { contractInfomation } = useAppSelector((state) => state.employee);
  const { data: contractInfomationData } = useGetEmployeeByIdQuery(id || "");

  const [form] = Form.useForm();

  useEffect(() => {
    if (contractInfomationData) {
      const {
        contract_start_date,
        type,
        contract_date_from,
        contract_date_to,
        contract_from_extension,
        contract_to_extension,
        contract_date,
        contract_name,
      } = contractInfomationData;

      const contracInfoData: IContractInfomation = {
        contract_start_date,
        type,
        contract_date_from,
        contract_date_to,
        contract_from_extension,
        contract_to_extension,
        contract_date,
        contract_name,
      };

      form.setFieldsValue(contracInfoData);
      form.setFieldValue("contract_date", moment(contract_start_date));
      dispatch(updateContractInfomation(contracInfoData));
    }
  }, [contractInfomationData]);
  const handleDateStartChange = (date: moment.Moment | null) => {
    if (date) {
      const dateString = moment(date).format("YYYY-MM-DD");
      dispatch(
        updateContractInfomation({
          ...contractInfomation,
          contract_start_date: dateString,
        })
      );
    }
  };
  const handleEmployeeTypeChange = (value: number | string) => {
    dispatch(
      updateContractInfomation({
        ...contractInfomation,
        type: value,
      })
    );
  };

  return (
    <div>
      <Form form={form}>
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
                name="contract_date"
                rules={[
                  {
                    required: true,
                    message: "Please, date start is required!",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={handleDateStartChange}
                />
              </Form.Item>
              <Form.Item
                label="Employee type"
                name="type"
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
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ContractInfomation;

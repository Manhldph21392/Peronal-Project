import { Form, DatePicker, Input, Select } from "antd";
import React, { useEffect } from "react";

import {
  IEmployeeInfomation,
  updateEmployeeInfomation,
} from "../../slices/employe";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import {
  useGetEmployeeByIdQuery,
  useGetMarriageQuery,
} from "../../api/employee";
import moment from "moment";
const EmployeeInfomation = ({ id }: any) => {
  const { employeeInfomation } = useAppSelector((state) => state.employee);
  const { data: marriages = [] } = useGetMarriageQuery({});
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { data: employeeInfomationData } = useGetEmployeeByIdQuery(id || "");
  const formatDate = "YYYY-MM-DD";
  useEffect(() => {
    if (employeeInfomationData) {
      const {
        name,
        home_address_1,
        gender,
        id,
        mother_name,
        dob,
        pob,
        ktp_no,
        taxId,
        home_address_2,
        mobile_no,
        tel_no,
        marriage_id,
        bank_account_no,
        card_number,
        bank_name,
        family_card_number,
        safety_insurance_no,
        health_insurance_no,
        education_background,
        emergency_name,
        emergency_relationship,
        emergency_contract,
      } = employeeInfomationData;

      const employeeData: IEmployeeInfomation = {
        name,
        home_address_1,
        gender,
        id,
        mother_name,
        dob,
        pob,
        ktp_no,
        taxId,
        home_address_2,
        mobile_no,
        tel_no,
        marriage_id,
        bank_account_no,
        card_number,
        bank_name,
        family_card_number,
        safety_insurance_no,
        health_insurance_no,
        education_background,
        emergency_name,
        emergency_relationship,
        emergency_contract,
      };

      form.setFieldsValue(employeeData);
      form.setFieldValue("dob", moment(dob, formatDate));
      dispatch(updateEmployeeInfomation(employeeData));
    }
  }, [employeeInfomationData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({ ...employeeInfomation, name: e.target.value })
    );
  };
  const handleGenderChange = (value: number | string) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        gender: value,
      })
    );
  };
  const handleMotherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        mother_name: e.target.value,
      })
    );
  };
  const handleDateofBirthChange = (value: string) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        dob: value,
      })
    );
  };

  const handlePlaceofBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        pob: e.target.value,
      })
    );
  };
  const handleKtpNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        ktp_no: Number(e.target.value),
      })
    );
  };
  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const taxIdValue = Number(e.target.value);

    if (!isNaN(taxIdValue)) {
      dispatch(
        updateEmployeeInfomation({
          ...employeeInfomation,
          taxId: taxIdValue,
        })
      );
    } else {
      console.log("Giá trị nhập không hợp lệ");
    }
  };
  const handleAdress1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        home_address_1: e.target.value,
      })
    );
  };
  const handleAdress2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        home_address_2: e.target.value,
      })
    );
  };
  const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobileNoValue = Number(e.target.value);
    if (!isNaN(mobileNoValue)) {
      dispatch(
        updateEmployeeInfomation({
          ...employeeInfomation,
          mobile_no: mobileNoValue,
        })
      );
    } else {
      console.log("Giá trị này không hợp lệ");
    }
  };
  const handleTelNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const telNoValue = Number(e.target.value);
    if (!isNaN(telNoValue)) {
      dispatch(
        updateEmployeeInfomation({
          ...employeeInfomation,
          tel_no: telNoValue,
        })
      );
    } else {
      console.log("Giá trị này không hợp lệ");
    }
  };
  const handleMarriageStatusChange = (value: number) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        marriage_id: value,
      })
    );
  };
  const handleBankCardNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bankCardNoValue = Number(e.target.value);

    if (!isNaN(bankCardNoValue)) {
      dispatch(
        updateEmployeeInfomation({
          ...employeeInfomation,
          card_number: bankCardNoValue,
        })
      );
    } else {
      console.log("Giá trị này không hợp lệ");
    }
  };
  const handlebankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bankAccountValue = Number(e.target.value);
    if (!isNaN(bankAccountValue)) {
      dispatch(
        updateEmployeeInfomation({
          ...employeeInfomation,
          bank_account_no: bankAccountValue,
        })
      );
    } else {
      console.log("Giá trị này không hợp lệ");
    }
  };
  const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        bank_name: e.target.value,
      })
    );
  };
  const handleFamilyCardNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const familyCardNumberValue = Number(e.target.value);
    if (!isNaN(familyCardNumberValue)) {
      dispatch(
        updateEmployeeInfomation({
          ...employeeInfomation,
          family_card_number: familyCardNumberValue,
        })
      );
    } else {
      console.log("Giá trị này không hợp lệ");
    }
  };
  const handleSafetyInsuranceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        safety_insurance_no: e.target.value,
      })
    );
  };
  const handleHeathInsuranceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        health_insurance_no: e.target.value,
      })
    );
  };
  const handleBacgroundEducationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        education_background: e.target.value,
      })
    );
  };
  const handleEmergencyContractChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        emergency_contract: e.target.value,
      })
    );
  };
  const handleEmergenctRelationshipChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        emergency_relationship: e.target.value,
      })
    );
  };
  const handleEmergencyNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        emergency_name: e.target.value,
      })
    );
  };

  return (
    <div>
      <Form form={form}>
        <div className="box_add">
          <div className="header-form">
            <h2 className="title">Personal Information</h2>
            <div className="status_required">
              Required (<span>*</span>)
            </div>
          </div>
          <div className="box_content_add">
            <div className="form-add-left">
              <Form.Item
                label="Name"
                id="name"
                name="name"
                rules={[
                  { required: true, message: "Please, name is required!" },
                ]}
              >
                <Input
                  value={updateEmployeeInfomation.name}
                  onChange={handleNameChange}
                />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                id="gender"
                rules={[
                  {
                    required: true,
                    message: "Please , gender is required!",
                  },
                ]}
              >
                <Select
                  showSearch
                  onChange={handleGenderChange}
                  value={employeeInfomation.gender}
                  placeholder="Select a gender"
                  options={[
                    {
                      value: 0,
                      label: "Male",
                    },
                    {
                      value: 1,
                      label: "Female",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Mother Name" name="mother_name">
                <Input
                  value={employeeInfomation.mother_name}
                  onChange={handleMotherNameChange}
                />
              </Form.Item>

              <Form.Item
                label="Date of birth"
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Please date of birth is required!",
                  },
                ]}
              >
                <DatePicker
                  format={formatDate}
                  onChange={handleDateofBirthChange}
                />
              </Form.Item>

              <Form.Item
                label="Place of birth"
                name="pob"
                rules={[
                  {
                    required: true,
                    message: "Please Place of birth is required!",
                  },
                ]}
              >
                <Input
                  value={employeeInfomation.pob}
                  onChange={handlePlaceofBirthChange}
                />
              </Form.Item>

              <Form.Item
                label="Ktp No"
                name="ktp_no"
                rules={[
                  { required: true, message: "Please KTP No is required!" },
                ]}
              >
                <Input
                  value={employeeInfomation.ktp_no}
                  onChange={handleKtpNoChange}
                />
              </Form.Item>

              <Form.Item label="Tax ID" name="tax_id">
                <Input
                  value={employeeInfomation.taxId}
                  onChange={handleTaxIdChange}
                />
              </Form.Item>

              <Form.Item label="Home Address1" name="home_address_1">
                <Input
                  value={employeeInfomation.home_address_1}
                  onChange={handleAdress1Change}
                />
              </Form.Item>

              <Form.Item label="Home Address2" name="home_address_2">
                <Input
                  value={employeeInfomation.home_address_2}
                  onChange={handleAdress2Change}
                />
              </Form.Item>

              <Form.Item label="Mobile No" name="mobile_no">
                <Input
                  value={employeeInfomation.mobile_no}
                  onChange={handleMobileNoChange}
                />
              </Form.Item>

              <Form.Item label="Tel No" name="tel_no">
                <Input
                  value={employeeInfomation.tel_no}
                  onChange={handleTelNoChange}
                />
              </Form.Item>
            </div>
            <div className="form-add-right">
              <Form.Item label="Marriage Status" name="marriage_id">
                <Select
                  onChange={handleMarriageStatusChange}
                  style={{ width: "100%" }}
                >
                  {marriages.map((marriage) => (
                    <Select.Option key={marriage.id} value={marriage.id}>
                      {marriage.name}{" "}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Bank Card No." name="card_number">
                <Input
                  onChange={handleBankCardNoChange}
                  value={employeeInfomation.card_number}
                />
              </Form.Item>

              <Form.Item label="Bank Account No" name="bank_account_no">
                <Input
                  onChange={handlebankAccountChange}
                  value={employeeInfomation.bank_account_no}
                />
              </Form.Item>

              <Form.Item label="Bank Name" name="bank_name">
                <Input
                  onChange={handleBankNameChange}
                  value={employeeInfomation.bank_name}
                />
              </Form.Item>

              <Form.Item label="Family Card Number" name="family_card_number">
                <Input
                  onChange={handleFamilyCardNumberChange}
                  value={employeeInfomation.family_card_number}
                />
              </Form.Item>

              <Form.Item
                label="Safety Insurance No."
                name="safety_insurance_no"
              >
                <Input
                  onChange={handleSafetyInsuranceChange}
                  value={employeeInfomation.safety_insurance_no}
                />
              </Form.Item>

              <Form.Item
                label="Health Insurance No."
                name="health_insurance_no"
              >
                <Input
                  onChange={handleHeathInsuranceChange}
                  value={employeeInfomation.health_insurance_no}
                />
              </Form.Item>

              <Form.Item
                label="Education Background"
                name="education_background"
              >
                <Input
                  onChange={handleBacgroundEducationChange}
                  value={employeeInfomation.education_background}
                />
              </Form.Item>

              <div className="form_contact_infomation">
                <Form.Item label="Name" name="emergency_name">
                  <Input
                    value={employeeInfomation.emergency_name}
                    onChange={handleEmergencyNameChange}
                  />
                </Form.Item>

                <Form.Item label="Relationship" name="emergency_contract">
                  <Input
                    value={employeeInfomation.emergency_contract}
                    onChange={handleEmergencyContractChange}
                  />
                </Form.Item>

                <Form.Item label="Contact" name="emergency_relationship">
                  <Input
                    value={employeeInfomation.emergency_relationship}
                    onChange={handleEmergenctRelationshipChange}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeInfomation;

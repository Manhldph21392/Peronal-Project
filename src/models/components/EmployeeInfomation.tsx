import { Button, DatePicker, Input, Select } from "antd";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { updateEmployeeInfomation } from "../../slices/employe";
import { Form } from "antd";
import React from "react";
import { RootState } from "../../stores/employeManager";
const EmployeeInfomation = () => {
  const { employeeInfomation } = useSelector(
    (state: RootState) => state.employee
  );
  const dispatch = useDispatch();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({ ...employeeInfomation, name: e.target.value })
    );
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        gender: e.target.value,
      })
    );
  };
  const handleMotherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        motherName: e.target.value,
      })
    );
  };
  const handleDateofBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        dateofBirth: e.target.value,
      })
    );
  };
  const handlePlaceofBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        placeofBirth: e.target.value,
      })
    );
  };
  const handleKtpNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        ktpNo: e.target.value,
      })
    );
  };
  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        taxId: e.target.value,
      })
    );
  };
  const handleAdress1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        address1: e.target.value,
      })
    );
  };
  const handleAdress2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        address2: e.target.value,
      })
    );
  };
  const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        mobileNo: e.target.value,
      })
    );
  };
  const handleTelNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        telNo: e.target.value,
      })
    );
  };
  const handleMarriageStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        maritalStatus: e.target.value,
      })
    );
  };
  const handleBankCardNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        bankCardNo: e.target.value,
      })
    );
  };
  const handlebankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        bankAccount: e.target.value,
      })
    );
  };
  const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        bankName: e.target.value,
      })
    );
  };
  const handleFamilyCardNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        familyCardNumber: e.target.value,
      })
    );
  };
  const handleSafetyInsuranceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        safetyInsurance: e.target.value,
      })
    );
  };
  const handleHeathInsuranceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        healthInsurance: e.target.value,
      })
    );
  };
  const handleBacgroundEducationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateEmployeeInfomation({
        ...employeeInfomation,
        backgroundEducation: e.target.value,
      })
    );
  };

  return (
    <div>
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
              name="name"
              rules={[{ required: true, message: "Please, name is required!" }]}
            >
              <Input
                value={employeeInfomation.name}
                onChange={handleNameChange}
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
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
                placeholder="Select a gender"
                options={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label="Mother Name" name="motherName">
              <Input
                value={employeeInfomation.motherName}
                onChange={handleMotherNameChange}
              />
            </Form.Item>

            <Form.Item
              label="Date of birth"
              name="date_of_birth"
              rules={[
                {
                  required: true,
                  message: "Please date of birth is required!",
                },
              ]}
            >
              <DatePicker
                onChange={handleDateofBirthChange}
             
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Place of birth"
              name="place_of_birth"
              rules={[
                {
                  required: true,
                  message: "Please Place of birth is required!",
                },
              ]}
            >
              <Input value={employeeInfomation.placeofBirth} onChange={handlePlaceofBirthChange} />
            </Form.Item>

            <Form.Item
              label="Ktp No"
              name="ktp_no"
              rules={[
                { required: true, message: "Please KTP No is required!" },
              ]}
            >
              <Input value={employeeInfomation.ktpNo} onChange={handleKtpNoChange} />
            </Form.Item>

            <Form.Item label="Tax ID" name="tax_id">
              <Input value={employeeInfomation.taxId} onChange={handleTaxIdChange} />
            </Form.Item>

            <Form.Item label="Home Address1" name="home_address1">
              <Input value={employeeInfomation.address1} onChange={handleAdress1Change} />
            </Form.Item>

            <Form.Item label="Home Address2" name="home_address2">
              <Input value={employeeInfomation.address2} onChange={handleAdress2Change} />
            </Form.Item>

            <Form.Item label="Mobile No" name="mobile_no">
              <Input value={employeeInfomation.mobileNo} onChange={handleMobileNoChange} />
            </Form.Item>

            <Form.Item label="Tel No" name="tel_no">
              <Input value={employeeInfomation.telNo} onChange={handleTelNoChange} />
            </Form.Item>
          </div>
          <div className="form-add-right">
            <Form.Item label="Marriage Status" name="marriage_status">
              <Select onChange={handleMarriageStatusChange} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Bank Card No." name="bank_card_no">
              <Input />
            </Form.Item>

            <Form.Item label="Bank Account No" name="bank_account_no">
              <Input />
            </Form.Item>

            <Form.Item label="Bank Name" name="bank_name">
              <Input />
            </Form.Item>

            <Form.Item label="Family Card Number" name="family_card_number">
              <Input />
            </Form.Item>

            <Form.Item label="Safety Insurance No." name="safety_insurance_no">
              <Input />
            </Form.Item>

            <Form.Item label="Health Insurance No." name="health_insurance_no">
              <Input />
            </Form.Item>

            <Form.Item label="Education Background" name="education_background">
              <Input.TextArea />
            </Form.Item>

            <div className="form_contact_infomation">
              <Form.Item label="Home Address2" name="home_address2">
                <Input />
              </Form.Item>

              <Form.Item label="Mobile No" name="mobile_no">
                <Input />
              </Form.Item>

              <Form.Item label="Tel No" name="tel_no">
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfomation;

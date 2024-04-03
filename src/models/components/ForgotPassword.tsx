import React from "react";
import { Button, Select, Form, type FormProps, Input } from "antd";
import { Link } from "react-router-dom";
import type { FormItemProps } from "antd";
const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}
const ForgotPassword = () => {
  const onFinish: FormProps<[]>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  function toArr(
    str: string | number | (string | number)[]
  ): (string | number)[] {
    return Array.isArray(str) ? str : [str];
  }
  const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(
      () => [...prefixPath, ...toArr(prefix)],
      [prefixPath, prefix]
    );

    return (
      <MyFormItemContext.Provider value={concatPath}>
        {children}
      </MyFormItemContext.Provider>
    );
  };

  const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName =
      name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="wrap-login">
      <div className="headerLogin">
        <div className="box_icon">
          <img src="http://web-qa.hrm.div4.pgtest.co/static/media/HR_Logo.7c93eebe8886301b470d6d7131b23a95.svg" />
          <h2>HR Management System</h2>
        </div>
        <h2>Forgot Password</h2>
      </div>
      <div className="loginForm">
        <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
          <MyFormItemGroup prefix={["user"]}>
            <MyFormItemGroup prefix={["name"]}>
              <MyFormItem name="email" label="Email">
                <Input />
              </MyFormItem>
            </MyFormItemGroup>
          </MyFormItemGroup>

          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <h4>
            <Link to="/login">Back to login</Link>
          </h4>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;

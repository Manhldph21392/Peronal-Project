import React from "react";
import {
  Button,
  Select,
  Form,
  type FormProps,
  Input,
  FormItemProps,
  message,
} from "antd";
import { useResetPasswordMutation } from "../../api/auth";

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [resetPassword, isLoading] = useResetPasswordMutation();
  const token = localStorage.getItem("token");
  const onFinish = async (values: any) => {
    const data: any = await resetPassword({ values, token });
    if (data?.data) {
      message.success("Change password successfully");
      localStorage.setItem("token", data.token);
      console.log(data.token);
    } else {
      message.error("Change password failed");
    }
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
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="wrap-login">
      <div className="headerLogin">
        <h2>ResetPassword Password</h2>
      </div>
      <div className="loginForm">
        <Form
          form={form}
          name="reset_password_form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["confirmPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("confirmPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" {...isLoading}>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;

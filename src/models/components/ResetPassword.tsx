import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useResetPasswordMutation } from "../../api/auth";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { token, email, company_id } = useParams();
  const navigate = useNavigate();

  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const { password } = values;
      await resetPassword({ password, token, email, company_id });
      message.success("Đặt lại mật khẩu thành công!");
      logoutAndRedirect();
    } catch (error) {
      console.error("Lỗi khi đặt lại mật khẩu:", error);
      message.error("Đã xảy ra lỗi khi đặt lại mật khẩu!");
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Validation failed:", errorInfo);
  };

  const logoutAndRedirect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="wrap-login">
      <div className="headerLogin">
        <h2>Reset Password</h2>
      </div>
      <div className="loginForm">
        <Form
          form={form}
          name="reset_password_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            name="password_confirmation"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;

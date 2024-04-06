import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useForgotPasswordMutation } from "../../api/auth";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values: any) => {
    try {
      setIsSubmitting(true);
      const { email } = values;
      // Gọi mutation để gửi yêu cầu quên mật khẩu
      await forgotPassword({ email });
      message.success("Yêu cầu đặt lại mật khẩu đã được gửi!");
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đặt lại mật khẩu:", error);
      message.error("Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Validation failed:", errorInfo);
  };

  return (
    <div className="wrap-login">
      <div className="headerLogin">
        <h2>Forgot Password</h2>
      </div>
      <div className="loginForm">
        <Form
          form={form}
          name="forgot_password_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;

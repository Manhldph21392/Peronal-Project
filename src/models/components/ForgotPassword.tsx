import  { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useForgotPasswordMutation } from "../../api/auth";
import { Link } from "react-router-dom";

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
        <div className="box_icon">
          <img src="http://web-qa.hrm.div4.pgtest.co/static/media/HR_Logo.7c93eebe8886301b470d6d7131b23a95.svg" />
          <h2>HR Management System</h2>
        </div>
        <h2 style={{ fontSize: "32px" }}>Forgot Password</h2>
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
          
            <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
            <h4>
            <Link to="/login">Back to Signin</Link>
            </h4>
          
        </Form>
      </div>
     
    </div>
  );
};

export default ForgotPassword;

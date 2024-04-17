import { Button, Form, Input, message } from "antd";
import { useChangePasswordMutation } from "../../api/auth";
import { IUser } from "../../interfaces/User";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();
  const onFinish = async (values: IUser) => {
    try {
      await changePassword(values).unwrap();
      message.success("Password changed successfully.");
      navigate("/login");
      form.resetFields();
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Failed to change password. Please try again later.");
    }
  };

  return (
    <div className="wrap-login">
      <div className="box_change">
        <div className="wrap_changePassword">
          <div className="header_change">
            <h2>Change Password</h2>
          </div>
          <div className="loginForm">
            <Form
              form={form}
              name="change_password"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                  { min: 8, message: "Password must be at least 8 characters" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
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
      </div>
    </div>
  );
};

export default ChangePassword;

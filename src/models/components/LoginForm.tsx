import React from "react";
import { Button, Select, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useGetCompanysQuery, useLoginMutation } from "../../api/auth";

const LoginForm = () => {
  const [form] = Form.useForm();
  const [login, { isLoading }] = useLoginMutation();
  const companiesQuery = useGetCompanysQuery({});
  const companies = companiesQuery.data?.data;
  const navigate = useNavigate();
  const onFinish = async (values:any) => {
    try {
      const { username, password, factory } = values;
      const user = {
        username,
        password,
        company_id: factory,
        role_id: 1,
      };
      const response = await login(user).unwrap();
      if (response) {
        localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
        navigate("/");
        message.success("Login successful");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed");
    }
  };

  return (
    <div className="wrap-login">
      <div className="headerLogin">
        <div className="box_icon">
          <img src="http://web-qa.hrm.div4.pgtest.co/static/media/HR_Logo.7c93eebe8886301b470d6d7131b23a95.svg" />
          <h2>HR Management System</h2>
        </div>
        <h2>Signin</h2>
      </div>
      <div className="loginForm">
        <Form
          form={form}
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 2, message: "Username must be at least 2 characters" },
              { max: 30, message: "Username must be at most 30 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"factory"}
            label="Factory"
            rules={[{ required: true, message: "Please select your factory!" }]}
          >
            <Select
              showSearch
              placeholder="Select a factory"
              optionFilterProp="children"
            >
              {Array.isArray(companies) &&
                companies.map((company) => (
                  <Select.Option
                    key={company.id}
                    value={company.id}
                    children={company.name}
                  />
                ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Login
          </Button>
          <h4>
            <Link to="/forgot-password">Forgot password?</Link>
          </h4>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;

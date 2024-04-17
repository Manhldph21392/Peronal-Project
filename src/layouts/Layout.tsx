import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Layout,
  Menu,
  Modal,
  Popover,
  Space,
  theme,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/auth";
import "../assets/css/login.css";
import "../assets/css/style.css";

type MenuItem = Required<MenuProps>["items"][number];
const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false); // State để xác định popup có hiển thị hay không
  const [confirmVisible, setConfirmVisible] = useState(false); // State để xác định trạng thái của Modal confirm logout

  const handleAvatarClick = () => {
    setVisible(!visible);
  };

  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const showConfirmModal = () => {
    setConfirmVisible(true);
  };

  const handleOk = async () => {
    try {
      await logout({}).unwrap();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setConfirmVisible(false);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    path?: string
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      path,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem(
      "Employee Management",
      "1",
      <Link to={"/employee"}>
        <UserOutlined />
      </Link>
    ),
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="header_body">
            <div className="header_body_left">
              <img
                src="https://s3-alpha-sig.figma.com/img/6650/a3f3/139caf936060b11ca513200f3bf1d056?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bkxLzFoN1isH6SJPMAsaFFLsruLuz7-0WdODcG4rLeCZWmMvE7BGUu0gX0frja~HCU5quo-WOc9khgPId3eDpARLQ8HnJM1QF39Ay7B~qK~XZgpKUrd3NjaDdpflcFKabRKr-wvqFY0jO0ltHn~u1uUjSFsw~jDzDqre0SDnykr9EWzX2FWlgbX41FbfEGtZf51PGwHUyLyOhph3MVveKagIUO~LnKWQW98jOOfs3KUeHgQwkpovz9XFp9edeWIxl~87~v2DxCu6EzBhPvI0anyfXmSfd9DD4Zns4Z4UXcxCr6AO8T8QI9jAyXeVSCXS9gLFguHfQBbijahTxWqX0A__"
                alt=""
              />
              <h2>HR Management System</h2>
            </div>
            <div className="header_body_right">
              <Space>
                <Popover
                  visible={visible}
                  onVisibleChange={setVisible}
                  content={
                    <div className="avt_popup">
                      <div className="avt_name_popup">
                        <Avatar
                          size={{
                            xs: 24,
                            sm: 32,
                            md: 30,
                            lg: 40,
                            xl: 50,
                            xxl: 100,
                          }}
                          icon={<UserOutlined />}
                          onClick={handleAvatarClick}
                        />
                        <h4> LDM </h4>
                      </div>
                      <Button
                        type="primary"
                        onClick={showConfirmModal}
                        loading={isLoading}
                      >
                        Logout
                      </Button>
                      <Link to="/change-password">Reset Password</Link>
                    </div>
                  }
                  trigger="click"
                >
                  <Avatar
                    style={{ cursor: "pointer" }}
                    icon={<UserOutlined />}
                    onClick={handleAvatarClick}
                  />
                </Popover>
              </Space>
            </div>
          </div>
        </Header>
        <Content>
          <Layout>
            <Sider
              // collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              theme="light"
            >
              <div className="demo-logo-vertical" />
              <Menu
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
              />
            </Sider>
            <Content style={{ minHeight: 280 }}>
              <Outlet />
              <Footer style={{ textAlign: "center" }}>
                Ant Design ©{new Date().getFullYear()} Created by Luu Duc Manh
              </Footer>
            </Content>
          </Layout>
          <Modal
            title="Confirm Logout"
            visible={confirmVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Are you sure you want to logout?</p>
          </Modal>
        </Content>
      </Layout>
    </div>
  );
};

export default Layouts;

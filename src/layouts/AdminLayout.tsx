import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { AiOutlineUser } from "react-icons/ai";
import type { MenuProps } from "antd";
import {
  Layout,
  Menu,
  theme,
  Space,
  Avatar,
  Popover,
  Button,
  Modal,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

import "../assets/css/login.css";
import { useLogoutMutation } from "../api/auth";

const { Header, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

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
  getItem("Employee Management", "1", <Link to={"/table-employee"}></Link>),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false); // State để xác định popup có hiển thị hay không
  const [confirmVisible, setConfirmVisible] = useState(false); // State để xác định trạng thái của Modal confirm logout
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
    
      <Sider
          collapsible
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
      <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <div className="header_body">
          <div className="header_body_left">
            <img
              src="https://s3-alpha-sig.figma.com/img/6650/a3f3/139caf936060b11ca513200f3bf1d056?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bkxLzFoN1isH6SJPMAsaFFLsruLuz7-0WdODcG4rLeCZWmMvE7BGUu0gX0frja~HCU5quo-WOc9khgPId3eDpARLQ8HnJM1QF39Ay7B~qK~XZgpKUrd3NjaDdpflcFKabRKr-wvqFY0jO0ltHn~u1uUjSFsw~jDzDqre0SDnykr9EWzX2FWlgbX41FbfEGtZf51PGwHUyLyOhph3MVveKagIUO~LnKWQW98jOOfs3KUeHgQwkpovz9XFp9edeWIxl~87~v2DxCu6EzBhPvI0anyfXmSfd9DD4Zns4Z4UXcxCr6AO8T8QI9jAyXeVSCXS9gLFguHfQBbijahTxWqX0A__"
              alt=""
            />
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
                  size={{ xs: 24, sm: 32, md: 30, lg: 40, xl: 50, xxl: 100 }}
                  icon={<UserOutlined />}
                  onClick={handleAvatarClick}
                />
              </Popover>
            </Space>
          </div>
        </div>
      </Header>
        <Outlet />
        <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
      </Layout>
  
      {/* Modal confirm logout */}
      <Modal
        title="Confirm Logout"
        visible={confirmVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};

export default AdminLayout;

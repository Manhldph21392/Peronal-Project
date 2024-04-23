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
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.83317 6.66675H3.33317C2.4165 6.66675 1.6665 5.91675 1.6665 5.00008V3.33341C1.6665 2.41675 2.4165 1.66675 3.33317 1.66675H5.83317C6.74984 1.66675 7.49984 2.41675 7.49984 3.33341V5.00008C7.49984 5.91675 6.74984 6.66675 5.83317 6.66675Z"
            fill="#94BA2C"
          ></path>
          <path
            d="M17.3335 5.83333H14.3335C13.7835 5.83333 13.3335 5.38332 13.3335 4.83332V3.50001C13.3335 2.95001 13.7835 2.5 14.3335 2.5H17.3335C17.8835 2.5 18.3335 2.95001 18.3335 3.50001V4.83332C18.3335 5.38332 17.8835 5.83333 17.3335 5.83333Z"
            fill="#94BA2C"
          ></path>
          <path
            d="M17.3335 12.0833H14.3335C13.7835 12.0833 13.3335 11.6333 13.3335 11.0833V9.75001C13.3335 9.20001 13.7835 8.75 14.3335 8.75H17.3335C17.8835 8.75 18.3335 9.20001 18.3335 9.75001V11.0833C18.3335 11.6333 17.8835 12.0833 17.3335 12.0833Z"
            fill="#94BA2C"
          ></path>
          <path
            opacity="0.37"
            d="M13.3333 11.0417C13.675 11.0417 13.9583 10.7584 13.9583 10.4167C13.9583 10.0751 13.675 9.79175 13.3333 9.79175H11.0417V4.79175H13.3333C13.675 4.79175 13.9583 4.50841 13.9583 4.16675C13.9583 3.82508 13.675 3.54175 13.3333 3.54175H7.5C7.15833 3.54175 6.875 3.82508 6.875 4.16675C6.875 4.50841 7.15833 4.79175 7.5 4.79175H9.79167V15.0001C9.79167 16.2667 10.8167 17.2917 12.0833 17.2917H13.3333C13.675 17.2917 13.9583 17.0084 13.9583 16.6667C13.9583 16.3251 13.675 16.0417 13.3333 16.0417H12.0833C11.5083 16.0417 11.0417 15.5751 11.0417 15.0001V11.0417H13.3333Z"
            fill="#94BA2C"
          ></path>
          <path
            d="M17.3335 18.3333H14.3335C13.7835 18.3333 13.3335 17.8833 13.3335 17.3333V16C13.3335 15.45 13.7835 15 14.3335 15H17.3335C17.8835 15 18.3335 15.45 18.3335 16V17.3333C18.3335 17.8833 17.8835 18.3333 17.3335 18.3333Z"
            fill="#94BA2C"
          ></path>
        </svg>
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
                src="https://s3-alpha-sig.figma.com/img/6650/a3f3/139caf936060b11ca513200f3bf1d056?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OzNleg9cyZIcARb-tAIvsnROGAokvuRqRjHCw9rSza8ZF9VfMXPmKjN9iRm9qL9ZYsP3GTKh4k--ieczcN9~D~zJMk8zXJL8~Q58xqpg76qI15Rf2W-~64GyQZx0vdLFNXvsjC8PNnX4sKxl6DWwwZwd0np3Gec2UwDbwRIbUzRP2MnJ14r8sgNkvlruq~neyfQCAol-d5eDqvuvdYUI31nyotOqqaj2w9f49ekrkGGEMhGS6wyTpGWfaxS61R6Pz2U5iPSmgVktI70rkOtkgdmW8UR2YzDxfu6pBTkqc-1gnK~kC~mKmv7ok8DyZbgYNd2nlvcoSXU7mw2HT1VmZg__"
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

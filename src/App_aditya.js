import React from "react";
import { Layout, Avatar, Menu, Breadcrumb } from "antd";
import "./App.css";
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ padding: 10 }}>
          <Avatar style={{ float: "right" }} src="./dpp.png" />
          <Title style={{ color: "white" }} level={4}>
            ADITYA MAHESHWARI
          </Title>
        </Header>
        <Layout>
          <Sider>
            <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
              <Menu.Item key="Dashboard">DashBoard</Menu.Item>

              <SubMenu
                title={
                  <span>
                    {" "}
                    <span>Projects</span>{" "}
                  </span>
                }
              >
                <Menu.ItemGroup key="g1">
                  <Menu.Item key="My Project">My Projects</Menu.Item>
                  <Menu.Item key="Add Projects">Add Projects</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <Menu.Item key="Receipts">Receipts</Menu.Item>
              <Menu.Item key="Profile">Profile</Menu.Item>
              <Menu.Item key="Logout">Logout</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: "#fff", padding: 24, minHeight: 580 }}>
                Content
              </div>
            </Content>

            <Footer style={{ textAlign: "center" }}>Bug Tracker</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;

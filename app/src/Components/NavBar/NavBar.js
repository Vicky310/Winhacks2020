import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    const { Header } = Layout;
    return (
        <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
      >
        <Menu.Item key="1">Communities</Menu.Item>
        <Menu.Item key="2">Profile</Menu.Item>
        <Menu.Item key="3"><Link to="/logout">Logout</Link></Menu.Item>
      </Menu>
    </Header>
    
  </Layout>
    );
}

export default NavBar;
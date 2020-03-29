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
        defaultSelectedKeys={['3']}
      >
        <Menu.Item key="1"><Link to="/listcommunities">List Communities</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/communities">Communities</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/profile">Profile</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/logout">Logout</Link></Menu.Item>
      </Menu>
    </Header>
    
  </Layout>
    );
}

export default NavBar;
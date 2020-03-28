import React from 'react';
import { Layout, Menu } from 'antd';
import Auth from '../../Containers/Auth/Auth';
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
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    
  </Layout>
    );
}

export default NavBar;
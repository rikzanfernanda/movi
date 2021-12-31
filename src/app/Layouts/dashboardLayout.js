import React from "react";
import Logo from "../../assets/img/logo.png";
import {Dropdown, Layout, Menu} from 'antd';
import {DashboardOutlined, AppstoreOutlined, UserOutlined, VideoCameraOutlined, DownOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="">Logout</a>
        </Menu.Item>
    </Menu>
)

const logout = (e) => {
    e.preventDefault()
    Cookies.remove("id")
    Cookies.remove("name")
    Cookies.remove("email")
    Cookies.remove("_TOKEN")
}

const DashboardLayout = (props) => {
    const {Header, Content, Footer, Sider} = Layout;

    return (
        <div id="dashboard">
            <Layout>
                <Sider
                    breakpoint="md"
                    collapsedWidth="0">
                    <div className="logo">
                        <Link to="/">
                            <img className="img" src={Logo} alt=""/>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline" style={{marginTop: '20px'}}>
                        <Menu.Item key="1" icon={<DashboardOutlined />}>
                            <Link to="/dashboard">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                            <Link to="/movie-list">Movies</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<AppstoreOutlined />}>
                            <Link to="/game-list">Games</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined/>}>
                            <Link to="/account">Account</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link btn-logout" onClick={logout}>
                                {Cookies.get('name')} <DownOutlined/>
                            </a>
                        </Dropdown>
                    </Header>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: "80vh"}}>
                            {props.content}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Copyright &copy; MOVI - movie & game</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default DashboardLayout
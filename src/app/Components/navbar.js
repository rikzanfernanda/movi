import React from "react";
import Logo from "../../assets/img/logo.png"
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import {Layout, Menu} from "antd";

const Navbar = () => {
    const {Header} = Layout;
    return (
        <>
            <Header className="header" style={{backgroundColor: 'white'}}>
                <div>
                    <Link to="/" style={{float: 'left', marginRight: '20px'}}>
                        <img src={Logo} className="logo" style={{height: '64px'}} alt="logo"/>
                    </Link>
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/" className="nav-item">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/movies" className="nav-item">Movies</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/games" className="nav-item">Games</Link>
                        </Menu.Item>
                        {
                            Cookies.get('_TOKEN') ?
                                <Menu.Item key="4">
                                    <Link to="/dashboard" className="nav-item">Dashboard</Link>
                                </Menu.Item> :
                                <>
                                    <Menu.Item key="5">
                                        <Link to="/login" className="nav-item">Login</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <Link to="/register" className="nav-item">Register</Link>
                                    </Menu.Item>
                                </>
                        }
                    </Menu>
                </div>
            </Header>
            {/*<div className="navbar">*/}
            {/*    <div className="container">*/}
            {/*        <div className="nav">*/}
            {/*            <Link to="/">*/}
            {/*                <img src={Logo} className="logo"/>*/}
            {/*            </Link>*/}
            {/*            <Link to="/" className="nav-item">Home</Link>*/}
            {/*            <Link to="/movies" className="nav-item">Movies</Link>*/}
            {/*            <Link to="/games" className="nav-item">Games</Link>*/}
            {/*            {*/}
            {/*                Cookies.get('_TOKEN') ?*/}
            {/*                    <Link to="/dashboard" className="nav-item">Dashboard</Link> :*/}
            {/*                    <>*/}
            {/*                        <Link to="/login" className="nav-item">Login</Link>*/}
            {/*                        <Link to="/register" className="nav-item">Register</Link>*/}
            {/*                    </>*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default Navbar
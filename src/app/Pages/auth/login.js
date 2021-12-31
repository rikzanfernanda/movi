import React from "react";
import {Link, useHistory} from "react-router-dom";
import Logo from "../../../assets/img/logo.png";
import {Button, Form, Input, message} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
    let history = useHistory()
    const [form] = Form.useForm()

    const onFinish = (val) => {
        axios.post("https://backendexample.sanbersy.com/api/user-login", val).then((res) => {
            let token = res.data.token
            let user = res.data.user
            let exp = 30
            Cookies.set("id", user.id, {expires: exp})
            Cookies.set("name", user.name, {expires: exp})
            Cookies.set("email", user.email, {expires: exp})
            Cookies.set("_TOKEN", token, {expires: exp})
            message.success("Login success")
            history.push("/dashboard")
        }).catch((e) => {
            message.error("Login failed")
        })
    }

    return (
        <>
            <div className="container-auth">
                <Link to="/">
                    <img src={Logo} alt=""/>
                </Link>
                <h1>Login</h1>
                <Form form={form} name="basic"
                      onFinish={onFinish}
                      autoComplete="off">

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Email!',
                            },
                        ]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="email" placeholder="Email"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Password!',
                            },
                        ]}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}>

                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
                Or <Link to="/register">Register</Link>
            </div>
        </>
    )
}

export default Login
import React from "react";
import {Button, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import Logo from "../../../assets/img/logo.png";
import axios from "axios";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

const Register = () => {
    let history = useHistory()
    let init_input = {
        name: "",
        email: "",
        password: ""
    }
    const [form] = Form.useForm()
    
    const onFinish = (val) => {
        axios.post("https://backendexample.sanbersy.com/api/register", val).then((res) => {
            message.success("Registration success")
            history.push("/login")
        }).catch((e) => {
            message.error("registration failed")
        })
    }

    const onFinishFailed = (val) => {
        console.log(val)
    }

    return (
        <div className="container-auth">
            <Link to="/">
                <img src={Logo} alt=""/>
            </Link>
            <h1>Register</h1>
            <Form form={form} name="basic" labelCol={{span: 4}} wrapperCol={{span: 16}}
                  initialValues={init_input}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Name!',
                        },
                    ]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Email!',
                        },
                    ]}>
                    <Input type="email"/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Password!',
                        },
                    ]}>
                    <Input type="password"/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: 12,
                    }}>

                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            Or <Link to="/login">Login</Link>
        </div>
    )
}

export default Register
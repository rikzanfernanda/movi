import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form, Input, message} from "antd";
import {LockOutlined} from "@ant-design/icons";
import axios from "axios";

const Account = () => {
    let init_input = {
        current_password: "",
        new_password: "",
        new_confirm_password: ""
    }

    const [form] = Form.useForm()
    const [input, setInput] = useState(init_input)
    const [refresh, setRefresh] = useState(true)

    const onFinish = (val) => {
        axios.post("https://backendexample.sanbersy.com/api/change-password",
            val,
            {
                headers: {"Authorization": "Bearer " + Cookies.get('_TOKEN')}
            }).then((res) => {
            message.success("Successfully Change Password")
            setRefresh(true)
        }).catch((e) => {
            message.error("Failed Change Password")
        })
    }

    useEffect(() => {
        if (refresh) {
            form.setFieldsValue(init_input)
            setRefresh(false)
        }
    }, [refresh])

    return (
        <>
            <div style={{marginBottom: '60px'}}>
                <h1>Account</h1>
                <p>
                    <b>Name</b> : {Cookies.get('name')} <br/>
                    <b>Email</b> : {Cookies.get('email')} <br/>
                </p>
            </div>

            <h1>Change Password</h1>
            <Form form={form} name="basic" labelCol={{span: 4,}} wrapperCol={{span: 8,}}
                  initialValues={input}
                  onFinish={onFinish}
                  autoComplete="off">
                <Form.Item
                    label="Current Password"
                    name="current_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Current Password!',
                        },
                    ]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input New Password!',
                        },
                    ]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
                </Form.Item>

                <Form.Item
                    label="New Confirm Password"
                    name="new_confirm_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input New Confirm Password!',
                        },
                    ]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}>

                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Account
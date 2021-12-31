import React, {useEffect, useState} from "react";
import {Button, Checkbox, Form, Input, InputNumber, message} from "antd";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import Cookies from "js-cookie";

const GameForm = () => {
    let {id} = useParams()
    let history = useHistory()
    let init_input = {
        name: "",
        genre: "",
        platform: "",
        release: 2021,
        multiplayer: 0,
        singlePlayer: 0,
        image_url: ""
    }

    const [form] = Form.useForm()
    const [input, setInput] = useState(init_input)
    const [refresh, setRefresh] = useState(true)

    const onFinish = (values) => {
        if (id) {
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`,
                values,
                {
                    headers: {"Authorization": "Bearer " + Cookies.get('_TOKEN')}
                }).then((res) => {
                message.success("Successfully Update Data")
                history.push('/game-list')
            }).catch((e) => {
                message.error("Failed Update Data")
            })
        } else {
            axios.post("https://backendexample.sanbersy.com/api/data-game",
                values,
                {
                    headers: {"Authorization": "Bearer " + Cookies.get('_TOKEN')}
                }).then((res) => {
                message.success("Successfully Add Data")
                setRefresh(true)
            }).catch((e) => {
                message.error("Failed Add Data")
            })
        }
    };

    useEffect(() => {
        if (refresh) {
            form.setFieldsValue(init_input)
            setRefresh(false)
        }
        if (refresh && id) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`).then((res) => {
                let data = res.data
                let inp = {
                    name: data.name,
                    genre: data.genre,
                    platform: data.platform,
                    release: data.release,
                    multiplayer: data.multiplayer,
                    singlePlayer: data.singlePlayer,
                    image_url: data.image_url
                }
                setInput(inp)
                form.setFieldsValue(inp)
            })
        }
    }, [refresh, id])

    return (
        <>
            <h1 style={{marginBottom: '20px'}}>{!id ? 'Add New Game': 'Edit Game'}</h1>
            <Form form={form} name="basic" labelCol={{span: 4,}} wrapperCol={{span: 16,}}
                  initialValues={input}
                  onFinish={onFinish}
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
                    label="Genre"
                    name="genre"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Genre!',
                        },
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Platform"
                    name="platform"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Platform!',
                        },
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Release"
                    name="release"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Release!',
                        },
                    ]}>
                    <InputNumber min="1990" max="2021"/>
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="image_url"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Image URL!',
                        },
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="multiplayer"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}>
                    <Checkbox>Multiplayer</Checkbox>
                </Form.Item>

                <Form.Item
                    name="singlePlayer"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}>
                    <Checkbox>Single Player</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}>

                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Link to="/game-list"><Button type="secondary">Back</Button></Link>
                </Form.Item>
            </Form>
        </>
    )
}

export default GameForm
import React, {useEffect, useState} from "react";
import {Button, Form, Input, InputNumber, message} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import Cookies from "js-cookie";

const MoviesForm = () => {
    let {id} = useParams()
    let history = useHistory()
    let init_input = {
        title: "",
        description: "",
        genre: "",
        year: 2007,
        duration: 0,
        rating: 0,
        review: "",
        image_url: "",
    }

    const [form] = Form.useForm()
    const [input, setInput] = useState(init_input)
    const [refresh, setRefresh] = useState(true)

    const onFinish = (values) => {
        if (id) {
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`,
                values,
                {
                    headers: {"Authorization": "Bearer " + Cookies.get('_TOKEN')}
                }).then((res) => {
                message.success("Successfully Update Data")
                history.push('/movie-list')
            }).catch((e) => {
                message.error("Failed Update Data")
            })
        } else {
            axios.post("https://backendexample.sanbersy.com/api/data-movie",
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
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`).then((res) => {
                let data = res.data
                let inp = {
                    title: data.title,
                    description: data.description,
                    genre: data.genre,
                    year: data.year,
                    duration: data.duration,
                    rating: data.rating,
                    review: data.review,
                    image_url: data.image_url,
                }
                setInput(inp)
                form.setFieldsValue(inp)
            })
        }
    }, [refresh])

    return (
        <>
            <h1 style={{marginBottom: '20px'}}>{!id ? 'Add New Movie': 'Edit Movie'}</h1>
            <Form form={form} name="basic" labelCol={{span: 4,}} wrapperCol={{span: 16,}}
                  initialValues={input}
                  onFinish={onFinish}
                  autoComplete="off">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Title!',
                        },
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Description!',
                        },
                    ]}>
                    <TextArea/>
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
                    label="Year"
                    name="year"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Year!',
                        },
                    ]}>
                    <InputNumber min="2007" max="2021"/>
                </Form.Item>

                <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Duration!',
                        },
                    ]}>
                    <InputNumber min="0"/>
                </Form.Item>

                <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[
                        {
                            required: true,
                            message: 'Please input rating!',
                        },
                    ]}>
                    <InputNumber min="0" max="10"/>
                </Form.Item>

                <Form.Item
                    label="Review"
                    name="review"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Review!',
                        },
                    ]}>
                    <TextArea/>
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
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}>

                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Link to="/movie-list"><Button type="secondary">Back</Button></Link>
                </Form.Item>
            </Form>
        </>
    )
}

export default MoviesForm
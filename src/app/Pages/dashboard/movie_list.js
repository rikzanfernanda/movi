import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {EditFilled, DeleteFilled} from "@ant-design/icons";
import {Button, Col, Divider, Form, Input, InputNumber, message, Row, Space, Table} from "antd";
import {MovieContext} from "../../Contexts/MovieContext";
import Cookies from "js-cookie";

const MovieList = () => {
    let history = useHistory()
    const [form] = Form.useForm();
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [refresh, setRefresh] = useState(true)
    const [filter, setFilter] = useState({})
    const [isFilter, setIsFilter] = useState(false)
    const {
        truncate
    } = useContext(MovieContext)

    const getData = () => {
        axios.get("https://backendexample.sanbersy.com/api/data-movie").then((res) => {
            let data = res.data
            let result = data.map((v, i) => {
                return ({...v, description: truncate(v.description, 20), no: i + 1})
            })
            if (isFilter){
                result = result.filter((item) => {
                    return item.year === filter.year ||
                        item.duration === filter.duration ||
                        item.rating === filter.rating
                })
            }

            if (searchTerm !== "") {
                result = result.filter((item) => {
                    return item.title.toLowerCase().includes(searchTerm.toLowerCase())
                })
            }
            setMovies(result)
        })
    }

    useEffect(() => {
        if (refresh) {
            getData()
            setRefresh(false)
        }

    }, [refresh])

    const handleEdit = (e) => {
        let id = parseInt(e.currentTarget.value)
        history.push("/edit/movies/" + id)
    }

    const handleDelete = (e) => {
        let id = parseInt(e.currentTarget.value)
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
            headers: {"Authorization": "Bearer " + Cookies.get('_TOKEN')}
        }).then((res) => {
            setRefresh(true)
            message.success("Successfully Delete Data")
        }).catch((e) => {
            message.error("Failed Delete Data")
        })
    }

    let columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            sorter: {
                compare: (a, b) => a.no - b.no
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: {
                compare: (a, b) => a.title.localeCompare(b.title)
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: {
                compare: (a, b) => a.description.localeCompare(b.description)
            }
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: {
                compare: (a, b) => a.year - b.year
            },
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            sorter: {
                compare: (a, b) => a.duration - b.duration
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: {
                compare: (a, b) => a.rating - b.rating
            },
        },
        {
            title: 'Aktion',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <button value={record.id} onClick={handleEdit} className="btn-edit"><EditFilled/></button>
                    <button value={record.id} onClick={handleDelete} className="btn-delete"><DeleteFilled/></button>
                </Space>
            ),
        },
    ]
    const search = (e) => {
        setSearchTerm(e.target.value)
        setRefresh(true)
    }

    const onFinish = (val) => {
        setFilter(val)
        setIsFilter(true)
        setRefresh(true)
    }
    
    const reset = () => {
        form.resetFields()
        setIsFilter(false)
        setRefresh(true)
    }

    return (
        <>
            <h1>List of All Movies</h1>
            <div>
                <Form form={form} layout="inline" name="basic" labelCol={{span: 4,}} wrapperCol={{span: 16,}}
                      onFinish={onFinish}
                      autoComplete="off">
                    <Form.Item
                        name="year">
                        <InputNumber min="2007" max="2021" placeholder="Year"/>
                    </Form.Item>
                    <Form.Item
                        name="duration">
                        <InputNumber min="0" placeholder="Duration"/>
                    </Form.Item>
                    <Form.Item
                        name="rating">
                        <InputNumber min="0" max="10" placeholder="Rating"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Filter</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={reset}>Reset Filter</Button>
                    </Form.Item>
                </Form>
            </div>

            <Divider />

            <Row>
                <Col span={12}>
                    <Input placeholder="Search by title..." onChange={search}
                           style={{width: 200, marginBottom: '20px'}}/>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                    <Link to="/create/movies"><Button type="primary">Create New</Button></Link>
                </Col>
            </Row>
            <Table columns={columns} dataSource={movies} rowKey="id" style={{overflow: 'auto'}}/>
        </>
    )
}

export default MovieList
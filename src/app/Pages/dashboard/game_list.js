import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {EditFilled, DeleteFilled} from "@ant-design/icons";
import {Button, Col, Divider, Form, Input, InputNumber, message, Row, Space, Table} from "antd";
import Cookies from "js-cookie";


const GameList = () => {
    let history = useHistory()
    const [form] = Form.useForm();
    const [games, setGames] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [refresh, setRefresh] = useState(true)
    const [filter, setFilter] = useState({})
    const [isFilter, setIsFilter] = useState(false)

    const getData = () => {
        axios.get("https://backendexample.sanbersy.com/api/data-game").then((res) => {
            let data = res.data
            let result = data.map((v, i) => {
                return ({
                    ...v,
                    no: i + 1,
                })
            })

            if (isFilter){
                result = result.filter((item) => {
                    return item.genre.toLowerCase() === filter.genre.toLowerCase() ||
                        item.platform.toLowerCase() === filter.platform.toLowerCase() ||
                        item.release == filter.release ||
                        item.multiplayer === filter.multiplayer ||
                        item.singlePlayer === filter.singlePlayer
                })
            }

            if (searchTerm !== "") {
                result = result.filter((item) => {
                    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
                })
            }
            setGames(result)
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
        history.push("/edit/games/" + id)
    }

    const handleDelete = (e) => {
        let id = parseInt(e.currentTarget.value)
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name)
            }
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            sorter: {
                compare: (a, b) => a.genre.localeCompare(b.genre)
            }
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            sorter: {
                compare: (a, b) => a.platform - b.platform
            },
        },
        {
            title: 'Release',
            dataIndex: 'release',
            key: 'release',
            sorter: {
                compare: (a, b) => a.release - b.release
            },
        },
        {
            title: 'Multiplayer',
            dataIndex: 'multiplayer',
            key: 'multiplayer',
            sorter: {
                compare: (a, b) => a.multiplayer - b.multiplayer
            },
        },
        {
            title: 'Single Player',
            dataIndex: 'singlePlayer',
            key: 'singlePlayer',
            sorter: {
                compare: (a, b) => a.singlePlayer - b.singlePlayer
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
        setFilter({
            ...val,
            genre: val.genre ? val.genre: "",
            platform: val.platform ? val.platform: "",
        })
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
            <h1>List of All Games</h1>
            <div>
                <Form form={form} layout="inline" name="basic"
                      onFinish={onFinish}
                      autoComplete="off">
                    <Form.Item
                        name="genre">
                        <Input placeholder="Genre"/>
                    </Form.Item>
                    <Form.Item
                        name="platform">
                        <Input placeholder="Platform"/>
                    </Form.Item>
                    <Form.Item
                        name="release">
                        <InputNumber min="1990" max="2021" placeholder="Release"/>
                    </Form.Item>
                    <Form.Item
                        name="multiplayer">
                        <InputNumber min="0" max="1" placeholder="Multiplayer"/>
                    </Form.Item>
                    <Form.Item
                        name="singlePlayer">
                        <InputNumber min="0" max="1" placeholder="Single Player"/>
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
                    <Input placeholder="Search by name..." onChange={search}
                           style={{width: 200, marginBottom: '20px'}}/>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                    <Link to="/create/games"><Button type="primary">Create New</Button></Link>
                </Col>
            </Row>
            <Table columns={columns} dataSource={games} rowKey="id" style={{overflow: 'auto'}}/>
        </>
    )
}

export default GameList
import React, {useEffect, useState} from "react";
import {Card, Col, Image, Row} from "antd";
import {Link} from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [movies, setMovies] = useState([])
    const [games, setGames] = useState([])
    const [countMovies, setCountMovies] = useState(0)
    const [countGames, setCountGames] = useState(0)
    const [refresh, setRefresh] = useState(true)

    const getData = () => {
        axios.get("https://backendexample.sanbersy.com/api/data-movie").then((res) => {
            let data = res.data
            let result = data.map((v, i) => {
                return ({...v})
            })

            setCountMovies(data.length)
            setMovies(result)
        })
        axios.get("https://backendexample.sanbersy.com/api/data-game").then((res) => {
            let data = res.data
            let result = data.map((v, i) => {
                return ({...v})
            })

            setCountGames(data.length)
            setGames(result)
        })
    }

    useEffect(() => {
        if (refresh) {
            getData()
            setRefresh(false)
        }

    }, [refresh])

    let style = {
        padding: '8px'
    }
    return (
        <>
            <Row>
                <Col span={12} style={style}>
                    <Card title="Number of Movies" extra={<Link to="/movie-list">More</Link>}>
                        <h1 style={{fontSize: '40px', textAlign: 'center'}}>{countMovies}</h1>
                    </Card>
                </Col>
                <Col span={12} style={style}>
                    <Card title="Number of Games" extra={<Link to="/game-list">More</Link>}>
                        <h1 style={{fontSize: '40px', textAlign: 'center'}}>{countGames}</h1>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                {movies !== null && (
                    <>
                        {movies.map(item => {
                            return (
                                <Col xs={12} sm={6} md={3} key={item.id}>
                                    <Image style={{height: '200px', objectFit: 'cover', borderRadius: '20px', width: '100%'}}
                                        src={item.image_url}
                                    />
                                </Col>
                            )
                        })}

                        {games !== null && (
                            <>
                                {games.map(item => {
                                    return (
                                        <Col xs={12} sm={6} md={3} key={item.id}>
                                            <Image style={{height: '200px', objectFit: 'cover', borderRadius: '20px', width: '100%'}}
                                                   src={item.image_url}
                                            />
                                        </Col>
                                    )
                                })}
                            </>
                        )}
                    </>
                )}
            </Row>
        </>
    )
}

export default Dashboard
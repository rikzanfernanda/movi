import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, Col, Row} from "antd";
import {Link} from "react-router-dom";

const Games = () => {
    const {Meta} = Card;
    const [games, setGames] = useState([])
    const [fetchStatus, setFetchStatus] = useState(true)

    const getData = () => {
        axios.get("https://backendexample.sanbersy.com/api/data-game").then((res) => {
            let data = res.data
            let result = data.sort((a,b) => {
                if (a.release > b.release) return -1
                if (a.release < b.release) return 1
                return 0
            })
            setGames(result.map(res => {
                return {
                    id: res.id,
                    name: res.name,
                    genre: res.genre,
                    multiPlayer: res.multiPlayer,
                    platform: res.platform,
                    release: res.release,
                    singlePlayer: res.singlePlayer,
                    image_url: res.image_url,
                }
            }))
        });
    }

    useEffect(() => {

        if (fetchStatus === true) {
            getData()
            setFetchStatus(false)
        }
    }, [fetchStatus])


    return (
        <>
            <div className="container" style={{marginBottom: "60px", marginTop: '40px'}}>
                <h1>All Games</h1>
                <Row gutter={[8, 8]}>
                    {games !== null && (
                        <>
                            {games.map(game => {
                                return (
                                    <Col xs={24} sm={12} md={6} key={game.id}>
                                        <Link to={`/games/${game.id}`}>
                                            <Card className="my-card"
                                                  hoverable
                                                  cover={
                                                      <img className="home-img-card" alt="" src={game.image_url}/>
                                                  }>
                                                <Meta
                                                    title={game.name}
                                                />
                                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                                    <div style={{color: '#f5222d'}}>{game.genre}</div>
                                                    <div>Release: <b>{game.release}</b></div>
                                                </div>
                                                <div style={{fontSize: '12px'}}>
                                                    platform: {game.platform}
                                                </div>
                                            </Card>
                                        </Link>
                                    </Col>
                                )
                            })}
                        </>
                    )}
                </Row>
            </div>
        </>
    )
}

export default Games
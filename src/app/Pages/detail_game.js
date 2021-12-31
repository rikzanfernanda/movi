import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Col, Row} from "antd";

const DetailGame = () => {
    let {id} = useParams()
    const [game, setGame] = useState([])

    const getData = () => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`).then((res) => {
            let data = res.data
            setGame(data)
        });
    }
    
    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id])
    return(
        <>
            <div className="container">
                <h1>{game.name}</h1>
                <Row style={{marginBottom: "60px"}}>
                    <Col span={16} style={{padding: "10px"}}>
                        <div>
                            <ul>
                                <li>release: {game.release}</li>
                                <li>genre: {game.genre}</li>
                                <li>platform: {game.platform}</li>
                                {game.multiplayer? <li>multiplayer</li>: ""}
                                {game.singlePlayer? <li>single player</li>: ""}
                            </ul>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <img className="img" src={game.image_url} alt=""/>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default DetailGame
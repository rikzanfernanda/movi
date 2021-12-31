import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Col, Row} from "antd";

const DetailMovie = () => {
    let {id} = useParams()
    const [movie, setMovie] = useState([])

    const getData = () => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`).then((res) => {
            let data = res.data
            setMovie(data)
        });
    }
    console.log(movie)
    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id])
    return(
        <>
            <div className="container">
                <h1>{movie.title}</h1>
                <Row style={{marginBottom: "60px"}}>
                    <Col span={16} style={{padding: "10px"}}>
                        <div>
                            <p>{movie.description}</p>
                            <ul>
                                <li>duration: {movie.duration} minute</li>
                                <li>genre: {movie.genre}</li>
                                <li>rating: {movie.rating}</li>
                                <li>review: {movie.review}</li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <img className="img" src={movie.image_url} alt=""/>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default DetailMovie
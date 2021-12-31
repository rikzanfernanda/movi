import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Card, Col, Rate, Row} from "antd";
import {MovieContext} from "../Contexts/MovieContext";
import {Link} from "react-router-dom";

const Movies = () => {
    const {Meta} = Card;
    const {
        truncate
    } = useContext(MovieContext)
    const [movies, setMovies] = useState([])
    const [fetchStatus, setFetchStatus] = useState(true)

    const getData = () => {
        axios.get("https://backendexample.sanbersy.com/api/data-movie").then((res) => {
            let data = res.data
            let sort = data.sort((a,b) => {
                if (a.year > b.year) return -1
                if (a.year < b.year) return 1
                return 0
            })
            setMovies(sort.map(res => {
                return {
                    id: res.id,
                    description: truncate(res.description, 100),
                    title: res.title,
                    duration: res.duration,
                    genre: res.genre,
                    image_url: res.image_url,
                    rating: res.rating,
                    review: res.review,
                    year: res.year
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
                <h1>All Movies</h1>
                <Row gutter={[8, 8]} style={{marginBottom: "60px"}}>
                    {movies !== null && (
                        <>
                            {movies.map(item => {
                                return (
                                    <Col xs={24} sm={12} md={6} key={item.id}>
                                        <Link to={`/movies/${item.id}`}>
                                            <Card className="my-card"
                                                  hoverable
                                                  cover={
                                                      <img className="home-img-card" alt="" src={item.image_url}/>
                                                  }>
                                                <Meta
                                                    title={item.title}
                                                />
                                                <p>{item.description}</p>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    <div style={{color: '#f5222d'}}>{item.genre}</div>
                                                    <div><b>{item.year}</b></div>
                                                </div>
                                                <Rate disabled defaultValue={item.rating} count={10} />
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

export default Movies
import React from "react";
import {Carousel, Col, Row} from "antd";
import Img1 from "../../assets/img/Red_Dead_Redemption_II.jpg";
import Img2 from "../../assets/img/Spider-Man_Miles_Morales.jpeg";
import Img3 from "../../assets/img/auth-3.jpg";
import Img4 from "../../assets/img/Uncharted_4_box_artwork.jpg";

const AuthLayout = (props) => {
    return (
        <>
            <Row>
                <Col xs={0} sm={12}>
                    <Carousel autoplay
                              style={{position: "fixed", top: 0, left: 0, bottom: 0, width: "50%", height: "100%"}}>
                        <div>
                            <img className="img-auth" src={Img3} alt=""/>
                        </div>
                        <div>
                            <img className="img-auth" src={Img1} alt=""/>
                        </div>
                        <div>
                            <img className="img-auth" src={Img2} alt=""/>
                        </div>
                        <div>
                            <img className="img-auth" src={Img4} alt=""/>
                        </div>
                    </Carousel>
                </Col>
                <Col xs={24} sm={12}>
                    {props.content}
                </Col>
            </Row>
        </>
    )
}

export default AuthLayout
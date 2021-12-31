import React from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import {Layout} from "antd";

const LayoutApp = (props) => {
    const {Content} = Layout;
    return (
        <>
            <Layout>
                <Navbar/>
                <Content>
                    <div className="content">
                        {props.content}
                    </div>
                </Content>
                <Footer/>
            </Layout>
        </>
    )
}

export default LayoutApp
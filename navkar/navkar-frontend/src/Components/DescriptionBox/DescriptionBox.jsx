import React from 'react';
import './DescriptionBox.css';
import {Col, Container, Row} from 'react-bootstrap';

const DescriptionBox = ({ product }) => {
    return (
        <Container className="DescriptionBox">
            <Row>
                <Col>
                    <div className="DescriptionBox-navigator">
                        <div className="DescriptionBox-nav-box">Description</div>
                        {/* Uncomment if you want to add a Reviews section */}
                        {/* <div className="DescriptionBox-nav-box-fade">Reviews (127)</div> */}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="DescriptionBox-Description">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product?.Description || '<p>No description available.</p>',
                            }}
                        ></div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DescriptionBox;

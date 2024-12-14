import './DescriptionBox.css';
import React from 'react';

const DescriptionBox = ({ product }) => {
    return (
        <div className="DescriptionBox">
            <div className="DescriptionBox-navigator">
                <div className="DescriptionBox-nav-box">Description</div>
                {/*<div className="DescriptionBox-nav-box-fade">*/}
                {/*    Reviews (127)*/}
                {/*</div>*/}
            </div>
            <div className="DescriptionBox-Description">
                {/* Render the rich text content as HTML */}
                <div
                    dangerouslySetInnerHTML={{
                        __html: product?.Description || '<p>No description available.</p>',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default DescriptionBox;

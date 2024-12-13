import React from 'react';
import './item.css'
import {Link} from "react-router-dom";

const Item = (props) => {
    return (
        <div className={'item'}>

            <Link to={`/product/${props.id}`}> <img src={props.image} alt={''}/> </Link>
            {/*onClick={window.scrollTo(0, 0)}*/}
            <p>{props.name}</p>

            <div className="item-prices">
                <span className="item-price-old">
                    ₹ {props.old_price}
                </span>
                <span className="item-price-new">
                    ₹ {props.new_price}
                </span>
            </div>
            <p>MOQ: {props.MOQ}</p>
        </div>
    );
};

export default Item;

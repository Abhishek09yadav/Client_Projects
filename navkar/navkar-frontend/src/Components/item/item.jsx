import React from 'react';
import './item.css';
import {Link} from "react-router-dom";

const Item = ({
                  id,
                  image,
                  name,
                  old_price,
                  new_price,
                  MOQ,
                  isSelected,
                  onProductSelect,
                  onQuantityChange,
                  selectedQuantity,
                  showCheckbox = true,
              }) => {
    return (
        <div
            className={` item-main-container bg-white position-relative rounded-3 item ${isSelected ? 'item-selected' : ''}`}>
            {/*<div className="left">*/}
            <img src={image} className={'item-img'} alt="prod image"/>
            {/*</div>*/}
            <div className="d-flex justify-content-center align-items-center flex-column" style={{width: '50%'}}>
                <div className="item-price d-flex justify-content-center flex-column">
                    <p className="product-name w-100 text-center">{name}</p>
                    <div className="align-self-center">

                        <span className="item-price-old  mx-1">₹{old_price}</span>
                        <span className="item-price-new  mx-1">₹{new_price}</span>
                    </div>
                </div>
                <p title="Minimum order Quantity "
                   className="MOQ d-flex justify-content-center text-center">MOQ: {MOQ}</p>
                {showCheckbox && (<div className="item-quantity">
                    <label>Quantity:</label>
                    <div className="quantity-input-wrapper gap-3">
                        <input
                            type="number"
                            value={selectedQuantity || 0}
                            onChange={(e) => onQuantityChange(id, e.target.value, MOQ)}
                            className="quantity-input"
                        />

                        {/*<label className="item-checkbox-container">*/}
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => onProductSelect(id, MOQ, e.target.checked)}
                            className="item-checkbox"
                        />
                        {/*<span className="select-text">Select</span>*/}
                        {/*<span className="checkmark"></span>*/}
                        {/*</label>*/}

                    </div>
                </div>)}
            </div>
            <Link className="bottom view-details text-center position-absolute text-decoration-none text-amber-100"
                  to={`/product/${id}`}>
                View Details
            </Link>
            {/*<div className={`item ${isSelected ? 'item-selected' : ''}`}>*/}
            {/*    <Link to={`/product/${id}`} className="item-image-container">*/}
            {/*        <img className="item-img" src={image} alt={name}/>*/}
            {/*    </Link>*/}
            {/*    <div className="item-details">*/}
            {/*        <p className="product-name">{name}</p>*/}
            {/*        <div className="item-price">*/}
            {/*            <span className="item-price-old">₹{old_price}</span>*/}
            {/*            <span className="item-price-new">₹{new_price}</span>*/}
            {/*        </div>*/}
            {/*        <p title="Minimum order Quantity" className="MOQ">MOQ: {MOQ}</p>*/}

            {/*        {(*/}
            {/*            <div className="item-quantity">*/}
            {/*                <label>Quantity:</label>*/}
            {/*                <div className="quantity-input-wrapper">*/}
            {/*                    <input*/}
            {/*                        type="number"*/}
            {/*                        value={selectedQuantity}*/}
            {/*                        onChange={(e) => onQuantityChange(id, e.target.value, MOQ)}*/}
            {/*                        className="quantity-input"*/}
            {/*                    />*/}

            {/*                        <label className="item-checkbox-container">*/}
            {/*                            <input*/}
            {/*                                type="checkbox"*/}
            {/*                                checked={isSelected}*/}
            {/*                                onChange={(e) => onProductSelect(id, MOQ, e.target.checked)}*/}
            {/*                                className="item-checkbox"*/}
            {/*                            />*/}
            {/*                            /!*<span className="select-text">Select</span>*!/*/}
            {/*                            <span className="checkmark"></span>*/}
            {/*                        </label>*/}

            {/*                </div>*/}
            {/*            </div>*/}
            {/*        )}*/}


            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Item;

import React from 'react';
import './item.css';
import {Link} from 'react-router-dom';

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
    return (<div className={'item-main-container'}>
        <div className={`item ${isSelected ? 'item-selected' : ''}`}>
            {showCheckbox && (<div className="item-select-wrapper">
                <label className="item-checkbox-container">

                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onProductSelect(id, MOQ, e.target.checked)}
                        className="item-checkbox"
                    />
                    <span className="select-text">Select</span>
                    <span className="checkmark"></span>

                </label>
            </div>)}
            <Link to={`/product/${id}`}>
                <img className="item-img" src={image} alt={name}/>
            </Link>
            <p className="product-name">{name}</p>
            <div className="item-price">
                <span className="item-price-old">₹{old_price}</span>
                <span className="item-price-new">₹{new_price}</span>
            </div>
            <p title={"Minimum order Quantity"} className="MOQ">MOQ: {MOQ}</p>

            {isSelected && (
                <div className="item-quantity">
                    <label>Quantity:</label>
                    <div className="quantity-input-wrapper">
                        <input
                            type="number"
                            min={MOQ}
                            value={selectedQuantity}
                            onChange={(e) => onQuantityChange(id, e.target.value)}
                            className="quantity-input"
                        />
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Item;
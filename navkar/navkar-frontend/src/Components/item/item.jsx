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
                  selectedQuantity
              }) => {
    return (
        <div className="item">
            <div className="item-checkbox">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onProductSelect(id, MOQ, e.target.checked)}
                />
            </div>

            <Link to={`/product/${id}`}>
                <img className="item-img" src={image} alt={name}/>
            </Link>
            <p className="product-name">{name}</p>
            <div className="item-price">
                <span className="item-price-old">₹{old_price}</span>
                <span className="item-price-new">₹{new_price}</span>
            </div>
            <p className="MOQ">MOQ: {MOQ}</p>

            {isSelected && (
                <div className="item-quantity">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        min={MOQ}
                        value={selectedQuantity}
                        onChange={(e) => onQuantityChange(id, e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default Item;
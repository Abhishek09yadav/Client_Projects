import React, {useEffect, useState} from 'react';
import './item.css';
import {Link} from "react-router-dom";
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

const url = process.env.REACT_APP_API_URL;

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
    const [isIncreasing, setIsIncreasing] = useState(false);
    const [isDecreasing, setIsDecreasing] = useState(false);

    useEffect(() => {
        let interval;
        if (isIncreasing) {
            interval = setInterval(() => {
                const newQuantity = (selectedQuantity || 0) + 1;
                onQuantityChange(id, newQuantity, MOQ);
            }, 100); // Adjust the interval duration as needed
        } else if (isDecreasing) {
            interval = setInterval(() => {
                const newQuantity = Math.max((selectedQuantity || 0) - 1, 0);
                onQuantityChange(id, newQuantity, MOQ);
            }, 100); // Adjust the interval duration as needed
        }
        return () => clearInterval(interval);
    }, [isIncreasing, isDecreasing, selectedQuantity, onQuantityChange, id, MOQ]);



    return (
        <div
            className={`item-main-container bg-white position-relative rounded-3 item ${isSelected ? 'item-selected' : ''}`}>
            <img src={`${url}${image}`} className={'item-img'} alt="prod image"/>
            <div className="d-flex justify-content-center align-items-center flex-column" style={{width: '50%'}}>
                <div className="item-price d-flex justify-content-center flex-column mt-2">
                    <p className="product-name  w-100 text-center">{name}</p>
                    {/* <div className="align-self-center">
                        <span className="item-price-old mx-1">₹{old_price}</span>
                        <span className="item-price-new mx-1">₹{new_price}</span>
                    </div> */}
                </div>
                <div className={'d-flex flex-row gap-4 mb-2 '}>
                    <p title="Minimum order Quantity"
                       className="MOQ d-flex justify-content-center text-center mb-0">MOQ: {MOQ}</p>
                    {showCheckbox && (<input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onProductSelect(id, MOQ, e.target.checked)}
                        className="item-checkbox"
                    />)}
                </div>
                {showCheckbox && (
                    <div className="item-quantity">
                        <div className="quantity-input-wrapper gap-0.5 d-flex align-items-center">
                            <FaMinusCircle
                                className="quantity-icon"
                                onMouseDown={() => setIsDecreasing(true)}
                                onMouseUp={() => setIsDecreasing(false)}
                                onMouseLeave={() => setIsDecreasing(false)}
                                onTouchStart={() => setIsDecreasing(true)}
                                onTouchEnd={() => setIsDecreasing(false)}
                                style={{cursor: 'pointer', color: selectedQuantity > 0 ? '#10b981' : '#ccc'}}
                            />
                            <input
                                type="number"
                                value={selectedQuantity || 0}
                                onChange={(e) => onQuantityChange(id, e.target.value, MOQ)}
                                onFocus={(e) => e.target.select()}
                                className="quantity-input mx-2"
                            />
                            <FaPlusCircle
                                className="quantity-icon"
                                onMouseDown={() => setIsIncreasing(true)}
                                onMouseUp={() => setIsIncreasing(false)}
                                onMouseLeave={() => setIsIncreasing(false)}
                                onTouchStart={() => setIsIncreasing(true)}
                                onTouchEnd={() => setIsIncreasing(false)}
                                style={{cursor: 'pointer', color: '#10b981'}}
                            />
                        </div>
                    </div>
                )}
            </div>
            <Link className="bottom view-details text-center position-absolute text-decoration-none text-amber-100"
                  to={`/product/${id}`}>
                View Details
            </Link>
        </div>
    );
};

export default Item;
import React, {useContext} from 'react';
import './CartItems.css'
//import all_product from "../Assets/all_product";
import {ShopContext} from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
//import Button from "@mui/material/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';


const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart} =
        useContext(ShopContext);
    return (
        <div className={'CartItems'}>
            <div className="CartItems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>

            </div>
            <hr/>
            <div>

                {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return <div className="CartItems-format CartItems-format-main">
                            <img src={e.image} alt="" className="CartIcons-product-icon"/>

                            <p>{e.name}</p>
                            <p>₹{e.new_price}</p>

                            <button type="button" className="btn btn-light  CartItems-quantity"
                                    style={{backgroundColor: '#ecf0f1', color: "black"}} onClick={() => {

                            }}> {cartItems[e.id]}

                            </button>

                            <p>₹{e.new_price * cartItems[e.id]}</p>
                            <img className="CartItems-Remove-Icon" alt={''} src={remove_icon} onClick={() => {
                                removeFromCart(e.id)
                            }}/>

                            <i className="bi bi-plus"
                               onClick={() => addToCart(e.id)}
                               style={{cursor: 'pointer'}}>
                            </i>

                            <hr/>
                        </div>
                    }
                    return null;
                })}
                <div className="CartItems-down">
                    <div className="CartItems-total">
                        <h1>
                            Cart Totals
                        </h1>
                        <div>
                            <div className="CartItems-total-item">
                                <p>Subtotal</p>
                                <p>₹{getTotalCartAmount()}</p>
                                <hr className={'CartItems-total-item'}/>
                                <p>Shipping fee</p>
                                <p>Free</p>
                            </div>
                            <hr/>
                            <div className="CartItems-total-item">
                                <h3>Total</h3>
                                <h3>₹{getTotalCartAmount()}</h3>
                            </div>
                        </div>
                        <button type="button" className="btn btn-light"
                                style={{color: "#ecf0f1", width: '262px'}}>
                            Proceed To Checkout
                            <FontAwesomeIcon icon={faArrowRight} style={{paddingLeft: '10px'}}/>
                        </button>
                    </div>
                    <div className="CartItems-Promocode">
                        <p>If you have a promocode please Enter it here</p>
                        <div className="CartItems-Promobox">
                            <input type={'text'} placeholder={'Enter your promocode'}/>
                            <button type="submit" className="btn btn-primary border-0 CartItems-Promocode-Button">Submit
                            </button>
                        </div>


                    </div>
                </div>
            </div>
            {/*<hr/>*/}
        </div>
    );
};

export default CartItems;

import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // State to manage the currently displayed main image
    const [mainImage, setMainImage] = useState('');

    // Array of product images
    const productImages = [
        product?.image,
        product?.image1,
        product?.image2,
        product?.image3
    ].filter(img => img); // Remove any undefined images

    // UseEffect to set initial main image when product changes
    useEffect(() => {
        // Set the first available image as main image
        if (productImages.length > 0) {
            setMainImage(productImages[0]);
        }
    }, [product]);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {productImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Product view ${index + 1}`}
                            onClick={() => setMainImage(img)}
                            className={mainImage === img ? 'selected-image' : ''}
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img
                        className='productdisplay-main-img'
                        src={mainImage}
                        alt="Main product view"
                    />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product?.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="star"/>
                    <img src={star_icon} alt="star"/>
                    <img src={star_icon} alt="star"/>
                    <img src={star_icon} alt="star"/>
                    <img src={star_dull_icon} alt="star"/>
                    <p>(119)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <span className="productdisplay-right-prices-old">
                        ₹{product?.old_price}
                    </span>
                    <span className="productdisplay-right-prices-new">
                        ₹{product?.new_price}
                    </span>
                </div>
                {/*<div className="productdisplay-right-description">*/}
                {/*    A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and*/}
                {/*    short sleeves, worn as an undershirt or outer garment.*/}
                {/*</div>*/}

                <p className={'productdisplay-right-category'}>
                    <span>Category : </span> {product?.category}
                </p>
            </div>
        </div>
    );
}

export default ProductDisplay;
import React, {useEffect, useState} from 'react';
import './ProductDisplay.css';

const url = process.env.REACT_APP_API_URL

const ProductDisplay = (props) => {
    const { product } = props;

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
        if (productImages.length > 0) {
            setMainImage(productImages[0]);
        }
    }, [product]);

    return (
        <div className='productdisplay' style={{padding: "0px"}}>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {productImages.map((img, index) => (
                        <img
                            key={index}
                            src={`${url}${img}`}
                            alt={`Product view ${index + 1}`}
                            onClick={() => setMainImage(img)}
                            className={mainImage === img ? 'selected-image' : ''}
                        />
                    ))}
                </div>
                <div className="productdisplay-img text-center ">
                    <img
                        className='productdisplay-main-img '
                        src={`${url}${mainImage}`}
                        alt="Main product view"
                    />
                </div>
            </div>
            <div className="productdisplay-right text-center">

                <h1>{product?.name}</h1>
                <div className="productdisplay-right-prices align-self-center m-1">
                <span className="productdisplay-right-prices-old">
                  ₹{product?.old_price}
                </span>
                    <span className="productdisplay-right-prices-new">
                  ₹{product?.new_price}
                </span>
                </div>
                <p className="productdisplay-right-category">
                    <span>Category : </span> {product?.category}
                </p>
            </div>

        </div>
    );
}

export default ProductDisplay;
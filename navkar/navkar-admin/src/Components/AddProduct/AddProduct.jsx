import React, {useEffect, useState} from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import plus_icon from '../../assets/plus.png';
import rupee_icon from '../../assets/rupee.png';
import title_icon from '../../assets/title.png';
import percent_icon from '../../assets/percent.png';
import detail_icon from '../../assets/detail.png';
import moq_icon from '../../assets/minimum_order_quantity.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cross_icon from '../../assets/cross_icon.png';

const url = import.meta.env.VITE_API_URL;

function AddProduct({product, onClose}) {
    const [categories, setCategories] = useState([]); // State to store fetched categories
    const [images, setImages] = useState({
        image: false,
        image1: false,
        image2: false,
        image3: false,
    });
    const [productDetails, setProductDetails] = useState(product || {
        name: '',
        image: '',
        image1: '',
        image2: '',
        image3: '',
        category: '',
        Description: '',
        Tax: '',
        new_price: '',
        old_price: '',
        MOQ: '',
    });
    const [uploadCount, setUploadCount] = useState(1);
    const saveProduct = async () => {
        const endpoint = product ? `${url}/editProduct/${product.id}` : `${url}/addProduct`;
        const method = product ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(productDetails),
            });
            const data = await response.json();
            if (data.success) {
                alert('Product saved successfully!');
                onClose();
            } else {
                alert(`Failed to save product: ${data.message}`);
            }
        } catch (error) {
            console.error('Error saving product:', error.message);
        }
    };
    useEffect(() => {
        // Fetch categories from the server
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${url}/categories`);
                const data = await response.json();
                setCategories(data); // Set categories to state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const imageHandler = (event, imageKey) => {
        setImages(prevImages => ({
            ...prevImages,
            [imageKey]: event.target.files[0],
        }));
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {


        let product = { ...productDetails };
        const imageKeys = ['image', 'image1', 'image2', 'image3'];

        for (let key of imageKeys) {
            if (images[key]) {
                let formData = new FormData();
                formData.append('product', images[key]);
                try {
                    const response = await fetch(`${url}/upload`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    if (data.success) {
                        product[key] = data.image_url;
                    }
                } catch (error) {
                    console.error(`Error uploading ${key}:`, error.message);
                }
                console.log('Submitting product:', productDetails);
            }
        }

        try {
            const response = await fetch(`${url}/addProduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            const data = await response.json();
            if (data.success) {
                alert('Product added successfully!');
            } else {
                alert(`Failed to add product: ${data.message}`);
            }
        } catch (error) {
            console.error('Error adding product:', error.message);
            alert('Failed to add product.');
        }
    };
    const removeImage = (imageKey) => {
        setImages(prevImages => ({
            ...prevImages,
            [imageKey]: false,
        }));
        setProductDetails(prevDetails => ({
            ...prevDetails,
            [imageKey]: '',
        }));
    };



    return (
        <div className="AddProduct">
            <div className="AddProduct-itemfield">
                <p>Product Title</p>
                <div className="AddProduct-input-container">
                    <img src={title_icon} alt="Title Icon" className="AddProduct-icon"/>
                    <input
                        type="text"
                        name="name"
                        value={productDetails.name}
                        onChange={changeHandler}
                        placeholder="Type Here"
                    />
                </div>
            </div>
            <div className="AddProduct-price">
                <div className="AddProduct-itemfield">
                    <p>Price</p>
                    <div className="AddProduct-price-input">
                        <img src={rupee_icon} alt="Rupee" className="rupee-icon"/>
                        <input
                            type="text"
                            name="old_price"
                            value={productDetails.old_price}
                            onChange={changeHandler}
                            placeholder="Type Here"
                        />
                    </div>
                </div>
                <div className="AddProduct-itemfield">
                    <p>Offer Price</p>
                    <div className="AddProduct-price-input">
                        <img src={rupee_icon} alt="Rupee" className="rupee-icon"/>
                        <input
                            type="text"
                            name="new_price"
                            value={productDetails.new_price}
                            onChange={changeHandler}
                            placeholder="Type Here"
                        />
                    </div>
                </div>
                <div className="AddProduct-itemfield">
                    <p>Tax(%)</p>
                    <div className="AddProduct-price-input">
                        <img src={percent_icon} alt="Percent" className="percent-icon"/>
                        <input
                            type="text"
                            name="Tax"
                            value={productDetails.Tax}
                            onChange={changeHandler}
                            placeholder="Type Here"
                        />
                    </div>
                </div>


            </div>
            <div className="AddProduct-itemfield">
                <p>Minimum Order Quantity(MOQ)</p>
                <div className="AddProduct-input-container">
                    <img src={moq_icon} alt="MOQ Icon" className="AddProduct-icon"/>
                    <input
                        type="text"
                        name="MOQ"
                        value={productDetails.MOQ}
                        onChange={changeHandler}
                        placeholder="Type Here"

                    />
                </div>
            </div>
            <div className="AddProduct-itemfield">
                <p>Product Category</p>
                <select
                    name="category"
                    value={productDetails.category}
                    onChange={changeHandler}
                    className="AddProduct-select"
                >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.category}>
                            {category.category}
                        </option>
                    ))}
                </select>
                <div className="AddProduct-itemfield">
                    <p>Product Detail</p>
                    <div className="AddProduct-input-container">
                        <img src={detail_icon} alt="Detail Icon" className="AddProduct-icon"/>
                        <ReactQuill
                            theme="snow"
                            value={productDetails.Description}
                            onChange={(value) =>
                                setProductDetails({...productDetails, Description: value})
                            }
                            className="AddProduct-description"
                            placeholder="Type Description Here"
                        />
                    </div>
                </div>

                <div className="AddProduct-image-uploads">
                    <div className="AddProduct-upload-grid">
                        {['image', 'image1', 'image2', 'image3']
                            .slice(0, uploadCount)
                            .map((key) => (
                                <div key={key} className="AddProduct-itemfield">
                                    {images[key] && (
                                        <div className="AddProduct-delete-icon-container">
                                            <img
                                                src={cross_icon}
                                                alt="Delete"
                                                className="AddProduct-delete-icon"
                                                onClick={() => removeImage(key)}
                                            />
                                        </div>
                                    )}
                                    <label htmlFor={`file-input-${key}`}>
                                        <img
                                            src={images[key] ? URL.createObjectURL(images[key]) : upload_area}
                                            className="AddProduct-thumbnail-image"
                                            alt={`Upload ${key}`}
                                        />
                                    </label>
                                    <input
                                        onChange={(e) => imageHandler(e, key)}
                                        type="file"
                                        name={key}
                                        id={`file-input-${key}`}
                                        style={{display: 'none'}}
                                        hidden={true}
                                    />
                                </div>
                            ))}
                    </div>

                    {uploadCount < 4 && (
                        <button
                            type="button"
                            className="AddProduct-btn-add"
                            onClick={() => setUploadCount(uploadCount + 1)}
                        >
                            <img src={plus_icon} alt="Plus Icon" className="plus-icon"/>
                            Add Another Image
                        </button>
                    )}
                </div>
                {product ? (<button
                    type="button"
                    onClick={saveProduct}
                    className="AddProduct-btn btn btn-lg no-border no-focus-outline"
                >
                    Save Changes
                </button>) : <button
                    type="button"
                    onClick={Add_Product}
                    className="AddProduct-btn btn btn-lg no-border no-focus-outline"
                >
                    ADD Product
                </button>}
            </div>
        </div>
    );
}

export default AddProduct;

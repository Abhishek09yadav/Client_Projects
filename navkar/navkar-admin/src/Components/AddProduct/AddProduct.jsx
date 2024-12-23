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
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState({
        image: false,
        image1: false,
        image2: false,
        image3: false,
    });
    const [existingImages, setExistingImages] = useState({
        image: '',
        image1: '',
        image2: '',
        image3: '',
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

    // Calculate initial upload count based on existing images
    const calculateInitialUploadCount = () => {
        if (product) {
            let count = 1; // Start with 1 for the main image
            if (product.image1) count++;
            if (product.image2) count++;
            if (product.image3) count++;
            return count;
        }
        return 1;
    };

    const [uploadCount, setUploadCount] = useState(calculateInitialUploadCount());

    // Set existing images when product prop changes
    useEffect(() => {
        if (product) {
            setExistingImages({
                image: product.image || '',
                image1: product.image1 || '',
                image2: product.image2 || '',
                image3: product.image3 || '',
            });
            setUploadCount(calculateInitialUploadCount());
        }
    }, [product]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${url}/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const imageHandler = (event, imageKey) => {
        const file = event.target.files[0];
        if (file) {
            setImages(prevImages => ({
                ...prevImages,
                [imageKey]: file,
            }));
            // Clear the existing image when a new file is selected
            setExistingImages(prevImages => ({
                ...prevImages,
                [imageKey]: '',
            }));
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const saveProduct = async () => {
        try {
            let updatedProduct = {...productDetails};

            // Handle image uploads
            const imageKeys = ['image', 'image1', 'image2', 'image3'];

            for (let key of imageKeys) {
                if (images[key]) {
                    const formData = new FormData();
                    formData.append('product', images[key]);

                    try {
                        const uploadResponse = await fetch(`${url}/upload`, {
                            method: 'POST',
                            body: formData,
                        });

                        if (!uploadResponse.ok) {
                            throw new Error(`HTTP error! status: ${uploadResponse.status}`);
                        }

                        const uploadData = await uploadResponse.json();
                        if (uploadData.success === 1) {
                            updatedProduct[key] = uploadData.image_url;
                        }
                    } catch (uploadError) {
                        console.error(`Error uploading ${key}:`, uploadError);
                        alert(`Failed to upload ${key}. Please try again.`);
                        return;
                    }
                } else if (existingImages[key]) {
                    // Keep the existing image URL if no new image was uploaded
                    updatedProduct[key] = existingImages[key];
                }
            }

            const endpoint = product ? `${url}/editProduct/${product.id}` : `${url}/addProduct`;
            const method = product ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedProduct),
            });

            const data = await response.json();
            if (data.success) {
                alert(product ? 'Product updated successfully!' : 'Product added successfully!');
                onClose();
            } else {
                alert(`Failed to ${product ? 'update' : 'add'} product: ${data.message}`);
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert(`Failed to ${product ? 'update' : 'add'} product.`);
        }
    };


    const removeImage = (imageKey) => {
        setImages(prevImages => ({
            ...prevImages,
            [imageKey]: false,
        }));
        setExistingImages(prevImages => ({
            ...prevImages,
            [imageKey]: '',
        }));
        setProductDetails(prevDetails => ({
            ...prevDetails,
            [imageKey]: '',
        }));
    };

    const getImageSource = (imageKey) => {
        if (images[imageKey]) {
            return URL.createObjectURL(images[imageKey]);
        } else if (existingImages[imageKey]) {
            return existingImages[imageKey];
        }
        return upload_area;
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
                                    {(images[key] || existingImages[key]) && (
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
                                            src={getImageSource(key)}
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
                                        accept="image/*"
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
                <button
                    type="button"
                    onClick={saveProduct}
                    className="AddProduct-btn btn btn-lg no-border no-focus-outline"
                >
                    {product ? 'Save Changes' : 'ADD Product'}
                </button>
            </div>
        </div>
    );
}

export default AddProduct;

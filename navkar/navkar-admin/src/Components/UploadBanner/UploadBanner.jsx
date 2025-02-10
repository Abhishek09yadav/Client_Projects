import React, {useEffect, useState} from 'react';
import './UploadBanner.css';
import upload_area from '../../assets/upload_area.svg';
import plus_icon from '../../assets/plus.png';
import cross_icon from '../../assets/cross_icon.png';

const url = import.meta.env.VITE_API_URL;

function UploadBanner() {
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${url}/banners`);
                const data = await response.json();
                setProduct(data[0]); // Assuming you are working with the first banner
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    const [product, setProduct] = useState('');
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

    const imageHandler = (event, imageKey) => {
        const file = event.target.files[0];
        if (file) {
            setImages((prevImages) => ({
                ...prevImages,
                [imageKey]: file,
            }));
            setExistingImages((prevImages) => ({
                ...prevImages,
                [imageKey]: '',
            }));
        }
    };


    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value});
    };

    const saveProduct = async () => {
        try {
            let updatedBanner = {...productDetails};

            // Hardcode the ID to 123
            updatedBanner.id = 123;

            const formData = new FormData();

            // Ensure all keys are included in FormData
            ['image', 'image1', 'image2', 'image3'].forEach((key) => {
                if (images[key]) {
                    formData.append(key, images[key]); // New file
                } else if (existingImages[key]) {
                    formData.append(key, existingImages[key]); // Existing URL
                } else {
                    formData.append(key, ''); // Removed image
                }
            });

            const uploadResponse = await fetch(`${url}/banners/${updatedBanner.id}`, {
                method: 'PUT',
                body: formData,
            });

            const uploadData = await uploadResponse.json();
            if (uploadData.success) {
                setProduct(uploadData.banner); // Update the product state with the response data
                alert('Banner updated successfully!');
            } else {
                alert('Failed to update banner.');
            }
        } catch (error) {
            console.error('Error updating banner:', error);
            alert('Failed to update banner.');
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
            return `${url}${existingImages[imageKey]}`;
        }
        return upload_area;
    };

    return (
        <div className="AddProduct">
            <h1 className={'banner-text'}>Upload Banner Images</h1>
            <div className="AddProduct-itemfield">


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
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default UploadBanner;

import React, {useEffect, useState} from 'react';
import './Banner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Spinner from "../spinner/Spinner";

const url = process.env.REACT_APP_API_URL;

const Banner = () => {
    const [images, setImages] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBanners = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${url}/banners`);
                const data = await response.json();
                setImages(data[0]); // Assuming you are working with the first banner
            } catch (error) {
                console.error('Error fetching banners:', error);
            } finally {
                setLoading(false)
            }
            console.log('fetchBanners:', fetchBanners);
        };

        fetchBanners();
    }, []);

    return (
        <div className="carousel-main-container container-md mx-auto position-relative p-0">
            <div id="carouselExampleSlidesOnly" className="carousel slide carousel-container" data-bs-ride="carousel">
                {loading ? <Spinner paragraph={'Loading Banners'}/> :
                    <div className="carousel-inner carousel-inner-container">
                    {images.image ? (
                        <div className="carousel-item active">
                            <img src={`${url}${images.image}`} className="d-block w-100 images carousel-image"
                                 alt="..."/>
                        </div>
                    ) : ''}
                    {images.image1 ? (
                        <div className="carousel-item">
                            <img src={`${url}${images.image1}`} className="d-block w-100 images carousel-image"
                                 alt="..."/>
                        </div>
                    ) : ''}
                    {images.image2 ? (
                        <div className="carousel-item">
                            <img src={`${url}${images.image2}`} className="d-block w-100 images carousel-image"
                                 alt="..."/>
                        </div>
                    ) : ''}
                    {images.image3 ? (
                        <div className="carousel-item">
                            <img src={`${url}${images.image3}`} className="d-block w-100 images carousel-image"
                                 alt="..."/>
                        </div>
                    ) : ''}
                    </div>}
            </div>
        </div>
    );
};

export default Banner;
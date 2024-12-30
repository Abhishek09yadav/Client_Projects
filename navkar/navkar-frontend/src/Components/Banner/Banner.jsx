import React, {useEffect, useState} from 'react';
import './Banner.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const url = process.env.REACT_APP_API_URL;
const Banner = () => {
    const [images, setImages] = useState('');

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${url}/banners`);
                const data = await response.json();
                setImages(data[0]); // Assuming you are working with the first banner
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
            console.log('fetchBanners:', fetchBanners);
        };

        fetchBanners();
    }, []);




    return (
        <div className={'carousel-main-container'}>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {images.image ? (<div className="carousel-item active">
                        <img src={images.image} className="d-block w-100  images" alt="..."/>
                    </div>) : ''}
                    {images.image1 ? (<div className="carousel-item">
                        <img src={images.image1} className="d-block w-100 images" alt="..."/>
                    </div>) : ''}
                    {images.image2 ? (<div className="carousel-item">
                        <img src={images.image2} className="d-block w-100 images" alt="..."/>
                    </div>) : ''}
                    {images.image3 ? (<div className="carousel-item">
                        <img src={images.image3} className="d-block w-100 images" alt="..."/>
                    </div>) : ''}

                </div>
            </div>
        </div>
    );
};

export default Banner;

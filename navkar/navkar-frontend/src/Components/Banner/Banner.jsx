import React from 'react';
import './Banner.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import banner1 from '../Assets/banner_kids.png'
import banner2 from '../Assets/banner_women.png'
import banner3 from '../Assets/banner_mens.png'

const Banner = () => {


    return (
        <div>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={banner1} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={banner2} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={banner3} className="d-block w-100" alt="..."/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

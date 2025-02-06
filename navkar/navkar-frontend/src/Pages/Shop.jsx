import React from 'react';

import Category from "../Components/Category/Category";
import Banner from "../Components/Banner/Banner";
import NewCollections from "../Components/NewCollections/NewCollections";


const Shop = () => {
    return (
        <div className="shop-container">
            <Banner/>
            <Category/>
            <NewCollections/>
        </div>
    )
}
export default Shop;
import React from 'react';


import NewCollections from "../Components/NewCollections/NewCollections";

import Category from "../Components/Category/Category";
import Banner from "../Components/Banner/Banner";


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
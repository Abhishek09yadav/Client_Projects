import React from 'react';

import Popular from "../Components/Popular/Popular";

import NewCollections from "../Components/NewCollections/NewCollections";

import Category from "../Components/Category/Category";


const Shop = () => {
    return (
        <div className="shop-container">
            <Category/>
            <NewCollections/>
        </div>
    )
}
export default Shop;
import './RelatedProducts.css'
import React from 'react';
//import data_products from '../Assets/data'
import data_product from "../Assets/data";
import Item from "../item/item";

const RelatedProducts = () => {
    return (
        <div className={'RelatedProducts'}>
            <h1>Related Products</h1>
            <hr/>
            <div className="RelatedProducts-item">

                {data_product.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name}
                                 image={item.image} new_price={item.new_price}
                                 old_price={item.old_price}/>
                })}
            </div>
        </div>
    );
};

export default RelatedProducts;


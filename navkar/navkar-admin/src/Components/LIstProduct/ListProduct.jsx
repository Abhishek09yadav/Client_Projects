import React, {useEffect} from 'react';
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const url = import.meta.env.VITE_API_URL;

console.log(cross_icon);

function ListProduct(props) {


    const [allproducts, setAllProducts] = React.useState([]);
    const fetchInfo = async () => {
        await fetch(url);
        await fetch(`${url}/allproducts`)
            .then(res => res.json())
            .then(data => setAllProducts(data))
    }

    useEffect(() => {
        fetchInfo();
    }, []);
    const remove_product = async (id) => {
        await fetch(`${url}/removeProduct`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',

            },
            body: JSON.stringify({id: id}),

        })
        await fetchInfo();
    }
    return (<>
            <div className={'ListProduct'}>
                <h1>
                    All Products List
                </h1>
                <div className="ListProduct-format-main">
                    <p>Products</p><p>Title</p><p>Old Price</p><p>New Price</p><p>Category</p><p>Remove</p>
                </div>
                <div className="ListProduct-allproducts">
                    <hr/>

                    {allproducts.map((product, index) => (
                        <div key={index} className="ListProduct-format-main ListProduct-format">
                            <img src={product.image} alt="" className="ListProduct-product-icon"/>
                            <p>{product.name}</p>
                            <p>₹{product.old_price}</p>
                            <p>₹{product.new_price}</p>
                            <p>{product.category}</p>
                            <img className="ListProduct-remove-icon" src={cross_icon} onClick={() => {
                                remove_product(product.id)
                            }} alt=""/>

                        </div>))}


                </div>

            </div>
            <hr/>
        </>
    );
}

export default ListProduct;
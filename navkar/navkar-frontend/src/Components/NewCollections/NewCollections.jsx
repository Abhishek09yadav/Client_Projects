import React, {useEffect, useState} from 'react';
import './NewCollections.css'
import '../Category/Category.css'
import Item from "../item/item";
import Spinner from "../spinner/Spinner"


const NewCollections = () => {
    const [loading, setLoading] = useState(true);
    const [new_collections, setNewCollections] = React.useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${process.env.REACT_APP_API_URL}/newCollection`);
                const data = await res.json();
                setNewCollections([...data.slice(4, 8)])
            } catch (e) {
                console.log("error", e)
            } finally {
                setLoading(false)

            }
        };
        fetchData();
    }, [])
    // console.log('data from newcollections', new_collections);

    return (
        <div className={'NewCollections  mb-5 container-md '}>
            <h1 className={`text-white  text-center mb-3`}>Recent Products</h1>
            <hr/>
            {loading ? <Spinner paragraph={'Loading Recent Products'}/> : <div
                className="products-grid d-flex flex-wrap justify-content-xl-between justify-content-center gap-5 ">
                {new_collections.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                                 old_price={item.old_price} MOQ={item.MOQ} showCheckbox={false}/>
                })}
            </div>}
        </div>
    );
};

export default NewCollections;

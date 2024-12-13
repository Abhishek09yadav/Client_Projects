import React, {useEffect} from 'react';

import './Popular.css'
import data_product2 from "../Assets/data";
import Item from "../item/item";


const Popular = () => {
    const [data_product, setData_product] = React.useState([...data_product2.slice(0, 3)]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/popularInWomen`);

            // console.log('data from popular in women ->', data);
            const res = await data.json();
            setData_product((prevData) => [...res, ...data_product2.slice(0, 3)]);
        }
        fetchData();
    }, [])
    return (
        <div className={'Popular'}>
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className="popular-item">
                {data_product.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                                 old_price={item.old_price}/>
                })}
            </div>

        </div>
    );
};

export default Popular;

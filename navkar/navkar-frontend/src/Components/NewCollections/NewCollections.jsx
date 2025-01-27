import React, {useEffect} from 'react';
import './NewCollections.css'
import Item from "../item/item";


const NewCollections = () => {
    const [new_collections, setNewCollections] = React.useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/newCollection`);
            const data = await res.json();
            setNewCollections([...data.slice(4, 8)])

        };
        fetchData();
    }, [])
    // console.log('data from newcollections', new_collections);

    return (
        <div className={'NewCollections '}>
            <h1 className={`text-white`}>Recent Products</h1>
            <hr/>
            <div className="collections">
                {new_collections.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                                 old_price={item.old_price} MOQ={item.MOQ} showCheckbox={false}/>
                })}
            </div>
        </div>
    );
};

export default NewCollections;

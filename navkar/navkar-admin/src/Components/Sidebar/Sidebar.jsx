import React from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.css'
import add_product_icon from '../../assets/Product_Cart.svg'
import Product_list_icon from '../../assets/Product_list_icon.svg'
import UserList_icon from '../../assets/userList.png'
import Add_category_icon from '../../assets/category.png'

function Sidebar(props) {
    return (
        <div className="Sidebar">
            <Link to="/userlist" style={{textDecoration: 'none'}}>
                <div className="sidebar-item">
                    <img src={UserList_icon} alt=""/>
                    <p>User List</p>
                </div>
            </Link>
            <Link to="/addcategory" style={{textDecoration: 'none'}}>
                <div className="sidebar-item">
                    <img src={Add_category_icon} alt=""/>
                    <p>AddCategory</p>
                </div>
            </Link>
            <Link to="/addproduct" style={{textDecoration: 'none'}}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt=""/>
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to="/listproduct" style={{textDecoration: 'none'}}>
                <div className="sidebar-item">
                    <img src={Product_list_icon} alt=""/>
                    <p>Product List</p>
                </div>
            </Link>

        </div>
    );
}

export default Sidebar;
import React from 'react';
import './Admin.css'
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import {Route, Routes} from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct.jsx";
import ListProduct from "../../Components/LIstProduct/ListProduct.jsx";
import UserList from "../../Components/UserList/UserList.jsx";
import AddCategory from "../../Components/AddCategory/AddCategory.jsx";
import QuotationHistory from "../../Components/GeneratedQuotation/QuotationHistory.jsx";
import LoginSignup from "../../Components/LoginSignup/LoginSignup.jsx";
import UploadBanner from "../../Components/UploadBanner/UploadBanner.jsx";


function Admin(props) {
    return (
        <div className={'admin'}>
            <Sidebar/>

            <Routes>
                <Route path="/userlist" element={<UserList/>}/>
                <Route path="/login" element={<LoginSignup/>}/>
                {/*<Route path="/addproduct" element={<AddProduct/>}/>*/}
                <Route path="/" element={<AddProduct/>}/>
                <Route path="/listproduct" element={<ListProduct/>}/>
                <Route path="/addcategory" element={<AddCategory/>}/>
                <Route path={'/generatedquotation'} element={<QuotationHistory/>}/>
                <Route path={'/uploadbanner'} element={<UploadBanner/>}/>
            </Routes>
        </div>

    );
}

export default Admin;

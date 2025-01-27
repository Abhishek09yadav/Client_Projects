import './App.css';
import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import {HashRouter, Route, Routes} from "react-router-dom"; // Import HashRouter instead of BrowserRouter
import Shop from "./Pages/Shop";
// import 'bootstrap/dist/js/bootstrap.min.js';
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";
import QuotationHistory from "./Components/QuotationHistory/QuotationHistory";

function App() {
    return (
        <div className={`bg-dark`}>
            {/*<AlertProvider template={AlertTemplate} {...options}>*/}
            <HashRouter> {/* Replace BrowserRouter with HashRouter */}
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Shop/>}/>
                    <Route path='/product' element={<Product/>}>
                        <Route path=':productId' element={<Product/>}/>
                    </Route>
                    <Route path='/login' element={<LoginSignup/>}/>
                    <Route path='/quotationhistory' element={<QuotationHistory/>}/>
                </Routes>
                {/*<Footer/>*/}
            </HashRouter> {/* Replace BrowserRouter with HashRouter */}
            {/*</AlertProvider>*/}
        </div>
    );
}

export default App;
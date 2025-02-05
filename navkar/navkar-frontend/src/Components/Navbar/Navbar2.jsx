import React, {useContext} from 'react';
import "./mavbar.css"
import "./Navbar.css"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {ShopContext} from "../../Context/ShopContext";

const Navbar2 = () => {
    const {userDetails, setTriggerFetchingUserDetails} = useContext(ShopContext);
    console.log('token ->', localStorage.getItem('auth-token'));
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-md">
                <Link className="navbar-brand text-white" to={'/'}>Navkar E-Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end gap-5" id="navbarNav">
                    <ul className="navbar-nav gap-2">
                        <Link to={"https://urgent-nu.vercel.app/"} target={`_blank`}
                              className={`className="nav-item nav-link text-white vb-qtn-history`}>
                            Navkar Home
                        </Link>
                        <li className="nav-item nav-link text-white vb-qtn-history">
                            {userDetails ? (< Link to={'/quotationhistory'}>
                <span className="fw-bold text-white QuotationHistory" onClick={
                    () => {
                        setTriggerFetchingUserDetails((prev) => !prev);
                    }
                }>Quotation History
                </span>
                            </Link>) : (<li className=" text-white  " onClick={
                                () => {
                                    toast.warn("Please log in to continue.", {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                    });
                                }
                            }>Quotation History
                            </li>)}
                        </li>
                        <li className="nav-item">
                            {localStorage.getItem('auth-token') ? (
                                <a
                                    className="btn btn-dark rounded-3 text-white"

                                    onClick={() => {
                                        localStorage.removeItem('auth-token');
                                        window.location.replace('/');
                                    }}
                                >
                                    Logout
                                </a>
                            ) : (
                                <Link className="btn btn-dark rounded-3 text-white" to="/login">
                                    Login
                                </Link>
                            )}

                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar2;
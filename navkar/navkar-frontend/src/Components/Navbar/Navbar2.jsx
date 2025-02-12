import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {ShopContext} from '../../Context/ShopContext';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';
import './mavbar.css';

const homepageUrl = process.env.REACT_APP_HOME_PAGE_URL;

const Navbar2 = () => {
    const {userDetails, setTriggerFetchingUserDetails} = useContext(ShopContext);
    const isLoggedIn = !!localStorage.getItem('auth-token');

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        window.location.replace('/');
    };

    const handleQuotationClick = () => {
        if (userDetails) {
            setTriggerFetchingUserDetails(prev => !prev);
        } else {
            toast.warn('Please log in to continue.', {position: 'top-center', autoClose: 3000});
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-md">
                <Link className="navbar-brand text-white" to={'/'}>Navkar E-Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end gap-5" id="navbarNav">
                    <ul className="navbar-nav gap-2">
                        <Link className="nav-item nav-link text-white vb-qtn-history" to={homepageUrl}>Navkar
                            Home</Link>
                        <Link className="nav-item nav-link text-white   vb-qtn-history"
                              to={userDetails ? '/quotationhistory' : '#'} onClick={handleQuotationClick}>Quotation
                            History</Link>
                        <Link className="nav-item nav-link text-white   vb-qtn-history" to={`${homepageUrl}/about`}>About
                            Us</Link>
                        <Link className="nav-item nav-link text-white   vb-qtn-history" to={`${homepageUrl}/contact`}>Contact
                            Us</Link>
                        <Link className="nav-item nav-link text-white   vb-qtn-history"
                              to={`${homepageUrl}/service`}>Service</Link>
                        {isLoggedIn ? (
                            <button className="btn btn-dark rounded-3 text-white" onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link className="btn btn-dark rounded-3 text-white" to="/login">Login</Link>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar2;
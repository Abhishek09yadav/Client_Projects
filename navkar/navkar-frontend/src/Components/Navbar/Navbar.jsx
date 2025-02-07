import React, {useContext, useRef} from 'react';
import "./Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link} from "react-router-dom";
import {ShopContext} from "../../Context/ShopContext";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faSquareCaretRight} from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar(props) {
    const {userDetails, setTriggerFetchingUserDetails} = useContext(ShopContext);
    // const [menu, setmenu] = useState("shop");
    const menuRef = useRef();
    const scrollDown = () => {
        window.scrollBy(0, 110);
    }

    return <div className={`navbar`}>
        <div className="container-md p-0">
        <Link to={'/'} className="nav-logo " style={{textDecoration: 'none'}}>
            {/*<div className="ms">*/}

            {/*<img src={logo} alt="logo"/>*/}
            <p className={`m-0 p-0 text-white`}>Navkar E-Store</p>
            {/*</div>*/}
        </Link>
            <ul className="nav-login-cart">
            {userDetails ? (< Link to={'/quotationhistory'}>
                <span className="fw-bold text-white QuotationHistory" onClick={
                    () => {
                        setTriggerFetchingUserDetails((prev) => !prev);
                    }
                }>Quotation History
                </span>
            </Link>) : (<p className="QuotationHistory fw-bold text-white" onClick={
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
            </p>)}
            {
                localStorage.getItem('auth-token') ? <span onClick={() => {
                    localStorage.removeItem('auth-token');
                    window.location.replace('/');
                }} className="btn btn-secondary rounded-pill">Logout</span> : < Link to={'/login'}>
                    <p className=" fw-bold text-white" onClick={scrollDown}>Login</p>
                </Link>
            }
        </ul>
        </div>
    </div>;
}

export default Navbar;
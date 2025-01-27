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
    // const dropdown_toggle = (e) => {
    //     menuRef.current.classList.toggle('nav-menu-visible');
    //     e.target.classList.toggle('open');
    // }
    return <div className="navbar p-0">
        <Link to={'/'} className="nav-logo " style={{textDecoration: 'none'}}>
            {/*<div className="ms">*/}

            {/*<img src={logo} alt="logo"/>*/}
            <p className={`m-0 p-0 text-white ms-5`} style={{
                maxWidth: "0px 0px 0px 130px !important"
            }}>Navkar E-Store</p>
            {/*</div>*/}
        </Link>
        {/*<img onClick={dropdown_toggle} className={'nav-dropdown'} src={Hamburger_Menu} alt={''}/>*/}

        <ul ref={menuRef} className="nav-menu">
            {/*<li onClick={() => {*/}
            {/*    setmenu("shop")*/}
            {/*}}><Link to={'/'}>Shop</Link> {menu === 'shop' ? <hr/> : <></>}</li>*/}
            {/*<li onClick={() => setmenu('mens')}><Link to='/mens'>Men</Link> {menu === 'mens' ? <hr></hr> : <></>}*/}
            {/*</li>*/}
            {/*<li onClick={() => {*/}
            {/*    setmenu("womens")*/}
            {/*}}><Link to={'/womens'}>Women</Link> {menu === 'womens' ? <hr/> : <></>}*/}
            {/*</li>*/}
            {/*<li onClick={() => {*/}
            {/*    setmenu("kids")*/}
            {/*}}><Link to={'/kids'}>Kids</Link> {menu === 'kids' ? <hr/> : <></>}*/}
            {/*</li>*/}
        </ul>
        <ul className="nav-login-cart" style={{margin: "0px 86px 0px 0px !important"}}>
            {userDetails ? (< Link to={'/quotationhistory'}>
                <button type="button" className="btn  btn-secondary rounded-pill QuotationHistory" onClick={
                    () => {
                        setTriggerFetchingUserDetails((prev) => !prev);
                    }
                }>Quotation History
                </button>
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
                localStorage.getItem('auth-token') ? <button onClick={() => {
                    localStorage.removeItem('auth-token');
                    window.location.replace('/');
                }} type="button" className="btn btn-secondary rounded-pill">Logout</button> : < Link to={'/login'}>
                    <p className=" fw-bold text-white" onClick={scrollDown}>Login</p>
                </Link>
            }

            {/*<Link to='/cart'> <img src={cart_icon} alt="" className=""/>*/}

            {/*</Link>*/}
            {/*<div className="nav-cart-count">{getTotalCartItems()}</div>*/}
        </ul>


    </div>;
}

export default Navbar;
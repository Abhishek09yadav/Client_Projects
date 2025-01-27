import React, {useContext} from 'react';
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import {ShopContext} from '../../Context/ShopContext';

const Footer = () => {
    const {categoryRef} = useContext(ShopContext);
    const handleClick = () => {
        if (categoryRef.current) {
            categoryRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };
    return (
        <div className="footer">
            <div className={'footer-logo'}>
                <img src={footer_logo} alt={''}/>
                <p className={`m-0 p-0 text-white`}>Navkar</p>
            </div>


            <div>
                <ul className="footer-links">

                    <li><a className={`text-white text-decoration-none`} href="http://www.shrinavkar.co.in/Default.aspx"
                           target={"_blank"}>Company</a></li>

                    {/*<li>Products</li>*/}
                    <li className={`text-white text-decoration-none`} onClick={() => {
                        handleClick()
                    }}>Products
                    </li>

                    {/*<li>Offices</li>*/}
                    <li><a className={`text-white text-decoration-none`} href="http://www.shrinavkar.co.in/Aboutus.aspx"
                           target={"_blank"}>About</a></li>
                    <li><a className={`text-white text-decoration-none`} href="mailto:info@shrinavkar.co.in"
                           target={"_blank"}>mail us </a></li>
                    <li><a className={`text-white text-decoration-none`}
                           href="http://www.shrinavkar.co.in/Contactus.aspx" target="_blank">Contact us</a></li>


                </ul>

            </div>
            {/*<div className="footer-social-icons">*/}
            {/*<div className="footer-icons-containers">*/}
            {/*        <img src={instagram_icon} alt="instagram"/>*/}
            {/*    </div>*/}
            {/*    <div className="footer-icons-containers">*/}
            {/*        <img src={pinterest_icon} alt="instagram"/>*/}
            {/*    </div>*/}
            {/*    <div className="footer-icons-containers">*/}
            {/*    <a href="http://www.shrinavkar.co.in/Contactus.aspx" target="_blank"> <img src={whatsapp_icon} alt="instagram"/></a>*/}
            {/*</div>*/}

            {/*</div>*/}
            <div className="footer-copyright">
                <hr/>
                <p>Copyright @2025 - All Rights Reserved</p>
            </div>
        </div>

    );
};

export default Footer;

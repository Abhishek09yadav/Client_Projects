import React from 'react';
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className={'footer-logo'}>
                <img src={footer_logo} alt={''}/>
                <p>Navkar</p>
            </div>


            <div>
                <ul className="footer-links">

                    <li><a href="http://www.shrinavkar.co.in/Default.aspx" target={"_blank"}>Company</a></li>

                    {/*<li>Products</li>*/}
                    <li><a href="http://www.shrinavkar.co.in/Products.aspx" target={"_blank"}>Products</a></li>
                    {/*<li>Offices</li>*/}
                    <li><a href="http://www.shrinavkar.co.in/Aboutus.aspx" target={"_blank"}>About</a></li>
                    <li><a href="mailto:info@shrinavkar.co.in" target={"_blank"}>mail us </a></li>
                    <li><a href="http://www.shrinavkar.co.in/Contactus.aspx" target="_blank">Contact</a></li>


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

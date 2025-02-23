import React from 'react';
import PropTypes from 'prop-types';
// import style from "./first.module.css";
// import logo from "../public/images/thedb.png";
import "./common.css";
import "./ThirdForm.css"
// import ContactForm from "./ContactForm";
// import { useState } from "react";
// import SecondForm from "./SecondForm";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import textimage from "../public/images/text-image.png";

const ThirdForm = ({ setFormNumber }) => {
    return (<>


        <div className="content">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <h1>Thank you !</h1>
                    <p style={{color:"black"}}>Your form has been Submitted Successfully </p>
                    {/*<p>you should receive a confirmation email soon </p>*/}
                    <div className="third-form">
                        <DotLottieReact
                            src="https://lottie.host/a1d3f65f-bad1-4520-bb1b-938b042a49ed/7K0QszLdau.lottie"
                            loop
                            autoplay
                            className="form-submitted-logo"
                        />
                    </div>
                    <button className="go-home" onClick={() => {setFormNumber(0)}}>
                        Submit Again?
                    </button>
                </div>

            </div>
            <div className="text-image-holder">
                <img src={textimage} alt=""/>
            </div>
        </div>
    </>);
};
ThirdForm.propTypes = {
    setFormNumber: PropTypes.func.isRequired
};

export default ThirdForm;


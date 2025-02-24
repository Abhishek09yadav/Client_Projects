// import React from 'react';
// import style from "./first.module.css";
// import logo from "../public/images/thedb.png";
import "./common.css";
import "./ThirdForm.css";
// import ContactForm from "./ContactForm";
// import { useState } from "react";
// import SecondForm from "./SecondForm";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import textimage from "../public/images/text-image.png";

const ThirdForm = ({setFormNumber}) => {
    return (
        <>
            <div className="content">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        <h1 style={{color: 'red'}}>Something Went Wrong!</h1>
                        <p style={{color: "black"}}>Please Try Again</p>
                        {/*<p>you should receive a confirmation email soon </p>*/}
                        <div className="third-form">
                            <DotLottieReact
                                src="https://lottie.host/7ace620b-e267-4a7e-ac4e-08163fe57f4e/hRdSkAbURZ.lottie"
                                loop
                                autoplay
                            />
                        </div>
                        <button
                            className="go-home"
                            onClick={() => {
                                setFormNumber(0);
                            }}
                        >
                            Submit Again?
                        </button>
                    </div>
                </div>
                <div className="text-image-holder">
                    <img src={textimage} alt=""/>
                </div>
            </div>
        </>
    );
};

import PropTypes from "prop-types";

ThirdForm.propTypes = {
    setFormNumber: PropTypes.func.isRequired,
};

export default ThirdForm;

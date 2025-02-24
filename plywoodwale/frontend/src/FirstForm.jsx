import style from "./first.module.css";
import logo from "../public/images/logo.png";
import "./common.css";
import ContactForm from "./ContactForm";
import {useEffect, useState} from "react";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm.jsx";
import ErrorPage from "./ErrorPage";

const url = import.meta.env.VITE_API_URL;

const FirstForm = () => {
    const [formNumber, setFormNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
        youAre: "",
    });
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => {
                res.json();
                setLoading(true);
            })
            .then((data) => {
                console.log("server res:", data.message);
            })
            .catch((error) => {
                console.error("Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const contactDetails = (data) => {
        setDetails({
            name: data.name,
            mobile: data.mobile,
            email: da,
            address: "",
            youAre: "",
            // name: data.name,
            // email: data.email,
            // mobile: data.mobile,
            // address: data.address,
        });

        // Move to the next form
        setFormNumber(1);
    };

    const handleSecondForm = async (services, date, time) => {
        setDetails((prev) => ({
            ...prev,
            services: services,
            date: date,
            time: time,
        }));

        // Final submission
        const payload = {
            name: details.name,
            email: details.email,
            mobile: details.mobile || "Not Provided",
            address: details.address,
            services: services.join(", "),
            pickup_date: date || "Not Provided",
            pickup_time: time || "Not Provided",
        };


    };

    return (
        <div className={`${formNumber === 0 ? style.bgImage1 : style.bgImage2}`}>
            <div className="left">
                <img className={`${style.logo}`} src={logo} alt="logo"/>
                {formNumber === 0 ? (
                    <ContactForm setFormNumber={setFormNumber}/>
                ) : formNumber === 1 ? (
                    <SecondForm
                        handleSecondForm={handleSecondForm}
                        setFormNumber={setFormNumber}
                    />
                ) : formNumber === 2 ? (
                    <ThirdForm setFormNumber={setFormNumber}/>
                ) : formNumber === -1 ? (
                    <ErrorPage setFormNumber={setFormNumber}/>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default FirstForm;

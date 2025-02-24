import style from "./first.module.css";
import logo from "../public/images/thedb.png";
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
        email: "",
        mobile: "",
        address: "",
        services: [],
        date: "",
        time: "",
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
            email: data.email,
            mobile: data.mobile,
            address: data.address,
            services: [], // Reset services for the next form
            date: "",
            time: "",
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

        try {
            const response = await fetch(`${url}/submitform`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Form submission successful:", result);

                setFormNumber(2);

            }
        } catch (error) {
            setFormNumber(-1);
            console.error("Error occurred during form submission:", error);
            alert("An error occurred while submitting your order.");
        }
    };

    return (
        <div className={`${formNumber === 0 ? style.bgImage1 : style.bgImage2}`}>
            <div className="left">
                <img className={`${style.logo}`} src={logo} alt="logo"/>
                {formNumber === 0 ? (
                    <ContactForm
                        contactDetails={contactDetails}
                        setFormNumber={setFormNumber}
                    />
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

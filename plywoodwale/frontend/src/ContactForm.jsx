import {useState} from "react";
import PropTypes from "prop-types";
import style from "./first.module.css";
import "./common.css";
import {VscCircleLargeFilled} from "react-icons/vsc";
import textimage from "../public/images/text-image.png";

const url = import.meta.env.VITE_API_URL;

const ContactForm = ({setFormNumber}) => {
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        company: "",
        address: "",
        reference: "",
        youAre: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        // Basic email-like validation is not needed here, but ensure required fields are filled
        if (
            !formData.name ||
            !formData.whatsapp ||
            !formData.address ||
            !formData.youAre
        ) {
            alert("Please fill out all required fields.");
            return;
        }

        // You can add further validations as needed (for example, validating the whatsapp number)
        // call  the backed api
        try {
            const response = await fetch(`${url}/submitform`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
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
        <form onSubmit={handleSubmit}>
            <div style={{height: "30%"}}>
                <p className={`${style.font} m0`}>Fill contact details</p>
                <p className="m0">
                    <span className={`${style.font} m0`}>&</span>
                    <b className={`${style.font}`} style={{color: "yellow"}}>
                        Proceed
                    </b>
                </p>
                <p
                    className={`${style.font2}`}
                    style={{margin: "20px 0px"}}
                >
                    {/*The Dhobi’z is one of the most trusted solutions for all types of laundry services.*/}
                </p>
            </div>
            <div className="contact-form" style={{height: "70%"}}>
                <div className="form-group">
                    <label htmlFor="name">Your Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="whatsapp">WhatsApp Number*</label>
                    <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        placeholder="10-digit number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address*</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reference">Reference</label>
                    <input
                        type="text"
                        id="reference"
                        name="reference"
                        value={formData.reference}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="youAre">You are*</label>
                    <select
                        id="youAre"
                        name="youAre"
                        value={formData.youAre}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="End User">End User</option>
                        <option value="Architect/Interior Designer">
                            Architect/Interior Designer
                        </option>
                        <option value="Contractor">Contractor</option>
                    </select>
                </div>

                <div className="circles">
                    <VscCircleLargeFilled style={{color: "orange"}}/>
                    <VscCircleLargeFilled style={{color: "white"}}/>
                </div>

                <div className="pro-btn">
                    <button type="submit" className="proceed">
                        Proceed
                    </button>
                </div>
                {/*<div className="text-image-holder">*/}
                {/*    <img src={textimage} alt="Illustration" />*/}
                {/*</div>*/}
            </div>
        </form>
    );
};

ContactForm.propTypes = {
    contactDetails: PropTypes.func.isRequired,
};

export default ContactForm;

import { useState } from "react";
import PropTypes from 'prop-types';
import style from "./first.module.css";
import "./common.css";
import { VscCircleLargeFilled } from "react-icons/vsc";
import textimage from '../public/images/text-image.png'
const ContactForm = ({ contactDetails, setFormNumber }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Additional validation for email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    contactDetails(formData);
    setFormNumber(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          height: "30%",
        }}
      >
        <p className={`${style.font} m0`}>Fill contact details</p>
        <p className="m0">
          <span className={`${style.font} m0`}>&</span>
          <b className={`${style.font}`} style={{ color: "yellow" }}>
            Proceed
          </b>
        </p>
        <p
          className={`${style.font2} `}
          style={{
            margin: "20px 0px",
          }}
        >
          The Dhobi’z Is The One Of The Most Trusted Solution for all types of
          laundry services
        </p>
      </div>
      <div
        className="contact-form"
        style={{
          height: "70%",
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Your name</label>
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
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            cols="1"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="circles">
          <VscCircleLargeFilled style={{ color: "orange" }} />
          <VscCircleLargeFilled style={{ color: "white" }} />
        </div>

        <div className="pro-btn">
          <button type="submit" className="proceed">
            Proceed
          </button>
        </div>
        <div className="text-image-holder">
          <img src={textimage} alt="" />
        </div>
      </div>
    </form>
  );
};
ContactForm.propTypes = {
  contactDetails: PropTypes.func.isRequired,
  setFormNumber: PropTypes.func.isRequired,
};

export default ContactForm;


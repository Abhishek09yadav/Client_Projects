import { useState } from "react";
import style from "./first.module.css";
import "./common.css";
import { VscCircleLargeFilled } from "react-icons/vsc";

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
      <div>
        <p className={`${style.font}`}>Fill contact details</p>
        <p>
          <span className={`${style.font}`}>&</span>
          <b className={`${style.font}`} style={{ color: "yellow" }}>
            Proceed
          </b>
        </p>
        <p className={`${style.font2}`}>
          The Dhobi’z Is The One Of The Most Trusted Solution for all types of
          laundry services
        </p>
      </div>
      <div className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
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
            placeholder="Enter your mobile number"
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
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          ></textarea>
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
      </div>
    </form>
  );
};

export default ContactForm;

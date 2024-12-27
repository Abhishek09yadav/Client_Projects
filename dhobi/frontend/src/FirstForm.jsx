import style from "./first.module.css";
import logo from "../public/images/thedb.png";
import "./common.css";
import ContactForm from "./ContactForm";
import { useState } from "react";
import SecondForm from "./SecondForm";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ThirdForm from "./ThirdForm.jsx";
const url = import.meta.env.VITE_API_URL;

const FirstForm = () => {
  const [formNumber, setFormNumber] = useState(0);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    services: [],
    date: "",
    time: "",
  });

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

    // Final submission or next action
    const payload = {
      name: details.name,
      email: details.email,
      phone: details.mobile || "Not Provided",
      address: details.address,
      services: services.join(", "),
      pickup_date: date || "Not Provided",
      pickup_time: time || "Not Provided",
    };

    try {
      const response = await fetch(`${url}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submission successful:", result);

      } else {
        console.error("Form submission failed:", response);
        alert("Failed to submit your order. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
      alert("An error occurred while submitting your order.");
    }
  };

  return (
    <div className={`${formNumber === 0 ? style.bgImage1 : style.bgImage2}`}>
      <div className="left">
        <img className={`${style.logo}`} src={logo} alt="logo" />
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
        ):
            <ThirdForm
                setFormNumber={setFormNumber}
            /> }
      </div>
    </div>
  );
};

export default FirstForm;

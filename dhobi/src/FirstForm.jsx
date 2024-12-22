import style from "./first.module.css";
import logo from "../public/images/logo.png";
import "./common.css";
import ContactForm from "./ContactForm";
import { useState } from "react";
import SecondForm from "./SecondForm";

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
      access_key: "0bb57115-ac7e-4b69-9211-b11cc23e7f76", // Replace with your Web3Forms access key
      name: details.name,
      email: details.email,
      phone: details.mobile || "Not Provided", // Default value if undefined
      address: details.address,
      services: services.join(", "), // Convert services array to a string
      pickup_date: date || "Not Provided",
      pickup_time: time || "Not Provided",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submission successful:", result);
        alert("Order successfully submitted!");
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
        ) : (
          <SecondForm
            handleSecondForm={handleSecondForm}
            setFormNumber={setFormNumber}
          />
        )}
      </div>
    </div>
  );
};

export default FirstForm;

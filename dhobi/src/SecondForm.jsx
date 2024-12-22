import style from "./first.module.css";
import "./common.css";
import { useState } from "react";
import { VscCircleLargeFilled } from "react-icons/vsc";
import washAndIron from "../public/images/wi.png";
import washAndFold from "../public/images/wf.png";
import steamIron from "../public/images/sis.png";
import DryClean from "../public/images/dc.png";
import shoeClean from "../public/images/sc.png";
import curtain from "../public/images/cc.png";
import premium from "../public/images/pl.png";
import { MdOutlineDateRange, MdOutlineTimer } from "react-icons/md";

const SecondForm = ({ handleSecondForm, setFormNumber }) => {
  const [services, setServices] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const handleDateChange = (event) => {
    setPickupDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setPickupTime(event.target.value);
  };

  const setSelectedServices = (serviceName) => {
    setServices((prevServices) =>
      prevServices.includes(serviceName)
        ? prevServices.filter((service) => service !== serviceName)
        : [...prevServices, serviceName]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupDate || !pickupTime || services.length === 0) {
      alert("Please fill all fields and select at least one service.");
      return;
    }

    handleSecondForm(services, pickupDate, pickupTime);
    setFormNumber(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p className={`${style.font}`}>
          Submit <span style={{ color: "orange" }}> Order</span> Details
        </p>
        <p className={`${style.font2}`}>
          The Dhobi’z Is The One Of The Most trusted Solution for all types of
          laundry services
        </p>
      </div>
      <b
        style={{
          fontSize: "1.2em",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        Select Service{" "}
      </b>
      <div style={{ marginTop: "20px" }} className="contact-form">
        <div className="button-wrapper">
          {[
            { name: "WASH AND IRON", src: washAndIron },
            { name: "WASH AND FOLD", src: washAndFold },
            { name: "STEAM AND IRON", src: steamIron },
            { name: "DRY CLEANING", src: DryClean },
            { name: "SHOE CLEANING", src: shoeClean },
            { name: "CURTAIN CLEANING", src: curtain },
            { name: "PREMIUM LAUNDRY", src: premium },
          ].map((service) => (
            <div key={service.name}>
              <img
                className={`service-logo ${
                  services.includes(service.name) ? "selected" : ""
                }`}
                src={service.src}
                alt={service.name}
                onClick={() => setSelectedServices(service.name)}
              />
              <p className="logo-text">{service.name}</p>
            </div>
          ))}
        </div>

        <div className="pickup-form">
          <div className="form-group">
            <label htmlFor="pickupDate">Pickup Date</label>
            <div className="secondForm">
              <MdOutlineDateRange
                style={{
                  fontSize: "2.8em",
                  color: "white",
                }}
                className="icon-style"
              />
              <input
                type="date"
                id="pickupDate"
                value={pickupDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pickupTime">Pickup Time</label>
            <div className="secondForm">
              <MdOutlineTimer
                style={{
                  fontSize: "2.8em",
                  color: "white",
                }}
                className="icon-style"
              />
              <input
                type="time"
                id="pickupTime"
                value={pickupTime}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>

        <div className="circles">
          <VscCircleLargeFilled style={{ color: "orange" }} />
          <VscCircleLargeFilled style={{ color: "orange" }} />
        </div>

        <div className="pro-btn">
          <button type="submit" className="proceed">
            Generate Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default SecondForm;

import style from "./first.module.css";
import logo from "../public/images/logo.png";
import "./common.css";
import ContactForm from "./ContactForm";
import {useEffect, useState} from "react";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm.jsx";
import ErrorPage from "./ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css"
import Spinner from "./spinner/Spinner.jsx";

const url = import.meta.env.VITE_API_URL;

const FirstForm = () => {
    const [formNumber, setFormNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        studentName: "",
        whatsapp: "",
        guardianName: "",
        guardianPhone: "",
        guardianRelation: "",
        course:'',
        
        // second form details 
        hostelName: "",
        hostelType: "Select Hostel Type",
        idProofType: "Select ID Proof Type",
        idProof: "",
        roomNo: "",
        BookingDate: "",


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
 

    return (
        <div className={`${formNumber === 0 ? style.bgImage1 : style.bgImage2}`}>
            <div className="left w-100">
                <img className={`${style.logo}`} src={logo} alt="logo"
                     onClick={() => window.location.replace('/')}
                     style={{
                         cursor: 'pointer',
                         mixBlendMode: "lighten",
                         margin: "20px 0px"
                     }}/>
                {loading ? <Spinner paragraph={"Loading..."}/> :
                    formNumber === 0 ? (
                    <ContactForm setFormNumber={setFormNumber} details = {details} setDetails={setDetails}
                    />
                    )
                        : formNumber === 1 ? (
                        <SecondForm
                           setFormNumber={setFormNumber} details = {details} setDetails={setDetails}
                        />
                    )
                    : formNumber === 2 ? (
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

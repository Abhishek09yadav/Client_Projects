import { useState } from "react";
import PropTypes from "prop-types";
import {TextField, MenuItem, Button, Grid2} from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2"; // Correct import
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { RiWhatsappFill } from "react-icons/ri";
import { HiBuildingOffice, HiMiniUserGroup } from "react-icons/hi2";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./first.module.css";
import "./common.css";

const url = import.meta.env.VITE_API_URL;

const HostelAgreementForm = ({ setFormNumber }) => {
    const [formData, setFormData] = useState({
        studentName: "",
        guardianName: "",
        guardianRelation: "",
        whatsapp: "",
        bankAccountNumber: "",
        bankName: "",
        ifscCode: "",
        hostelName: "",
        hostelType: "Select Hostel Type",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.studentName ||
            !formData.guardianName ||
            !formData.guardianRelation ||
            !formData.whatsapp ||
            !formData.bankAccountNumber ||
            !formData.bankName ||
            !formData.ifscCode ||
            !formData.hostelName ||
            formData.hostelType === "Select Hostel Type"
        ) {
            alert("Please fill out all required fields.");
            return;
        }

        try {
            const response = await fetch(`${url}/submitHostelAgreement`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormNumber(2);
            }
        } catch (error) {
            console.log(error);
            setFormNumber(-1);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`d-flex gap-3 justify-content-md-start justify-content-center align-content-md-start align-items-center`}>
                <p className={`${style.font} m0 rubik-400`} style={{ margin: "20px 0px" }}>
                    Hostel Agreement Form
                </p>
            </div>

            <Grid2 container spacing={2}>
                {/* Student Name */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <FaUser className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="Student Name"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </Grid2>

                {/* Guardian Name */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <FaUser className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="Guardian Name"
                            name="guardianName"
                            value={formData.guardianName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </Grid2>

                {/* Guardian Relation */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <HiMiniUserGroup className="m-2" />
                        <TextField
                            select
                            fullWidth
                            label=""
                            name="guardianRelation"
                            value={formData.guardianRelation}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Father">Father</MenuItem>
                            <MenuItem value="Mother">Mother</MenuItem>
                            <MenuItem value="Legal Guardian">Legal Guardian</MenuItem>
                        </TextField>
                    </div>
                </Grid2>

                {/* WhatsApp Number */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <RiWhatsappFill className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="10-digit WhatsApp Number"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            inputProps={{ pattern: "[0-9]{10}" }}
                            required
                        />
                    </div>
                </Grid2>

                {/* Bank Account Number */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <HiBuildingOffice className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="Bank Account Number"
                            name="bankAccountNumber"
                            value={formData.bankAccountNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </Grid2>

                {/* Bank Name */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <HiBuildingOffice className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="Bank Name"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </Grid2>

                {/* IFSC Code */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <HiBuildingOffice className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="IFSC Code"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </Grid2>

                {/* Hostel Name */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <FaLocationDot className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="Hostel Name"
                            name="hostelName"
                            value={formData.hostelName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </Grid2>

                {/* Hostel Type */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <HiMiniUserGroup className="m-2" />
                        <TextField
                            select
                            fullWidth
                            label=""
                            name="hostelType"
                            value={formData.hostelType}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Select Hostel Type">Select Hostel Type</MenuItem>
                            <MenuItem value="Boys Hostel">Boys Hostel</MenuItem>
                            <MenuItem value="Girls Hostel">Girls Hostel</MenuItem>
                        </TextField>
                    </div>
                </Grid2>

                {/* Submit Button */}
                <Grid2 xs={12}>
                    <Button fullWidth variant="contained" type="submit">
                        Submit Form
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

HostelAgreementForm.propTypes = {
    setFormNumber: PropTypes.func.isRequired,
};

export default HostelAgreementForm;
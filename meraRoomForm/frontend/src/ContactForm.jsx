// import { useState } from "react";
import PropTypes from "prop-types";
// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import {
    TextField,
    MenuItem,
    Button,
    // Accordion,
    // AccordionSummary,
    // AccordionDetails,
    // Typography,
} from "@mui/material";
import Grid2 from '@mui/material/Grid2'
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaUser } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import { PiStudentFill  } from "react-icons/pi";
// import { HiOfficeBuilding } from "react-icons/hi";


import {  HiMiniUserGroup } from "react-icons/hi2";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./first.module.css";



const HostelAgreementForm = ({ setFormNumber, details, setDetails }) => {


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !details.studentName ||
            !details.whatsapp ||
            !details.guardianName ||
            !details.guardianPhone ||
            !details.guardianRelation === 'Guardian Relation?' ||
            !details.course
        ) {
            console.log("details ",details);
            alert("Please fill out all required fields.");
            return;
        }
        setFormNumber(1);
    
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`d-flex gap-3 justify-content-md-start justify-content-center align-content-md-start align-items-center`}>
                <p className={`${style.font} m0 rubik-400`} style={{ margin: "20px 0px" }}>
                    Hostel Agreement Form
                </p>
            </div>

            <Grid2 className=' d-flex flex-column w-50 justify-content-center' container spacing={2}>
                {/* Student Name */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <PiStudentFill   className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="Student Name"
                            name="studentName"
                            value={details.studentName}
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
                            value={details.guardianName}
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
                            placeholder="Guardian Relation"
                            value={details.guardianRelation || "Guardian Relation?"} // Default to "Father"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Guardian Relation?">Guardian Relation?</MenuItem>
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
                            value={details.whatsapp}
                            onChange={handleChange}
                            inputProps={{ pattern: "[0-9]{10}" }}
                            required
                        />
                    </div>
                </Grid2>
                    {/* Guardian Number */}
                     <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <RiWhatsappFill className="m-2" />
                        <TextField
                            fullWidth
                            label=""
                            placeholder="10-digit WhatsApp Number"
                            name="guardianPhone"
                            value={details.guardianPhone}
                            onChange={handleChange}
                            inputProps={{ pattern: "[0-9]{10}" }}
                            required
                        />
                    </div>
                </Grid2>
               {/* Course */}
                <Grid2 xs={12} md={6}>
                    <div className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <HiMiniUserGroup className="m-2" />
                        <TextField
                            select
                            fullWidth
                            label=""
                            name="course"
                            placeholder="Course"
                            value={details.course|| "Course?"} // Default to "Father"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Course?">Course?</MenuItem>
                            <MenuItem value="JEE">JEE</MenuItem>
                            <MenuItem value="NEET">NEET</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </div>
                </Grid2>

           
     {/* Submit Button */}
     <Grid2 xs={12}>
                    <Button fullWidth size="large" variant="contained" type="submit">
                        Continue
                    </Button>
                </Grid2>
             

              
            </Grid2>
        </form>
    );
};

HostelAgreementForm.propTypes = {
    setFormNumber: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
    setDetails: PropTypes.func.isRequired,
};

export default HostelAgreementForm;
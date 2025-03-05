import { useState } from "react";
import PropTypes from "prop-types";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    TextField,
    MenuItem,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import Grid2 from '@mui/material/Grid2'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaUser } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import { PiStudentFill  } from "react-icons/pi";
import { RiBankLine } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";


import { HiBuildingOffice, HiMiniUserGroup } from "react-icons/hi2";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./first.module.css";

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
            !formData.guardianRelation === 'Guardian Relation ?' ||
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
                        <PiStudentFill   className="m-2" />
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
                            placeholder="Guardian Relation"
                            value={formData.guardianRelation || "Guardian Relation ?"} // Default to "Father"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Guardian Relation ?">Guardian Relation ?</MenuItem>
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
                        <FaCreditCard className="m-2" />
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
                        <RiBankLine className="m-2" />
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
                        <FaCcMastercard className="m-2" />
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
                        <HiBuildingOffice className="m-2" />
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
                        <HiOfficeBuilding className="m-2" />
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

                {/* Agreement Accordion */}
                <Grid2 xs={12} md={6} lg={5} mx="auto">
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Hostel Agreement Terms</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>The refund of the security deposit will be made to the student&apos;s *father, mother, or legal guardian&apos;s* bank account. The student must provide proper bank details and identification proof.</li>
                                    <li>In case of any complaints regarding the refund of the security deposit, students/parents can contact the Hostel Association. If a valid complaint is raised, the district administration will take necessary action against the hostel.</li>
                                    <li>This Easy Exit Policy applies only to hostels registered under the *Mera Room* and approved by the *district administration*.</li>
                                    <li>If a student damages hostel property or equipment or property of other student, they will be responsible for compensating for the damage. A minimum fine of ₹1000 will be imposed, along with necessary corrective action.</li>
                                    <li>Parents or guardians must accompany students during hostel admission. Only *male guardians* (father or brother) are allowed in boys&apos; hostels, and only *female guardians* (mother or sister) are allowed in girls&apos; hostels.</li>
                                    <li>If a student wishes to change their hostel due to personal reasons, they will be responsible for the financial implications. The hostel management will not bear any costs related to shifting.</li>
                                    <li>*The use of electrical appliances like heating rods, room heaters, and gas stoves is strictly prohibited.* If any of these appliances are found, a *fine of ₹5000 will be imposed*, and the student must vacate the hostel room.</li>
                                    <li>If a student is absent for more than *30 days without prior notice*, their room will be considered vacant, and the hostel management has the right to allot it to another student.</li>
                                    <li>In case of any emergency (such as a medical situation), hostel management must be informed immediately. The hostel management will not bear any medical expenses; students will be responsible for their own treatment costs.</li>
                                    <li>For female students: If a female student faces any issue or problem, it must be reported to the hostel warden. Parents must also be informed in such cases.</li>
                                    <li>Students must *register their entry using a biometric machine at the hostel entrance.* If a student fails to enter using biometric registration, the hostel management will not be responsible for their safety. This system is implemented for *security purposes*.</li>
                                    <li>Students leaving the hostel in the middle of the session must inform the hostel management in writing one month in advance.</li>
                                    <li>The student will be responsible for the safety of their personal belongings. The hostel management will not be responsible for any loss or theft.</li>
                                    <li>Students must enter the hostel before the scheduled deadline in the evening. In case of delay, they must inform the hostel management in advance.</li>
                                    <li>In case of any complaints related to the hostel, the student must first inform the hostel management. If the issue is not resolved, they can contact the Mera Room.</li>
                                    <li>The entry of outsiders into the hostel without prior permission is strictly prohibited. If found, respected parents will be informed.</li>
                                    <li>Any dispute will be resolved within the jurisdiction of Kota.</li>
                                    <li>*Note:* The student and the hostel management must follow the above rules and conditions within 24 hours of admission. In case of any dispute regarding these rules, the final decision will be made by the District Collector, Kota, and the Kota Hostel Association.</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid2>

                
                <Grid2 xs={12}>
                <FormGroup>
                <FormControlLabel required control={<Checkbox />} label="I agree to all above terms and conditions" />
                </FormGroup>
                </Grid2>
                {/* Submit Button */}
                <Grid2 xs={12}>
                    <Button fullWidth size="large" variant="contained" type="submit">
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
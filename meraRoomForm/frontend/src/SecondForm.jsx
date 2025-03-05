
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
// import { HiOfficeBuilding } from "react-icons/hi";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./first.module.css";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const url = import.meta.env.VITE_API_URL;
import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { HiIdentification } from "react-icons/hi2";
import { PiIdentificationCardFill } from "react-icons/pi";
import { MdOutlineBedroomChild } from "react-icons/md";

const SecondForm = ({ setFormNumber, details, setDetails }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!details.hostelName || !details.hostelType || !details.idProofType || !details.idProof || !details.roomNo || !details.BookingDate) {
            alert("Please fill out all required fields.");
            return;
        }
        setFormNumber(2)
        try {
            const response = await fetch(`${url}/submitHostelAgreement`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(details),
            });
            if (response.ok) {
                setFormNumber(2);
            }
        } catch (error) {
            console.error(error);
            setFormNumber(-1);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h5" className={style.font} gutterBottom>
                    Submit <span style={{ color: "orange" }}> Form</span> Details
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} md={6} className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                             <FaBuilding className="m-2" />
                        <TextField fullWidth  placeholder="Hostel Name" name="hostelName" value={details.hostelName} onChange={handleChange} required />
                    </Grid2>
                    <Grid2 xs={12} md={6} className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                    <HiMiniBuildingOffice2 className="m-2" />
                        <TextField  select fullWidth name="hostelType" value={details.hostelType ||  "Select Hostel Type"} onChange={handleChange}
                         required>
                            <MenuItem value="Select Hostel Type">Select Hostel Type</MenuItem>
                            <MenuItem value="Boys Hostel">Boys Hostel</MenuItem>
                            <MenuItem value="Girls Hostel">Girls Hostel</MenuItem>
                        </TextField>
                    </Grid2 >
                    <Grid2 xs={12} md={6} className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                    <HiIdentification className="m-2" />
                    <TextField  select  fullWidth name="idProofType" value={details.idProofType || "Select ID Proof Type"} onChange={handleChange} required >
                            <MenuItem value="Select ID Proof Type">Select ID Proof Type</MenuItem>
                            <MenuItem value="Aadhaar Card">Aadhaar Card</MenuItem>
                            <MenuItem value="PAN Card">PAN Card</MenuItem>
                        </TextField>
                    </Grid2>
                    <Grid2 xs={12} md={6} className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                    <PiIdentificationCardFill className="m-2" />
                        <TextField  fullWidth placeholder="ID Proof" name="idProof" value={details.idProof} onChange={handleChange} required />
                    </Grid2>
                    <Grid2 xs={12} md={6} className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                    <MdOutlineBedroomChild className="m-2" />       <TextField  fullWidth placeholder="Room No" name="roomNo" value={details.roomNo} onChange={handleChange} required />
                    </Grid2>
                    <Grid2 xs={12} md={6} className={`bg-white text-dark d-flex flex-row align-items-center`} style={{ borderRadius: "5px" }}>
                        <DatePicker   value={dayjs(details.BookingDate)} onChange={(newValue) => setDetails((prev) => ({ ...prev, BookingDate: newValue }))} required />
                    </Grid2>
                    <Grid2 xs={12}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Hostel Agreement Terms</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <ul>
                                        <li>Security deposit will be refunded to a legal guardian&apos;s account.</li>
                                        <li>Complaints about refunds should be addressed to the Hostel Association.</li>
                                        <li>Appliances like heaters and stoves are prohibited, with a ₹5000 fine if found.</li>
                                        <li>Biometric entry registration is mandatory.</li>
                                    </ul>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid2>
                    <Grid2 xs={12}>
                        <FormGroup>
                            <FormControlLabel required control={<Checkbox />} label="I agree to all terms and conditions" />
                        </FormGroup>
                    </Grid2>
                    <Grid2 xs={12}>
                        <Button fullWidth size="large" variant="contained" type="submit">Submit Form</Button>
                    </Grid2>
                </Grid2>
            </form>
        </LocalizationProvider>
    );
};

SecondForm.propTypes = {
    setFormNumber: PropTypes.func.isRequired,
    details: PropTypes.shape({
        hostelName: PropTypes.string.isRequired,
        hostelType: PropTypes.string.isRequired,
        idProofType: PropTypes.string.isRequired,
        idProof: PropTypes.string.isRequired,
        roomNo: PropTypes.string.isRequired,
        BookingDate: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
    }).isRequired,
    setDetails: PropTypes.func.isRequired,
};

export default SecondForm;

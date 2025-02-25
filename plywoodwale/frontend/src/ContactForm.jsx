import {useState} from "react";
import PropTypes from "prop-types";
import {TextField, MenuItem, Button, Grid2} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css"
import style from "./first.module.css";
import "./common.css";

const url = import.meta.env.VITE_API_URL;

const ContactForm = ({setFormNumber}) => {
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        company: "",
        address: "",
        reference: "",
        youAre: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.whatsapp || !formData.address || !formData.youAre) {
            alert("Please fill out all required fields.");
            return;
        }

        try {
            const response = await fetch(`${url}/submitform`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormNumber(2);
            }
        } catch (error) {
            setFormNumber(-1);
            alert("An error occurred while submitting your order.");
        }
    };


    return (
        <form onSubmit={handleSubmit}>

            <div
                className={`d-flex gap-3  justify-content-md-start justify-content-center align-content-md-start align-items-center`}>

                <p className={`${style.font} m0 rubik-400 `} style={{margin: "20px 0px"}}>
                    Fill contact details
                </p>
            </div>

            <Grid2 container spacing={2}>
                <div
                    className={`text-dark w-100 d-flex gap-3 flex-md-row  flex-column justify-content-md-start justify-content-center align-content-md-start align-items-center`}>
                    <Grid2 xs={12} className={`bg-white text-dark w-50`} id={"responsive"} sx={{
                        borderRadius: "5px",
                        '& .MuiInputLabel-root': {color: 'navy'},
                        '& .MuiInputLabel-root.Mui-focused': {color: 'cyan'}
                    }}>
                        <TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange}
                                   required/>
                    </Grid2>

                    <Grid2 xs={12} className={`bg-white text-dark w-50`} id={"responsive"} sx={{
                        borderRadius: "5px",
                        '& .MuiInputLabel-root': {color: 'navy'},
                        '& .MuiInputLabel-root.Mui-focused': {color: 'cyan'}
                    }}>
                        <TextField
                            fullWidth
                            label="WhatsApp Number"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            inputProps={{pattern: "[0-9]{10}"}}
                            placeholder="10-digit number"
                            required
                        />
                    </Grid2>
                </div>
                <div
                    className={`text-dark w-100 d-flex gap-3 flex-md-row  flex-column justify-content-md-start justify-content-center align-content-md-start align-items-center`}>
                    <Grid2 xs={12} className={`bg-white text-dark w-50`} id={"responsive"} sx={{
                        background: "white",
                        color: "black",
                        width: "45%",
                        borderRadius: "5px",
                        '& .MuiInputLabel-root': {color: 'navy'},
                        '& .MuiInputLabel-root.Mui-focused': {color: 'cyan'}
                    }}>
                        <TextField fullWidth label="Company" name="company" value={formData.company}
                                   onChange={handleChange}/>
                    </Grid2>
                    <Grid2 xs={12} className={`bg-white text-dark w-50`} id={"responsive"} sx={{
                        background: "white",
                        color: "black",
                        width: "45%",
                        borderRadius: "5px",
                        '& .MuiInputLabel-root': {color: 'navy'},
                        '& .MuiInputLabel-root.Mui-focused': {color: 'cyan'}
                    }}>
                        <TextField select fullWidth label="You are" name="youAre" value={formData.youAre}
                                   onChange={handleChange} required>
                            <MenuItem value="">Select Role</MenuItem>
                            <MenuItem value="End User">End User</MenuItem>
                            <MenuItem value="Architect/Interior Designer">Architect/Interior Designer</MenuItem>
                            <MenuItem value="Contractor">Contractor</MenuItem>
                        </TextField>
                    </Grid2>
                </div>
                <div
                    className={`text-dark w-100 d-flex gap-3 flex-md-row  flex-column justify-content-md-start justify-content-center align-content-md-start align-items-center`}>
                    <Grid2 xs={12} className={`bg-white text-dark w-50`} id={"responsive"} sx={{
                        background: "white",
                        color: "black",
                        width: "45%",
                        borderRadius: "5px",
                        '& .MuiInputLabel-root': {color: 'navy'},
                        '& .MuiInputLabel-root.Mui-focused': {color: 'cyan'}
                    }}>
                        <TextField fullWidth multiline rows={3} label="Address" name="address" value={formData.address}
                                   onChange={handleChange} required/>
                    </Grid2>


                    <Grid2 xs={12} className={`bg-white text-dark w-50`} id={"responsive"} sx={{
                        background: "white",
                        color: "black",
                        width: "45%",
                        height: "fit-content",
                        borderRadius: "5px",
                        '& .MuiInputLabel-root': {color: 'navy'},
                        '& .MuiInputLabel-root.Mui-focused': {color: 'cyan'}
                    }}>
                        <TextField fullWidth label="Reference" name="reference" value={formData.reference}
                                   onChange={handleChange}/>
                    </Grid2>

                </div>
                <div
                    className={`text-dark w-100 d-flex gap-3 flex-md-row  flex-column justify-content-md-start justify-content-center align-content-md-start align-items-center`}>
                    <Grid2 xs={12} id={"responsive"} sx={{
                        width: "100%",
                    }}>
                        <Button fullWidth variant="contained" type="submit">
                            Submit Form
                        </Button>
                    </Grid2>
                </div>
            </Grid2>
        </form>
    );
};

ContactForm.propTypes = {
    setFormNumber: PropTypes.func.isRequired,
};

export default ContactForm;

import React, {useState} from "react";
import {Box, FormControl, IconButton, InputLabel, MenuItem, Select, Tab, Tabs, TextField,} from "@mui/material";
import axios from 'axios';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {FaRegTrashCan} from "react-icons/fa6";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// const VITE_API_URL = import.meta.env.VITE_API_URL;
 const VITE_API_URL ='ca0796eb7254590f944767a4a3462d33'
console.log('Mindee api',VITE_API_URL);

const indianStates = [
    "ANDHRA PRADESH", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHHATTISGARH", "GOA", "GUJARAT", "HARYANA",
    "HIMACHAL PRADESH", "JHARKHAND", "KARNATAKA", "KERALA", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR",
    "MEGHALAYA", "MIZORAM", "NAGALAND", "ODISHA", "PUNJAB", "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TELANGANA",
    "TRIPURA", "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL",
];

const initialTravelerState = {
    passportFront: null,
    passportBack: null,
    formData: {
        passportNumber: "",
        givenName: "",
        surname: "",
        sex: "",
        dateOfBirth: null,
        placeOfBirth: "",
        issueDate: null,
        expiryDate: null,
        issuePlace: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        city: "",
        pincode: "",
        mobile: "",
        email: "",
    },
    loading: false,
    error: "",
};

const PassportForm = () => {
    const [travelers, setTravelers] = useState([initialTravelerState]);
    const [tabValue, setTabValue] = useState(0);
    const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    const [formid, setFormid] = useState();

    const handleTabChange = (_, newValue) => setTabValue(newValue);

    const handleAddTab = () => {
        setTravelers([...travelers, initialTravelerState]);
        setTabValue(travelers.length);
    };

    const handleDeleteTab = (index) => {
        if (index === 0) return;
        const newTravelers = travelers.filter((_, i) => i !== index);
        setTravelers(newTravelers);
        setTabValue(tabValue >= index ? tabValue - 1 : tabValue);
    };
    const fetchPassportData= async(id) =>{
        try {

            return await axios.get(`https://api.mindee.net/v1/products/mindee/ind_passport/v1/documents/queue/${id}`, {
                headers: {
                    'Authorization': `Token ${VITE_API_URL}`,
                }
            });
        } catch (error) {
            console.error('Error fetching data:', response);
            return error
        }
    }
    const pollForResult = async (id, interval = 2000, maxAttempts = 10) => {
        let attempts = 0;
        while (attempts < maxAttempts) {
            const response = await fetchPassportData(id);
            if (response?.data?.job?.status === "completed") {
                return response;
            }
            attempts++;
            await new Promise(resolve => setTimeout(resolve, interval));
        }
        throw new Error("Job did not complete in time");
    };

    const handleImageUpload = async (e, index, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Update the image in the state
                const updatedTravelers = travelers.map((traveler, i) =>
                    i === index ? { ...traveler, [type === "front" ? "passportFront" : "passportBack"]: reader.result } : traveler
                );
                setTravelers(updatedTravelers);
                console.log("Image uploaded and state updated:", updatedTravelers[index]);
            };
            reader.readAsDataURL(file);

            try {
                const formData = new FormData();
                formData.append("document", file);

                const response = await axios.post(
                    "https://api.mindee.net/v1/products/mindee/ind_passport/v1/predict_async",
                    formData,
                    {
                        headers: {
                            Authorization: `Token ${VITE_API_URL}`,
                        },
                    }
                );
                console.log("Job ID:", response.data.job.id);

                const completeData = await pollForResult(response.data.job.id);
                console.log("Complete Data:", completeData.data);

                // Extract relevant data from the API response
                const apiData = completeData.data.document.inference.prediction;

                // Update the form fields with the extracted data
                setTravelers((prevTravelers) =>
                    prevTravelers.map((traveler, i) =>
                        i === index
                            ? {
                                ...traveler, // Preserve existing traveler data
                                formData: {
                                    ...traveler.formData, // Preserve existing form data
                                    givenName: apiData.given_names?.value || "",
                                    surname: apiData.surname?.value || "",
                                    sex: apiData.gender?.value || "",
                                    dateOfBirth: apiData.birth_date?.value ? new Date(apiData.birth_date.value) : null,
                                    placeOfBirth: apiData.birth_place?.value || "",
                                    issueDate: apiData.issuance_date?.value ? new Date(apiData.issuance_date.value) : null,
                                    expiryDate: apiData.expiry_date?.value ? new Date(apiData.expiry_date.value) : null,
                                    issuePlace: apiData.issuance_place?.value || "",
                                    addressLine1: apiData.address1?.value || "",
                                    addressLine2: apiData.address2?.value || "",
                                    state: apiData.address3?.value?.split(",")[1]?.trim() || "",
                                    city: apiData.address3?.value?.split(",")[0]?.trim() || "",
                                    pincode: apiData.address3?.value?.split(",")[2]?.trim() || "",
                                },
                                // Explicitly preserve the image data
                                passportFront: traveler.passportFront,
                                passportBack: traveler.passportBack,
                            }
                            : traveler
                    )
                );

                console.log("Form data updated with API response:", travelers[index]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };



    const handleDeleteImage = (index, type) => {
        setTravelers(travelers.map((traveler, i) =>
            i === index ? { ...traveler, [type === "front" ? "passportFront" : "passportBack"]: null } : traveler
        ));
    };

    const handleFormChange = (index, field, value) => {
        setTravelers(travelers.map((traveler, i) =>
            i === index ? { ...traveler, formData: { ...traveler.formData, [field]: value } } : traveler
        ));
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <div className="p-4">
            <Box className="flex justify-center mb-8">
                <div className="date-range-picker-container">
                    <div className="flex justify-end mb-2.5">
                        <div className="text-right w-1/2">
                            <label className="font-bold text-lg">Tentative Departure Date</label>
                        </div>
                        <div className="text-center w-1/2">
                            <label className="font-bold text-lg">Tentative Return Date</label>
                        </div>
                    </div>
                    <DateRangePicker
                        onChange={item => setDateRange([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={dateRange}
                        direction="horizontal"
                        minDate={tomorrow}
                        showDateDisplay={false}
                        rangeColors={['#3b82f6']}
                        editableDateInputs={true}
                        staticRanges={[]} // Remove static ranges like "today", "yesterday", etc.
                        inputRanges={[]} // Remove input ranges like "days up to today", "days starting today", etc.
                    />
                </div>
            </Box>

            <Box className="w-full bg-white">
                <Tabs value={tabValue} onChange={handleTabChange} centered textColor="primary" selectionFollowsFocus>
                    {travelers.map((_, index) => (
                        <Tab
                            key={index}
                            label={
                                <Box className="flex items-center">
                                    {`Traveller ${index + 1}`}
                                    {index !== 0 && (
                                        <IconButton size="small" onClick={() => handleDeleteTab(index)} className="ml-1">
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                            }
                        />
                    ))}
                    <IconButton onClick={handleAddTab} className="ml-1">
                        <AddIcon />
                    </IconButton>
                </Tabs>
            </Box>

            <div className="flex flex-col md:flex-row items-start justify-center p-6">
                <div className="w-full md:w-1/4 flex flex-col items-center space-y-4">
                    {travelers[tabValue] && (
                        <>
                            <div className="w-full relative">
                                <label className="block text-gray-700 font-bold mb-2">Upload Passport Front:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, tabValue, "front")}
                                    className="w-full border p-2"
                                />
                                {travelers[tabValue].passportFront && (
                                    <div className="relative">
                                        <img
                                            src={travelers[tabValue].passportFront}
                                            alt="Passport Front"
                                            className="mt-4 w-3/4"
                                        />
                                        <button
                                            onClick={() => handleDeleteImage(tabValue, "front")}
                                            className="absolute top-0 left-0 text-red-600 text-3xl p-1 bg-white rounded-full border-2 border-white hover:bg-gray-200"
                                        >
                                            <FaRegTrashCan />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="w-full relative">
                                <label className="block text-gray-700 font-bold mb-2">Upload Passport Back:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, tabValue, "back")}
                                    className="w-full border p-2"
                                />
                                {travelers[tabValue].passportBack && (
                                    <div className="relative">
                                        <img
                                            src={travelers[tabValue].passportBack}
                                            alt="Passport Back"
                                            className="mt-4 w-3/4"
                                        />
                                        <button
                                            onClick={() => handleDeleteImage(tabValue, "back")}
                                            className="absolute top-0 left-0 text-red-600 text-3xl p-1 bg-white rounded-full border-2 border-white hover:bg-gray-200"
                                        >
                                            <FaRegTrashCan />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <div className="w-1/2 md:w-1/2 px-4">
                    {travelers[tabValue] && (
                        <>
                            <h2 className="text-xl font-bold mb-4">Traveler&#39;s Basic Details</h2>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <TextField
                                    label="Given Name"
                                    value={travelers[tabValue].formData.givenName}
                                    onChange={(e) => handleFormChange(tabValue, "givenName", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Surname"
                                    value={travelers[tabValue].formData.surname}
                                    onChange={(e) => handleFormChange(tabValue, "surname", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <FormControl fullWidth required>
                                    <InputLabel>Sex</InputLabel>
                                    <Select
                                        value={travelers[tabValue].formData.sex}
                                        onChange={(e) => handleFormChange(tabValue, "sex", e.target.value)}
                                        label="Sex"
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date of Birth"
                                        value={travelers[tabValue].formData.dateOfBirth ? dayjs(travelers[tabValue].formData.dateOfBirth) : null}
                                        onChange={(newValue) => handleFormChange(tabValue, "dateOfBirth", newValue ? newValue.toDate() : null)}
                                        slotProps={{ textField: { fullWidth: true, required: true } }}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    label="Place of Birth"
                                    value={travelers[tabValue].formData.placeOfBirth}
                                    onChange={(e) => handleFormChange(tabValue, "placeOfBirth", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Passport Issue Date"
                                        value={travelers[tabValue].formData.issueDate ? dayjs(travelers[tabValue].formData.issueDate) : null}
                                        onChange={(newValue) => handleFormChange(tabValue, "issueDate", newValue ? newValue.toDate() : null)}
                                        slotProps={{ textField: { fullWidth: true, required: true } }}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Passport Expiry Date"
                                        value={travelers[tabValue].formData.expiryDate ? dayjs(travelers[tabValue].formData.expiryDate) : null}
                                        onChange={(newValue) => handleFormChange(tabValue, "expiryDate", newValue ? newValue.toDate() : null)}
                                        slotProps={{ textField: { fullWidth: true, required: true } }}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    label="Passport Issue Place"
                                    value={travelers[tabValue].formData.issuePlace}
                                    onChange={(e) => handleFormChange(tabValue, "issuePlace", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Current Address Line 1"
                                    value={travelers[tabValue].formData.addressLine1}
                                    onChange={(e) => handleFormChange(tabValue, "addressLine1", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Current Address Line 2"
                                    value={travelers[tabValue].formData.addressLine2}
                                    onChange={(e) => handleFormChange(tabValue, "addressLine2", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <FormControl fullWidth required>
                                    <InputLabel>State</InputLabel>
                                    <Select
                                        value={travelers[tabValue].formData.state}
                                        onChange={(e) => handleFormChange(tabValue, "state", e.target.value)}
                                        label="State"
                                    >
                                        {indianStates.map((state) => (
                                            <MenuItem key={state} value={state}>
                                                {state}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="City"
                                    value={travelers[tabValue].formData.city}
                                    onChange={(e) => handleFormChange(tabValue, "city", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Pincode"
                                    value={travelers[tabValue].formData.pincode}
                                    onChange={(e) => handleFormChange(tabValue, "pincode", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Mobile Number"
                                    value={travelers[tabValue].formData.mobile}
                                    onChange={(e) => handleFormChange(tabValue, "mobile", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Email Address"
                                    value={travelers[tabValue].formData.email}
                                    onChange={(e) => handleFormChange(tabValue, "email", e.target.value)}
                                    fullWidth
                                    required
                                />
                                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                                    Submit
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PassportForm;
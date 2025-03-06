import {useEffect, useState} from 'react';
import './SubmittedForms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-calendar/dist/Calendar.css';
import {Accordion, Button, Badge} from 'react-bootstrap';
import Spinner from '../spinner/Spinner.jsx'
import Calendar from 'react-calendar';
import {FaSearch} from 'react-icons/fa';
import logo from '../../assets/logo.png';
import {PiMicrosoftExcelLogoFill} from "react-icons/pi";
import {FaDownload} from "react-icons/fa6";
import {downloadExcel} from "../server/common/downloadExcel.js";

const url = import.meta.env.VITE_API_URL;

const SubmittedForms = () => {
    const [forms, setForms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const [loading, setLoading] = useState(false);
    const [excelLoading, setExcelLoading] = useState(false);
    const limit = 10;

    useEffect(() => {
        fetchForms();
    }, [currentPage, selectedDate]); // Fetch whenever currentPage or selectedDate changes

    const fetchForms = async () => {
        try {
            setLoading(true)
            const formattedDate = selectedDate ?
                selectedDate.toLocaleDateString('en-CA') // Format as YYYY-MM-DD
                : '';

            const query = new URLSearchParams({
                page: currentPage,
                limit,
                search: searchQuery,
                date: formattedDate,
            }).toString();

            const response = await fetch(`${url}/submittedforms?${query}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                const data = await response.json();
                setForms(data.forms);
                setTotalPages(data.totalPages);
            } else {
                console.error('Failed to fetch submitted forms');
            }
        } catch (error) {
            console.error('Error occurred while fetching forms:', error);
        } finally {
            setLoading(false)
        }
    };

    const downloadExcelFile = async () => {
        try {
            setExcelLoading(true)
            const response = await downloadExcel()
            if (response.status === 200) {
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob);
                link.download = 'hostel_bookings.xlsx';
                link.click();
                link.addEventListener('click', () => {
                    setTimeout(() => {
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(link.href); // Clean up the URL object
                    }, 100); // 100ms delay
                });

            } else {
                alert('Failed to download')

            }
        } catch (error) {
            alert(error.message)
        } finally {
            setExcelLoading(false)
        }
    }

    const handleSearch = () => {
        setCurrentPage(1);
        setSelectedDate(null);
        fetchForms();
    };

    const handleDateChange = (date) => {
        setSelectedDate(date); // Update selected date
        setCurrentPage(1); // Reset to the first page for new date
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="submitted-forms-container w-100">
            <img className={'logo'} src={logo} alt="logo" style={{
                mixBlendMode: "lighten"
            }}/>
            <div className="header">
                <h1>Hostel Booking Details</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <FaSearch/>
                    </button>
                </div>
            </div>
            {loading ? <Spinner paragraph={"Loading..."}/> : (<div className="content">
                <div className="main-content">
                    <Accordion>
                        {forms.map((form, index) => (
                            <Accordion.Item className="mb-3" eventKey={index.toString()} key={index}>
                                <Accordion.Header>
                                    <span className="small-header">
                                        {form.studentName} - <span className={'header-color'}> {formatDate(form.BookingDate)}</span>
                                        <Badge className="ms-2" bg={form.hostelType === "Boys Hostel" ? "primary" : "danger"}>
                                            {form.hostelType}
                                        </Badge>
                                    </span>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Student Information</h5>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/user.png" alt="name icon" height={22} width={22}/>
                                                <strong>Student Name:</strong> {form.studentName}
                                            </p>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/whatsapp.png" alt="whatsapp icon" height={22} width={22}/>
                                                <strong>WhatsApp:</strong> {form.whatsapp}
                                            </p>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/role.png" alt="course icon" height={22} width={22}/>
                                                <strong>Course:</strong> {form.course}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Guardian Information</h5>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/user.png" alt="guardian icon" height={22} width={22}/>
                                                <strong>Guardian Name:</strong> {form.guardianName}
                                            </p>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/whatsapp.png" alt="phone icon" height={22} width={22}/>
                                                <strong>Phone:</strong> {form.guardianPhone}
                                            </p>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/change.png" alt="relation icon" height={22} width={22}/>
                                                <strong>Relation:</strong> {form.guardianRelation}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Hostel Details</h5>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/company.png" alt="hostel icon" height={22} width={22}/>
                                                <strong>Hostel Name:</strong> {form.hostelName}
                                            </p>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/bed.png" alt="room icon" height={22} width={22}/>
                                                <strong>Room No:</strong> {form.roomNo}
                                            </p>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/hostel.png" alt="hostel type icon" height={22} width={22}/>
                                                <strong>Hostel Type:</strong> {form.hostelType}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>ID Verification</h5>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/id-card.png" alt="id icon" height={22} width={22}/>
                                                <strong>ID Type:</strong> {form.idProofType}
                                            </p>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/id-card.png" alt="id number icon" height={22} width={22}/>
                                                <strong>ID Number:</strong> {form.idProof}
                                            </p>
                                            <p className={`d-flex align-items-center justify-content-start gap-3`}>
                                                <img src="/meraroom admin icons/calendar.png" alt="date icon" height={22} width={22}/>
                                                <strong>Booking Date:</strong> {formatDate(form.BookingDate)}
                                            </p>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                    <div className="pagination mt-3">
                        <Button
                            variant="secondary"
                            disabled={currentPage === 1}
                            onClick={handlePreviousPage}
                        >
                            Previous
                        </Button>
                        <span className="mx-2">Page {currentPage} of {totalPages}</span>
                        <Button
                            variant="secondary"
                            disabled={currentPage === totalPages}
                            onClick={handleNextPage}
                        >
                            Next
                        </Button>
                    </div>
                </div>
                <div className="sidebar d-flex flex-column ">
                    <Calendar onChange={handleDateChange} value={selectedDate}/>
                    {excelLoading ? <Spinner paragraph={"Downloading..."}/> : (
                        <button
                            onClick={() => {
                                downloadExcelFile()
                            }}
                            className="
                                btn btn-success
                                d-flex align-items-center
                                justify-content-center
                                px-4 py-3
                                rounded-pill
                                fw-bold
                                fs-5
                                mt-3
                                shadow-lg
                                hover-grow  "
                        >
                            <PiMicrosoftExcelLogoFill className="me-2"/>
                            Download Excel
                            <FaDownload className="ms-2"/>
                        </button>
                    )}
                </div>
            </div>)}
        </div>
    );
};

export default SubmittedForms;
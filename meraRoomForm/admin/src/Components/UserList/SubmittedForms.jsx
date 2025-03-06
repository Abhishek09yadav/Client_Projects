import {useEffect, useState} from 'react';
import './SubmittedForms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-calendar/dist/Calendar.css';
import {Accordion, Button} from 'react-bootstrap';
import Spinner from '../spinner/Spinner.jsx';
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
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [excelLoading, setExcelLoading] = useState(false);
    const limit = 10;

    useEffect(() => {
        fetchForms();
    }, [currentPage, selectedDate]);

    const fetchForms = async () => {
        try {
            setLoading(true);
            const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-CA') : '';

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
            setLoading(false);
        }
    };

    const downloadExcelFile = async () => {
        try {
            setExcelLoading(true);
            const response = await downloadExcel();
            if (response.status === 200) {
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'hostel_forms.xlsx';
                link.click();
                link.addEventListener('click', () => {
                    setTimeout(() => {
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(link.href);
                    }, 100);
                });
            } else {
                alert('Failed to download');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setExcelLoading(false);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setSelectedDate(null);
        fetchForms();
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="submitted-forms-container w-100">
            <img className={'logo'} src={logo} alt="logo" style={{ mixBlendMode: "lighten" }}/>
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
            {loading ? <Spinner paragraph={"Loading..."}/> : (
                <div className="content">
                    <div className="main-content">
                        <Accordion>
                            {forms.map((form, index) => (
                                <Accordion.Item className="mb-3" eventKey={index.toString()} key={index}>
                                    <Accordion.Header>
                                        <span className="small-header">
                                            {form.studentName} - <span className={'header-color'}> {new Date(form.BookingDate).toLocaleDateString()}</span>
                                        </span>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p><strong>Student Name:</strong> {form.studentName}</p>
                                        <p><strong>WhatsApp:</strong> {form.whatsapp}</p>
                                        <p><strong>Guardian Name:</strong> {form.guardianName}</p>
                                        <p><strong>Guardian Phone:</strong> {form.guardianPhone}</p>
                                        <p><strong>Course:</strong> {form.course}</p>
                                        <p><strong>Hostel Name:</strong> {form.hostelName}</p>
                                        <p><strong>Hostel Type:</strong> {form.hostelType}</p>
                                        <p><strong>ID Proof Type:</strong> {form.idProofType}</p>
                                        <p><strong>ID Proof:</strong> {form.idProof}</p>
                                        <p><strong>Room No:</strong> {form.roomNo}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                        <div className="pagination mt-3">
                            <Button variant="secondary" disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</Button>
                            <span className="mx-2">Page {currentPage} of {totalPages}</span>
                            <Button variant="secondary" disabled={currentPage === totalPages} onClick={handleNextPage}>Next</Button>
                        </div>
                    </div>
                    <div className="sidebar d-flex flex-column">
                        <Calendar onChange={handleDateChange} value={selectedDate}/>
                        {excelLoading ? <Spinner paragraph={"Downloading..."}/> : (
                            <button onClick={downloadExcelFile} className="btn btn-success d-flex align-items-center justify-content-center px-4 py-3 rounded-pill fw-bold fs-5 mt-3 shadow-lg hover-grow">
                                <PiMicrosoftExcelLogoFill className="me-2"/> Download Excel <FaDownload className="ms-2"/>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmittedForms;

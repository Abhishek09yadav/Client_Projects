import { useEffect, useState } from 'react';
import './SubmittedForms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-calendar/dist/Calendar.css';
import { Accordion, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
const url = import.meta.env.VITE_API_URL;
import { FaDownload } from "react-icons/fa6";
import {downloadExcel} from "../server/common/downloadExcel.js";

const SubmittedForms = () => {
    const [forms, setForms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const limit = 10;

    useEffect(() => {
        fetchForms();
    }, [currentPage, selectedDate]); // Fetch whenever currentPage or selectedDate changes

    const fetchForms = async () => {
        try {
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
                headers: { 'Content-Type': 'application/json' },
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
        }
    };
    const downloadExcelFile = async () => {
        try {
            const response = await downloadExcel()
            if (response.status === 200) {
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob);
                link.download = 'forms.xlsx';
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
    const formatDate = (dateString) => { const date = new Date(dateString); const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear(); return `${day}-${month}-${year}`; };

    const formatTimeAmPm = (timeString) => { const time = new Date(`1970-01-01T${timeString}Z`);
        let hours = time.getUTCHours(); const minutes = String(time.getUTCMinutes()).padStart(2, '0');
        const amPm = hours >= 12 ? 'PM' : 'AM'; hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
         return `${hours}:${minutes} ${amPm}`;

         };
    return (
        <div className="submitted-forms-container w-100">
            <img className={'logo'} src={logo} alt="logo"/>
            <div className="header">
                <h1>Manual Order List</h1>
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
            <div className="content">
                <div className="main-content">
                    <Accordion>
                        {forms.map((form, index) => (
                            <Accordion.Item className="mb-3" eventKey={index.toString()} key={index}>
                                <Accordion.Header>
                        <span className="small-header">
                            {form.name} - <span
                            className={'header-color'}> {formatDate(form.pickup_date)}</span> {formatTimeAmPm(form.pickup_time)}
                        </span>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p><strong>Name:</strong> {form.name}</p>
                                    <p><strong>Email:</strong> {form.email}</p>
                                    <p><strong>Mobile:</strong> {form.mobile}</p>
                                    <p><strong>Address:</strong> {form.address}</p>
                                    <p><strong>Services:</strong> {form.services}</p>
                                    <p><strong>Pickup Date:</strong> {formatDate(form.pickup_date)}</p>
                                    <p><strong>Pickup Time:</strong> {formatTimeAmPm(form.pickup_time)}</p>
                                    <p><strong>Ordered on:</strong>{formatDate(form.Date)}</p>
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
                </div>
            </div>

        </div>
    );
};

export default SubmittedForms;

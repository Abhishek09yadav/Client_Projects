import {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './QuotationHistory.css';
import {FaSearch} from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import handlePdfDownload from "../DownloadPdf/handlePdfDownload.js";
import {toast, ToastContainer} from "react-toastify";

const url = import.meta.env.VITE_API_URL;

const QuotationHistory = () => {
    const [quotations, setQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    const fetchQuotations = async (page, search = '', startDate = null, endDate = null) => {
        try {
            const response = await axios.get(`${url}/api/quotations`, {
                params: {
                    page: page + 1,
                    limit: itemsPerPage,
                    search: search,
                    startDate: startDate ? startDate.getTime() : null,
                    endDate: endDate ? endDate.getTime() : null
                }
            });

            const formattedQuotations = response.data.quotations.map((quotation) => ({
                ...quotation,
                formattedDate: formatDate(quotation.uploadedAt),
            }));

            setQuotations(formattedQuotations);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching quotations:', error);
        }
    };

    useEffect(() => {
        fetchQuotations(currentPage, searchTerm, startDate, endDate);
    }, []);

    // Add click outside handler to close calendars
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isCalendarClick = event.target.closest('.calendar-container');
            if (!isCalendarClick) {
                setShowStartCalendar(false);
                setShowEndCalendar(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSearch = () => {
        if ((startDate && !endDate) || (!startDate && endDate)) {
            toast.warn("Please select both start and end dates.");
            return;
        }
        setCurrentPage(0);
        fetchQuotations(0, searchTerm, startDate, endDate);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
        fetchQuotations(data.selected, searchTerm, startDate, endDate);
    };

    const handleStartDateSelect = (date) => {
        setStartDate(date);
        setShowStartCalendar(false);
    };

    const handleEndDateSelect = (date) => {
        setEndDate(date);
        setShowEndCalendar(false);
    };

    const toggleStartCalendar = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        setShowEndCalendar(false); // Close end calendar
        setShowStartCalendar(!showStartCalendar);
    };

    const toggleEndCalendar = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        setShowStartCalendar(false); // Close start calendar
        setShowEndCalendar(!showEndCalendar);
    };

    return (
        <div className="quotation-history-container w-100 w-lg-75">
            <h1>Quotation History</h1>

            <div className="d-flex align-items-center justify-content-center gap-1 flex-md-row flex-column">
                <input
                    type="text"
                    placeholder="Type name, phone or mail"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                <div className="calendar-container">
                    <input
                        type="text"
                        placeholder="Start Date"
                        value={startDate ? formatDate(startDate) : ''}
                        onClick={toggleStartCalendar}
                        readOnly
                        className="date-input"
                    />
                    {showStartCalendar && (
                        <div className="calendar-popup" onClick={e => e.stopPropagation()}>
                            <Calendar
                                onChange={handleStartDateSelect}
                                value={startDate}
                                maxDate={endDate || new Date()}
                            />
                        </div>
                    )}
                </div>

                <div className="calendar-container">
                    <input
                        type="text"
                        placeholder="End Date"
                        value={endDate ? formatDate(endDate) : ''}
                        onClick={toggleEndCalendar}
                        readOnly
                        className="date-input"
                    />
                    {showEndCalendar && (
                        <div className="calendar-popup" onClick={e => e.stopPropagation()}>
                            <Calendar
                                onChange={handleEndDateSelect}
                                value={endDate}
                                minDate={startDate}
                                maxDate={new Date()}
                            />
                        </div>
                    )}
                </div>

                <button onClick={handleSearch} className="btn btn-primary justify-content-center  search-bar w-25">
                    Search... <FaSearch/>
                </button>
            </div>

            <table className="quotation-table">
                <thead>
                <tr>
                    <th>User Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>PDF</th>
                </tr>
                </thead>
                <tbody>
                {quotations.map((quotation, index) => (
                    <tr key={index}>
                        <td>{quotation.userName}</td>
                        <td>{quotation.phoneNo}</td>
                        <td>{quotation.email}</td>
                        <td>{quotation.formattedDate}</td>
                        <td className={'d-flex flex-row flex-nowrap gap-2'}>
                            <button className="btn btn-outline-primary "
                                    onClick={() => window.open(`${url}${quotation.link}`, '_blank')}
                                    rel="noopener noreferrer"
                                    title="View PDF"
                            >
                                View <FontAwesomeIcon icon={faEye}/>
                            </button>
                            <button
                                onClick={() => handlePdfDownload(quotation)}
                                title="Download PDF"
                                className="btn "
                            >
                                Download <FontAwesomeIcon icon={faDownload}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination d-flex justify-content-center mt-3'}
                activeClassName={'active'}
                forcePage={currentPage}
            />
            <ToastContainer/>
        </div>
    );
};

export default QuotationHistory;
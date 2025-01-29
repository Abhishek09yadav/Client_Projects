import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './QuotationHistory.css';
import {FaSearch} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const url = import.meta.env.VITE_API_URL;

const QuotationHistory = () => {
    const [quotations, setQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10; // Adjust the number of items per page as needed

    // Format date to dd/mm/yy
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    // Fetch quotations from the server with pagination, search, and date range
    const fetchQuotations = async (page, search = '', startDate = null, endDate = null) => {
        try {
            const response = await axios.get(`${url}/api/quotations`, {
                params: {
                    page: page + 1, // ReactPaginate starts from 0
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

    // Fetch quotations on component mount and when page, search term, or date range changes
    useEffect(() => {
        fetchQuotations(currentPage, searchTerm, startDate, endDate);
    }, [currentPage]); // Fetch data when the page changes

    // Handle search when the search button is clicked
    const handleSearch = () => {
        setCurrentPage(0); // Reset to the first page after search
        fetchQuotations(0, searchTerm, startDate, endDate); // Perform search with the current search term and date range
    };

    // Handle pagination
    const handlePageClick = (data) => {
        setCurrentPage(data.selected); // Update the current page
        fetchQuotations(data.selected, searchTerm, startDate, endDate); // Fetch data for the new page with the current search term and date range
    };

    // Handle PDF download
    const handlePdfDownload = async (quotation) => {
        try {
            const response = await fetch(quotation.link);
            if (!response.ok) {
                throw new Error(`Failed to download PDF: ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `Quotation_${quotation.uploadedAt}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    return (
        <div className="quotation-history-container">
            <h1>Quotation History</h1>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by user name or phone number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="search-bar"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className="search-bar"
                />
                <button onClick={handleSearch} className="search-button">
                    <FaSearch/>
                </button>
            </div>

            {/* Quotation Table */}
            <table className="quotation-table">
                <thead>
                <tr>
                    <th>User Name</th>
                    <th>Phone Number</th>
                    <th>Date</th>
                    <th>PDF</th>
                </tr>
                </thead>
                <tbody>
                {quotations.map((quotation, index) => (
                    <tr key={index}>
                        <td>{quotation.userName}</td>
                        <td>{quotation.phoneNo}</td>
                        <td>{quotation.formattedDate}</td>
                        <td>
                            <a className="pdf" href={quotation.link} target="_blank" rel="noopener noreferrer"
                               title="View PDF">
                                <FontAwesomeIcon icon={faEye}/>
                            </a>
                            <a
                                onClick={() => handlePdfDownload(quotation)}
                                title="Download PDF"
                                className="pdf"
                            >
                                <FontAwesomeIcon icon={faDownload}/>
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                forcePage={currentPage}
            />
        </div>
    );
};

export default QuotationHistory;
import {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './QuotationHistory.css';
import {FaSearch} from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import handlePdfDownload from "../DownloadPdf/handlePdfDownload.js";
import {toast, ToastContainer} from "react-toastify";

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
    }, []); // Fetch data when the page changes

    // Handle search when the search button is clicked
    const handleSearch = () => {
        if ((startDate && !endDate) || (!startDate && endDate)) {
            toast.warn("Please select both start and end dates.");
            return;
        }
        setCurrentPage(0); // Reset to the first page after search
        fetchQuotations(0, searchTerm, startDate, endDate); // Perform search with the current search term and date range
    };

    // Handle pagination
    const handlePageClick = (data) => {
        setCurrentPage(data.selected); // Update the current page
        fetchQuotations(data.selected, searchTerm, startDate, endDate); // Fetch data for the new page with the current search term and date range
    };

    // const startIndex = currentPage * itemsPerPage;
    // const currentItems = filteredQuotations.slice(startIndex, startIndex + itemsPerPage);


    return (
        <div className="quotation-history-container  w-100 w-lg-75 ">
            <h1>Quotation History</h1>

            {/* Search Bar */}
            <div className="d-flex align-items-center justify-content-center gap-1 flex-sm-row flex-column ">
                <input
                    type="text"
                    placeholder="Search by user name or phone number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar  "
                />
                {/*<div className={'d-flex flex-row gap-1 align-items-center'}>*/}
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className=""
                />

                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className=""
                />
                <button onClick={handleSearch} className="btn btn-primary justify-content-center search-bar w-25  ">
                    <FaSearch/>
                </button>
                {/*</div>*/}
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
                            <a className="pdf" href={`${url}${quotation.link}`} target="_blank"
                               rel="noopener noreferrer"
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
                containerClassName={'pagination d-flex justify-content-center mt-3'}
                activeClassName={'active'}
                forcePage={currentPage}
            />
            <ToastContainer/>
        </div>
    );
};

export default QuotationHistory;
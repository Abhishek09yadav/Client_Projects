import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './QuotationHistory.css'; // Import the CSS file
import handlePdfDownload from "../DownloadPdf/handlePdfDownload.js";

const url = import.meta.env.VITE_API_URL;

const QuotationHistory = () => {
    const [quotations, setQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuotations, setFilteredQuotations] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Adjust the number of items per page as needed

    // Format date to dd/mm/yy
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    // Fetch quotations from the server
    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const response = await axios.get(`${url}/quotations`);
                const sortedQuotations = response.data.sort(
                    (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
                );
                const formattedQuotations = sortedQuotations.map((quotation) => ({
                    ...quotation,
                    formattedDate: formatDate(quotation.uploadedAt),
                }));
                setQuotations(formattedQuotations);
                setFilteredQuotations(formattedQuotations);
            } catch (error) {
                console.error('Error fetching quotations:', error);
            }
        };
        fetchQuotations();
    }, []);

    // Filter quotations based on search term
    useEffect(() => {
        const filtered = quotations.filter((quotation) =>
            quotation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quotation.phoneNo.includes(searchTerm) ||
            quotation.formattedDate.includes(searchTerm)
        );
        setFilteredQuotations(filtered);
    }, [searchTerm, quotations]);

    // Handle pagination
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const startIndex = currentPage * itemsPerPage;
    const currentItems = filteredQuotations.slice(startIndex, startIndex + itemsPerPage);


    return (
        <div className="quotation-history-container">
            <h1>Quotation History</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by date (dd/mm/yy), user name, or phone number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

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
                {currentItems.map((quotation, index) => (
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
                pageCount={Math.ceil(filteredQuotations.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default QuotationHistory;

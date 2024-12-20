import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './QuotationHistory.css'; // Import the CSS file
const url = import.meta.env.VITE_API_URL;
const QuotationHistory = () => {
    const [quotations, setQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuotations, setFilteredQuotations] = useState([]);

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
                const response = await axios.get(`${url}/quotations`); // Replace with your endpoint
                // Sort by date (newest first)
                const sortedQuotations = response.data.sort(
                    (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
                );
                // Add formatted date to each quotation
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
            a.download = `Quotation_${quotation.uploadedAt}`; // Adjust file name if needed
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url); // Clean up URL object
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };
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
                {filteredQuotations.map((quotation, index) => (
                    <tr key={index}>
                        <td>{quotation.userName}</td>
                        <td>{quotation.phoneNo}</td>
                        <td>{quotation.formattedDate}</td>
                        <td>
                            <a className="pdf" href={quotation.link} target="_blank" rel="noopener noreferrer"
                               title={'view pdf'}>
                                <FontAwesomeIcon icon={faEye}/>
                            </a>
                            <a
                                onClick={() => handlePdfDownload(quotation)}
                                title="Download PDF"
                                className="pdf">
                                <FontAwesomeIcon icon={faDownload}/>
                            </a>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuotationHistory;

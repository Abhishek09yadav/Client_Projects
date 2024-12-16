import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './QuotationHistory.css'; // Import the CSS file

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
                const response = await axios.get('http://localhost:4000/quotations'); // Replace with your endpoint
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
                            <a href={quotation.link} target="_blank" rel="noopener noreferrer">
                                View PDF
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

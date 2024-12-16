import React, {useEffect, useState} from 'react';
import axios from 'axios';

const QuotationHistory = () => {
    const [quotations, setQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuotations, setFilteredQuotations] = useState([]);

    // Fetch quotations from the server
    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const response = await axios.get('http://localhost:4000/quotations'); // Update with the correct endpoint
                // Sort by date (newest first)
                const sortedQuotations = response.data.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
                setQuotations(sortedQuotations);
                setFilteredQuotations(sortedQuotations);
            } catch (error) {
                console.error('Error fetching quotations:', error);
            }
        };
        fetchQuotations();
    }, []);

    // Filter quotations based on search term
    useEffect(() => {
        const filtered = quotations.filter(quotation =>
            quotation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quotation.phoneNo.includes(searchTerm) ||
            new Date(quotation.uploadedAt).toLocaleDateString().includes(searchTerm)
        );
        setFilteredQuotations(filtered);
    }, [searchTerm, quotations]);

    return (
        <div style={{padding: '20px'}}>
            <h1>Quotation History</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by date, user name, or phone number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}
            />

            {/* Quotation List */}
            <ul style={{listStyle: 'none', padding: 0}}>
                {filteredQuotations.map((quotation, index) => (
                    <li
                        key={index}
                        style={{
                            marginBottom: '15px',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <h3>{quotation.userName}</h3>
                        <p>
                            <strong>Phone:</strong> {quotation.phoneNo}
                        </p>
                        <p>
                            <strong>Date:</strong> {new Date(quotation.uploadedAt).toLocaleString()}
                        </p>
                        <a
                            href={quotation.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                marginTop: '10px',
                                textDecoration: 'none',
                                color: '#007BFF'
                            }}
                        >
                            View PDF
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuotationHistory;

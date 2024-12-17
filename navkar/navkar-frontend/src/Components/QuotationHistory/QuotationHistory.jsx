import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../../Context/ShopContext";

const QuotationHistory = () => {
    const [quotations, setQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuotations, setFilteredQuotations] = useState([]);
    const {userDetails} = useContext(ShopContext);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const handleDataChange = () => {
            setLoading(true); // Set loading to true when data changes
            if (userDetails?.QuotationPages) {
                const sortedQuotations = [...userDetails.QuotationPages].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
                setQuotations(sortedQuotations);
                setFilteredQuotations(sortedQuotations);
            } else {
                setQuotations([]);
                setFilteredQuotations([]);
            }
            setLoading(false); // Set loading to false after data is processed
        };

        handleDataChange();
    }, [userDetails]);

    useEffect(() => {
        if (quotations.length > 0) { // Only filter if quotations exist
            const filtered = quotations.filter(quotation =>
                new Date(quotation.uploadedAt).toLocaleDateString().includes(searchTerm)
            );
            setFilteredQuotations(filtered);
        } else {
            setFilteredQuotations([]); // Important: Set to empty array if no quotations
        }
    }, [searchTerm, quotations]);

    if (loading) {
        return <div>Loading quotations...</div>;
    }

    return (
        <div style={{padding: '20px'}}>
            <h1>Quotation History</h1>

            <input
                type="text"
                placeholder="Search by date"
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

            {filteredQuotations.length === 0 ? (
                <p>No quotations found.</p>
            ) : (
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
            )}
        </div>
    );
};

export default QuotationHistory;
import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../../Context/ShopContext";
import './QuotationHistory.css';
// import { Document, Page, pdfjs } from 'react-pdf';
import {Button, Modal} from 'react-bootstrap';

const QuotationHistory = () => {
    const [quotations, setQuotations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuotations, setFilteredQuotations] = useState([]);
    const {userDetails} = useContext(ShopContext);
    const [loading, setLoading] = useState(true);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    useEffect(() => {
        const handleDataChange = async () => {
            setLoading(true);
            if (userDetails?.QuotationPages) {
                const sortedQuotations = [...userDetails.QuotationPages].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
                setQuotations(sortedQuotations);
                setFilteredQuotations(sortedQuotations);
            } else {
                setQuotations([]);
                setFilteredQuotations([]);
            }
            setLoading(false);
        };
        handleDataChange();
    }, [userDetails]);

    useEffect(() => {
        if (quotations.length > 0) {
            const filtered = quotations.filter(quotation => new Date(quotation.uploadedAt).toLocaleDateString().includes(searchTerm));
            setFilteredQuotations(filtered);
        } else {
            setFilteredQuotations([]);
        }
    }, [searchTerm, quotations]);

    const handlePdfClick = (quotation) => {
        setSelectedPdf(quotation.link);
        setShowPdfModal(true);
    };
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
            <h1 className="quotation-history-title">Quotation History</h1>
            <input type="text" placeholder="Search by date" value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
            {loading ? (
                <div className="loading">Loading quotations...</div>
            ) : filteredQuotations.length === 0 ? (
                <p className="no-quotations">No quotations found.</p>
            ) : (
                <ul className="quotation-list">
                    {filteredQuotations.map((quotation, index) => (
                        <li key={index} className="quotation-item">
                            <p><strong>Date:</strong> {new Date(quotation.uploadedAt).toLocaleString()}</p>
                            <div className="button-container">
                                <Button variant="primary" onClick={() => handlePdfClick(quotation)}>View PDF</Button>
                                <Button variant="secondary" onClick={() => handlePdfDownload(quotation)}>Download
                                    PDF</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <Modal size="lg" show={showPdfModal} onHide={() => setShowPdfModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Quotation Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPdf ? (
                        <iframe
                            src={`${selectedPdf}#view=Fit`}
                            width="100%"
                            height="800px"
                            title="PDF Viewer"
                            style={{border: 'none'}}
                        />
                    ) : (
                        <p>PDF preview is not available.</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default QuotationHistory;

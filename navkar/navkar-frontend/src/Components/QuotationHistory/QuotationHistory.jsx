import React, {useContext, useEffect, useRef, useState} from 'react';
import {ShopContext} from "../../Context/ShopContext";
import './QuotationHistory.css';
import {Button, Modal} from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReactPaginate from 'react-paginate';
import no_quotations_found from "../Assets/no_quotatoins_found.svg";
import {FaCalendarAlt} from "react-icons/fa";
import handlePdfDownload from "../DownloadPdf/handlePdfDownload";

const url = process.env.REACT_APP_API_URL
const CalendarInput = ({value, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);

    const handleInputClick = () => {
        setIsOpen(true);
    };

    const handleCalendarChange = (date) => {
        onChange(date);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="calendar-input-container" ref={inputRef}>
            <div className="calendar-input-wrapper border border-primary ">
                <input
                    type="text"
                    value={value ? new Date(value).toDateString() : ''}
                    onClick={handleInputClick}
                    readOnly
                    className="calendar-input"
                    placeholder="Search By Date..."
                />
                <FaCalendarAlt className="calendar-icon" onClick={handleInputClick}/>
            </div>
            {isOpen && (
                <Calendar
                    onChange={handleCalendarChange}
                    value={value}
                    className="react-calendar"
                />
            )}
        </div>
    );
};

const QuotationHistory = () => {
    const [quotations, setQuotations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredQuotations, setFilteredQuotations] = useState([]);
    const {userDetails} = useContext(ShopContext);
    const [loading, setLoading] = useState(true);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

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
        if (quotations.length > 0 && selectedDate) {
            const filtered = quotations.filter(quotation => {
                const quotationDate = new Date(quotation.uploadedAt).toDateString();
                const selectedDateString = new Date(selectedDate).toDateString();
                return quotationDate === selectedDateString;
            });
            setFilteredQuotations(filtered);
        } else {
            setFilteredQuotations(quotations);
        }
    }, [selectedDate, quotations]);

    const handlePdfClick = (quotation) => {
        setSelectedPdf(`${url}${quotation.link}`);
        setShowPdfModal(true);
    };


    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
    };

    const paginatedQuotations = filteredQuotations.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="quotation-history-container">
            <h1 className="quotation-history-title">Quotation History</h1>

            <div className="calendar-container">
                <CalendarInput value={selectedDate} onChange={setSelectedDate}/>
            </div>

            {loading ? (
                <div className="loading">Loading quotations...</div>
            ) : paginatedQuotations.length === 0 ? (
                <div className='no-quotations-container '>
                    <p className="text-center fs-4 mt-2">No quotations found.</p>
                    <img className={'mx-auto d-block'} src={no_quotations_found} alt={''}/>
                </div>
            ) : (
                <>
                    <ul className="quotation-list">
                        {paginatedQuotations.map((quotation, index) => (
                            <li key={index} className="quotation-item">
                                <p><strong>Date:</strong> {new Date(quotation.uploadedAt).toLocaleString()}</p>
                                <div className="button-container">
                                    <Button variant="primary" onClick={() => handlePdfClick(quotation)}>View
                                        PDF</Button>
                                    <Button variant="secondary" onClick={() => handlePdfDownload(quotation)}>Download
                                        PDF</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
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
                        forcePage={currentPage}
                    />
                </>
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

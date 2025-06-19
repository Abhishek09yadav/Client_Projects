import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./QuotationHistory.css";
import { Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactPaginate from "react-paginate";
import no_quotations_found from "../Assets/no_quotatoins_found.svg";
import { FaCalendarAlt } from "react-icons/fa";

import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const CalendarInput = ({ value, onChange }) => {
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="calendar-input-container" ref={inputRef}>
      <div className="calendar-input-wrapper border border-primary ">
        <input
          type="text"
          value={value ? new Date(value).toDateString() : ""}
          onClick={handleInputClick}
          readOnly
          className="calendar-input"
          placeholder="Search By Date..."
        />
        <FaCalendarAlt className="calendar-icon" onClick={handleInputClick} />
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
  const { userDetails } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [quotationDetails, setQuotationDetails] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchQuotations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${url}/api/quotation/user/${userDetails?._id}`
        );
        const data = response.data;

        if (data?.quotations) {
          const sortedQuotations = [...data.quotations].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setQuotations(sortedQuotations);
          setFilteredQuotations(sortedQuotations);
        } else {
          setQuotations([]);
          setFilteredQuotations([]);
        }
      } catch (error) {
        console.error("Failed to fetch quotations:", error);
        setQuotations([]);
        setFilteredQuotations([]);
      }
      setLoading(false);
    };

    if (userDetails?._id) {
      fetchQuotations();
    }
  }, [userDetails]);

  const fetchDetails = async (quotationId) => {
 

    try {
      const response = await axios.get(`${url}/api/quotation/${quotationId}`);
      setQuotationDetails(response.data); // Save data to state
      setShowPdfModal(true); // Show modal
    } catch (error) {
      console.error("Error fetching quotation details:", error);
    }
  };
  

  useEffect(() => {
    if (quotations.length > 0 && selectedDate) {
        const filtered = quotations.filter((quotation) => {
          const quotationDate = new Date(quotation.date).toDateString();
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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedQuotations = filteredQuotations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="quotation-history-container">
      <h1 className="quotation-history-title">Quotation History</h1>

      <div className="calendar-container">
        <CalendarInput value={selectedDate} onChange={setSelectedDate} />
      </div>

      {loading ? (
        <div className="loading">Loading quotations...</div>
      ) : paginatedQuotations.length === 0 ? (
        <div className="no-quotations-container ">
          <p className="text-center fs-4 mt-2">No quotations found.</p>
          <img
            className={"mx-auto d-block"}
            src={no_quotations_found}
            alt={""}
          />
        </div>
      ) : (
        <>
          <ul className="quotation-list">
            {paginatedQuotations.map((quotation, index) => (
              <li key={index} className="quotation-item">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(quotation.date).toLocaleString()}
                </p>

                <div className="button-container">
                  <Button
                    variant="primary"
                    onClick={() =>{ fetchDetails(quotation.quotationId);
                        console.log("Quotation item:", quotation.quotationId);
                    }}
                  >
                    View Quotation
                  </Button>

                  {/* <Button
                    variant="secondary"
                    onClick={() => handlePdfDownload(quotation)}
                  >
                    Download PDF
                  </Button> */}
                </div>
              </li>
            ))}
          </ul>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredQuotations.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage}
          />
        </>
      )}

     <Modal
  show={showPdfModal}
  onHide={() => setShowPdfModal(false)}
  size="lg"
>
  <Modal.Header closeButton>
    <Modal.Title style={{ color: 'black' }}>Quotation Preview</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{ color: 'black' }}>
      {quotationDetails ? (
        <div>
          <p>
            <strong>Status:</strong> {quotationDetails.Status}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{quotationDetails.totalPrice}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(quotationDetails.createdAt).toLocaleString()}
          </p>
          <hr />
          <h5>Products:</h5>
          <ul>
            {quotationDetails.products.map((product, index) => (
              <li key={index}>
                <strong>{product.name}</strong> - {product.quantity} x ₹
                {product.price} = ₹{product.totalPrice} (Tax: {product.Tax}
                %)
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading quotation details...</p>
      )}
    </div>
  </Modal.Body>
</Modal>

    </div>
  );
};

export default QuotationHistory;

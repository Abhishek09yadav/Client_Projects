import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./QuotationHistory.css";
import { FaSearch } from "react-icons/fa";
import Calendar from "react-calendar";
import { MdEdit } from "react-icons/md";
import "react-calendar/dist/Calendar.css";
import handlePdfDownload from "../DownloadPdf/handlePdfDownload.jsx";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { confirmAlert } from "react-confirm-alert";

const url = import.meta.env.VITE_API_URL;

const QuotationHistory = () => {
  const [quotations, setQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingPrice, setEditingPrice] = useState("");
  const [editedPrices, setEditedPrices] = useState({});
  const [quotation, setQuotation] = useState();
  const itemsPerPage = 10;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  };

  // const formatFullDate = (timestamp) => {
  //     const date = new Date(timestamp);
  //     return date.toLocaleDateString('en-US', {
  //         year: 'numeric',
  //         month: 'long',
  //         day: 'numeric',
  //         hour: '2-digit',
  //         minute: '2-digit'
  //     });
  // };

  const fetchQuotations = async (
    page,
    search = "",
    startDate = null,
    endDate = null
  ) => {
    const utcStart = startDate
      ? new Date(
          Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
          )
        )
      : null;
    const utcEnd = endDate
      ? new Date(
          Date.UTC(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            23,
            59,
            59,
            999
          )
        )
      : null;
    try {
      const response = await axios.get(`${url}/api/quotations`, {
        params: {
          page: page + 1,
          limit: itemsPerPage,
          search: search,
          startDate: startDate ? utcStart.getTime() : null,
          endDate: endDate ? utcEnd.getTime() : null,
        },
      });

      console.log("Response: ", response);

      const formattedQuotations = response.data.quotations.map((quotation) => ({
        ...quotation,
        formattedDate: formatDate(quotation.uploadedAt),
      }));
      //   console.log("formatted Quotations", formattedQuotations);

      setQuotations(formattedQuotations);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  };

  const fetchQuotationDetails = async (quotation) => {
    setLoading(true);
    setQuotation(quotation);
    try {
      const response = await axios.get(`${url}/api/quotation/${quotation.id}`);
      console.log("Quotation details:", response.data);
      setSelectedQuotation(response.data);
      console.log("Selected Quotation:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching quotation details:", error);
      toast.error("Failed to fetch quotation details");
    } finally {
      setLoading(false);
    }
  };

  const handleViewQuotation = (quotation) => {
    // console.log("Viewing quotation with ID:", quotation);
    fetchQuotationDetails(quotation);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedQuotation(null);
  };

  // Add keyboard event listener for ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  useEffect(() => {
    fetchQuotations(currentPage, searchTerm, startDate, endDate);
  }, []);

  // Add click outside handler to close calendars
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isCalendarClick = event.target.closest(".calendar-container");
      if (!isCalendarClick) {
        setShowStartCalendar(false);
        setShowEndCalendar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if ((startDate && !endDate) || (!startDate && endDate)) {
      toast.warn("Please select both start and end dates.");
      return;
    }
    setCurrentPage(0);
    fetchQuotations(0, searchTerm, startDate, endDate);
  };

  const handleConfirm = async () => {
    if (!selectedQuotation?._id)
      // || Object.keys(editedPrices).length === 0
      return;
    console.log(selectedQuotation);
    if (selectedQuotation.Status === "Completed") {
      toast.warn("Quotation is already marked as Completed");
      console.log("hi");
      return;
    }
    confirmAlert({
      title: "Mark As Completed",
      message:
        "Are you sure you want to mark status as Completed? Once confimed prices cannot be changed for this Quotation",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              // Prepare updates array as required by the API
              const updates = Object.entries(editedPrices).map(
                ([productId, price]) => ({ productId, price })
              );
              // Make the PUT request to the bulk price update endpoint
              await axios.put(
                `${url}/api/quotation/prices/${selectedQuotation._id}`,
                {
                  updates,
                }
              );
              // console.log("Selected Quotation: ", selectedQuotation);

              toast.success("Prices updated successfully");
              // Optionally, refresh the quotation details here
            } catch (error) {
              toast.error("Failed to update prices");
              console.error(error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    fetchQuotations(data.selected, searchTerm, startDate, endDate);
  };

  const handleStartDateSelect = (date) => {
    setStartDate(date);
    setShowStartCalendar(false);
  };

  const handleEndDateSelect = (date) => {
    setEndDate(date);
    setShowEndCalendar(false);
  };

  const toggleStartCalendar = (e) => {
    e.stopPropagation();
    setShowEndCalendar(false);
    setShowStartCalendar(!showStartCalendar);
  };

  const toggleEndCalendar = (e) => {
    e.stopPropagation();
    setShowStartCalendar(false);
    setShowEndCalendar(!showEndCalendar);
  };

  return (
    <div className="quotation-history-container w-100 w-lg-75">
      <h1>Quotation History</h1>

      <div className="d-flex align-items-center justify-content-center gap-1 flex-md-row flex-column">
        <input
          type="text"
          placeholder="Type name, phone or mail"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="calendar-container">
          <input
            type="text"
            placeholder="Start Date"
            value={startDate ? formatDate(startDate) : ""}
            onClick={toggleStartCalendar}
            readOnly
            className="date-input"
          />
          {showStartCalendar && (
            <div
              className="calendar-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                onChange={handleStartDateSelect}
                value={startDate}
                maxDate={endDate || new Date()}
              />
            </div>
          )}
        </div>

        <div className="calendar-container">
          <input
            type="text"
            placeholder="End Date"
            value={endDate ? formatDate(endDate) : ""}
            onClick={toggleEndCalendar}
            readOnly
            className="date-input"
          />
          {showEndCalendar && (
            <div
              className="calendar-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                onChange={handleEndDateSelect}
                value={endDate}
                minDate={startDate}
                maxDate={new Date()}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="btn btn-primary justify-content-center search-bar w-25"
        >
          Search... <FaSearch />
        </button>
      </div>

      <table className="quotation-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation, index) => (
            <tr key={quotation._id || quotation.id || index}>
              <td>{quotation.userName}</td>
              <td>{quotation.phoneNo}</td>
              <td>{quotation.email}</td>
              <td>{quotation.formattedDate}</td>
              <td
                className={
                  quotation.status === "Completed"
                    ? "text-success"
                    : "text-warning"
                }
              >
                {quotation.status}
              </td>

              <td className={"d-flex flex-row flex-nowrap gap-2"}>
                <button
                  className="btn btn-outline-primary my-auto"
                  onClick={() => handleViewQuotation(quotation)}
                  title="View Details"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "View"}{" "}
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  onClick={() => handlePdfDownload(quotation)}
                  title="Download PDF"
                  className="btn btn-outline-success my-auto"
                >
                  Download <FontAwesomeIcon icon={faDownload} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination d-flex justify-content-center mt-3"}
        activeClassName={"active"}
        forcePage={currentPage}
      />

      {/* Bootstrap Modal with proper z-index and positioning */}
      {showModal && (
        <div className="modal-backdrop-custom" onClick={closeModal}>
          <div className="modal-container-custom">
            <div
              className="modal-content-custom"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header bg-primary text-white relative">
                <h5 className="modal-title">
                  <FontAwesomeIcon icon={faEye} className="me-2" />
                  Quotation Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white absolute "
                  onClick={closeModal}
                  aria-label="Close"
                  style={{ position: "relative", right: "8px", bottom: "4px" }}
                >
                  <IoClose size={25} />
                </button>
              </div>
              <div className="modal-body-custom">
                {selectedQuotation ? (
                  <div className="quotation-details">
                    {/* User Information Card */}
                    <div className="card mb-4">
                      <div className="card-header bg-light">
                        <h6
                          className="mb-0 fw-bold"
                          style={{ fontSize: "16px" }}
                        >
                          Customer Information
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          {(() => {
                            // console.log("Quotations: ", quotation);
                            return (
                              <>
                                <div className="col-md-6">
                                  <p>
                                    <strong>Name:</strong>{" "}
                                    {selectedQuotation?.user?.name || "N/A"}
                                  </p>
                                  <p>
                                    <strong>Email:</strong>{" "}
                                    {selectedQuotation?.user?.email || "N/A"}
                                  </p>
                                </div>
                                <div className="col-md-6">
                                  <p>
                                    <strong>City:</strong>{" "}
                                    {selectedQuotation?.user?.city || "N/A"}
                                  </p>
                                  <p>
                                    <strong>State:</strong>{" "}
                                    {selectedQuotation?.user?.state || "N/A"}
                                  </p>
                                </div>
                                <div className="col-md-6">
                                  <p>
                                    <strong>Phone:</strong>{" "}
                                    {selectedQuotation?.user?.phoneNo || "N/A"}
                                  </p>
                                  <p>
                                    <strong>Date:</strong>{" "}
                                    {quotation?.formattedDate || "N/A"}
                                  </p>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Products Table */}
                    <div className="card mb-4">
                      <div className="card-header bg-light">
                        <h6
                          className="mb-0 fw-bold"
                          style={{ fontSize: "16px" }}
                        >
                          Products ({selectedQuotation.products?.length || 0})
                        </h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table table-striped mb-0">
                            <thead className="table-dark">
                              <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Tax (%)</th>
                                <th>Total Price</th>
                              </tr>
                            </thead>
                            <tbody style={{ fontSize: "16px" }}>
                              {selectedQuotation.products?.map(
                                (product, index) => (
                                  <tr key={product._id || index}>
                                    <td>{index + 1}</td>
                                    <td className="fw-medium">
                                      {product.name || "N/A"}
                                    </td>
                                    <td>
                                      <span className="badge bg-secondary">
                                        {product.category || "N/A"}
                                      </span>
                                    </td>
                                    <td>{product.quantity || 0}</td>
                                    <td>
                                      {editingProduct === product._id ? (
                                        <div className="d-flex align-items-center gap-2">
                                          <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            value={editingPrice}
                                            onChange={(e) =>
                                              setEditingPrice(e.target.value)
                                            }
                                            style={{ width: "100px" }}
                                          />
                                          <button
                                            className="btn btn-sm btn-success my-auto"
                                            onClick={() => {
                                              setEditedPrices((prev) => ({
                                                ...prev,
                                                [product._id]:
                                                  parseFloat(editingPrice),
                                              }));
                                              setEditingProduct(null);
                                              setEditingPrice("");
                                            }}
                                            title="Save"
                                          >
                                            ✓
                                          </button>
                                          <button
                                            className="btn btn-sm btn-danger my-auto"
                                            onClick={() => {
                                              setEditingProduct(null);
                                              setEditingPrice("");
                                            }}
                                            title="Cancel"
                                          >
                                            <IoClose />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="d-flex gap-2 align-items-center">
                                          ₹
                                          {editedPrices[product._id]?.toFixed(
                                            2
                                          ) ??
                                            product.price?.toFixed(2) ??
                                            "0.00"}
                                          <button
                                            className="btn btn-sm btn-outline-primary my-auto"
                                            onClick={() => {
                                              setEditingProduct(product._id);
                                              setEditingPrice(
                                                editedPrices[
                                                  product._id
                                                ]?.toString() ||
                                                  product.price.toString()
                                              );
                                            }}
                                            title="Edit Price"
                                          >
                                            <MdEdit />
                                          </button>
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {product.Tax?.toFixed(2) || "0.00"} %
                                    </td>
                                    <td className="fw-bold">
                                      ₹
                                      {product.totalPrice?.toFixed(2) || "0.00"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Total Summary Card */}
                    <div className="card">
                      <div className="card-header bg-success text-white">
                        <h6
                          className="mb-0 fw-bold"
                          style={{ fontSize: "16px" }}
                        >
                          Summary
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <p>
                              <strong>Total Items:</strong>{" "}
                              {selectedQuotation.products?.length || 0}
                            </p>
                            <p>
                              <strong>Total Quantity:</strong>{" "}
                              {selectedQuotation.products?.reduce(
                                (sum, product) => sum + (product.quantity || 0),
                                0
                              )}
                            </p>
                          </div>
                          <div className="col-md-6">
                            {/* <p>
                              <strong>Total Tax:</strong> 
                              {selectedQuotation.products
                                ?.reduce(
                                  (sum, product) => sum + (product.price)*(product.quantity)*(product.Tax || 0),
                                  0
                                )
                                .toFixed(2)} 
                            </p> */}
                            <p className="fs-5">
                              <strong>Grand Total:</strong>
                              <span className="text-success fw-bold ms-2">
                                ₹
                                {selectedQuotation.totalPrice?.toFixed(2) ||
                                  "0.00"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading quotation details...</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {selectedQuotation && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirm}
                    // disabled={selectedQuotation.Status == "Completed"}
                  >
                    <GiConfirmed /> mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuotationHistory;

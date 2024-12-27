import React, {useEffect, useState} from 'react';
import './SubmittedForms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import {Button} from 'react-bootstrap';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const url = import.meta.env.VITE_API_URL;

const SubmittedForms = () => {
    const [forms, setForms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Number of items per page

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch(`${url}/submittedforms?page=${currentPage}&limit=${limit}`);
                if (response.ok) {
                    const data = await response.json();
                    setForms(data.forms);
                    setTotalPages(data.totalPages);
                } else {
                    console.error("Failed to fetch submitted forms");
                }
            } catch (error) {
                console.error("Error occurred while fetching forms:", error);
            }
        };

        fetchForms();
    }, [currentPage]); // Re-fetch data whenever the current page changes

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="submitted-forms">
            <h1>Submitted Forms</h1>
            {forms.map((form, index) => (
                <div key={index} className="form-item">
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Mobile:</strong> {form.mobile}</p>
                    <p><strong>Address:</strong> {form.address}</p>
                    <p><strong>Services:</strong> {form.services}</p>
                    <p><strong>Pickup Date:</strong> {form.pickup_date}</p>
                    <p><strong>Pickup Time:</strong> {form.pickup_time}</p>
                </div>
            ))}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};




export default SubmittedForms;

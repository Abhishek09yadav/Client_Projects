import React, {useEffect, useState} from 'react';
import './UserList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import {Button, Col, Container, Row} from 'react-bootstrap';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {toast, ToastContainer} from "react-toastify";
import ReactPaginate from 'react-paginate';
import handlePdfDownload from "../DownloadPdf/handlePdfDownload.js";
import {FaSearch} from "react-icons/fa";

const url = import.meta.env.VITE_API_URL;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [expandedUser, setExpandedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Number of items to display per page

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${url}/listUser`, { method: 'GET' });
                const data = await response.json();
                if (data.success) {
                    setUsers(data.usersDetails);
                    setFilteredUsers(data.usersDetails);
                } else {
                    setError(data.error || 'No users found');
                }
            } catch (err) {
                setError('Failed to fetch users');
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const toggleAccordion = (email) => {
        setExpandedUser(expandedUser === email ? null : email);
    };

    const handlePdfView = (link) => {
        window.open(link, '_blank');
    };

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = users.filter((user) => {
            return user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phoneNo?.toLowerCase().includes(query);
        });

        setFilteredUsers(filtered);
        setCurrentPage(0); // Reset to the first page on search
    };

    const openDeleteModal = (user) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: `Are you sure you want to delete user ${user.name}?`,
            buttons: [
                {
                    label: 'Cancel',
                    onClick: () => {
                    }
                },
                {
                    label: 'Delete',
                    onClick: () => handleDeleteUser(user),
                    style: {
                        backgroundColor: '#ff0000',
                        color: '#ffffff'
                    }
                }
            ]
        });
    };

    const handleDeleteUser = async (userToDelete) => {
        try {
            const response = await fetch(`${url}/removeUser`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: userToDelete.email}),
            });
            const data = await response.json();
            if (data.success) {
                setUsers(users.filter((user) => user.email !== userToDelete.email));
                setFilteredUsers(filteredUsers.filter((user) => user.email !== userToDelete.email));
                toast.success('User Deleted successfully!');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to delete user');
            toast.error('Failed to delete user');
            console.error(err);
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
    const displayUsers = filteredUsers.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <>
            <ToastContainer/>
            {error && <div className="error-message">{error}</div>}
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="search-bar mb-3 d-flex align-items-center">
                            <input
                                type="text"
                                placeholder="Search by name, email or phone"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control me-2 flex-grow-1"
                            />
                            <button onClick={handleSearch}
                                    className="btn btn-primary justify-content-center search-bar w-25  ">
                                <FaSearch/>
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="accordion">
                            {displayUsers.length > 0 ? (
                                displayUsers.map((user) => (
                                    <div key={user.email}>
                                        <div className="accordion-item">
                                            <div
                                                className="accordion-header"
                                                onClick={() => toggleAccordion(user.email)}
                                            >
                                                <span>{user.name}</span>
                                                <span>{expandedUser === user.email ? '▲' : '▼'}</span>
                                            </div>
                                            {expandedUser === user.email && (
                                                <div className="accordion-collapse">
                                                    <div className="user-details">
                                                        <p><strong>Email:</strong> {user.email}</p>
                                                        <p><strong>Phone:</strong> {user.phoneNo}</p>
                                                        <p><strong>State:</strong> {user.state}</p>
                                                        <p><strong>City:</strong> {user.city}</p>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => openDeleteModal(user)}
                                                        >
                                                            Delete User
                                                        </Button>
                                                        {user.QuotationPages.length > 0 ? (
                                                            <table className="table table-bordered mt-3">
                                                                <thead>
                                                                <tr>
                                                                    <th>Date</th>
                                                                    <th>View</th>
                                                                    <th>Download</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {user.QuotationPages.map((quotation, index) => (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            {new Date(quotation.uploadedAt).toLocaleDateString('en-GB')}
                                                                        </td>
                                                                        <td>
                                                                            <Button
                                                                                variant="info"
                                                                                onClick={() => handlePdfView(`${url}${quotation.link}`)}
                                                                            >
                                                                                <FontAwesomeIcon icon={faEye}/> View
                                                                            </Button>
                                                                        </td>
                                                                        <td>
                                                                            <Button
                                                                                variant="secondary"
                                                                                onClick={() => handlePdfDownload(quotation)}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={faDownload}/> Download
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                                </tbody>
                                                            </table>
                                                        ) : (
                                                            <p>No quotations available.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-users">No users to display</p>
                            )}
                        </div>
                        <div className="pagination-container">
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination justify-content-center'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserList;

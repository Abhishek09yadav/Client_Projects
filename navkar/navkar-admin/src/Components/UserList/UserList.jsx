import React, {useEffect, useState} from 'react';
import './UserList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import {Button} from 'react-bootstrap';

const url = import.meta.env.VITE_API_URL;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [expandedUser, setExpandedUser] = useState(null);

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

    const handlePdfDownload = async (quotation) => {
        try {
            const response = await fetch(quotation.link);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `Quotation_${quotation.uploadedAt}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                throw new Error(`Failed to download PDF: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    const handlePdfView = (link) => {
        window.open(link, '_blank');
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const formatDate = (timestamp) => {
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            return `${day}/${month}/${year}`;
        };

        const filtered = users.filter((user) => {
            // Check for matches in basic fields
            const basicMatch =
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phoneNo?.toLowerCase().includes(query);

            // Check for matches in QuotationPages dates
            const dateMatches = user.QuotationPages.some((quotation) =>
                formatDate(quotation.uploadedAt).includes(query)
            );

            return basicMatch || dateMatches;
        });

        setFilteredUsers(filtered);
    };



    return (
        <>
            {error && <div className="error-message">{error}</div>}
            <div className={'main-container'}>
                <div className="search-bar mb-3">
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or date"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="form-control"
                    />
                </div>
                <div className="accordion">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
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
                                                                        onClick={() => handlePdfView(quotation.link)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faEye}/> View
                                                                    </Button>
                                                                </td>
                                                                <td>
                                                                    <Button
                                                                        variant="secondary"
                                                                        onClick={() => handlePdfDownload(quotation)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faDownload}/> Download
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
            </div>

        </>
    );
};

export default UserList;

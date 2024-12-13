import React, { useEffect, useState } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import Modal from './Modal'; // Import the Modal component
const url = import.meta.env.VITE_API_URL;
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${url}/listUser`, { method: 'GET' });
                const data = await response.json();
                if (data.success) {
                    setUsers(data.usersDetails);
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

    // Function to open the modal and set the user to be deleted
    const openModal = (user) => {
        setUserToDelete(user);
        setModalOpen(true);
    };

    // Function to remove the user
    const removeUser = async (email) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/removeUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                setUsers(users.filter((user) => user.email !== email)); // Remove user from the state
            } else {
                alert(data.error || 'Error removing user');
            }
        } catch (err) {
            alert('Error removing user');
            console.error(err);
        } finally {
            setModalOpen(false); // Close modal after deletion
        }
    };

    // Close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="user-list-container">
            {error && <div className="error-message">{error}</div>}
            <div className="user-grid">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.email} className="user-card">
                            <div className="user-details">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phoneNo}</p>
                                <p><strong>State:</strong> {user.state}</p>
                                <p><strong>City:</strong> {user.city}</p>
                            </div>
                            <button className="remove-btn" onClick={() => openModal(user)}>
                                <img src={cross_icon} alt="Remove" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-users">No users to display</p>
                )}
            </div>

            <Modal
                isOpen={modalOpen}
                user={userToDelete}
                onConfirm={removeUser}
                onCancel={closeModal}
            />
        </div>
    );
};

export default UserList;

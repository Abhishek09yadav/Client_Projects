// AddCategory.js
import React, {useEffect, useState} from 'react';
import add_icon from '../../assets/plus1.png';
import './AddCategory.css';
import ConfirmationModal from '../modal/ConfirmationModal.jsx';
import {FaTrashAlt} from "react-icons/fa";

const url = import.meta.env.VITE_API_URL; // Backend URL

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch categories on load
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${url}/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const addCategory = async () => {
        if (!newCategory) return;
        try {
            const response = await fetch(`${url}/addcategory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: newCategory }),
            });
            const data = await response.json();
            if (data.success) {
                setNewCategory('');
                fetchCategories();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`${url}/categories/${categoryId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                fetchCategories(); // Refresh categories after deletion
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleDelete = (categoryId) => {
        setCategoryToDelete(categoryId);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            deleteCategory(categoryToDelete);
            setCategoryToDelete(null);
            setIsModalOpen(false);
        }
    };

    const closeModal = () => {
        setCategoryToDelete(null);
        setIsModalOpen(false);
    };

    return (
        <div className="add-category-container">
            <div className="add-category-form">
                <input
                    type="text"
                    placeholder="Add new category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={addCategory}>
                    <img src={add_icon} className={'add-button-img'} alt="Add Category" />
                </button>
            </div>
            <div className="categories-list">
                {categories.map((category) => (
                    <div key={category.id} className="category-item">
                        <span>{category.category}</span>
                        <button onClick={() => handleDelete(category.id)}>
                            <FaTrashAlt style={{color: "red"}}/>
                        </button>
                    </div>
                ))}
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this category? "
            />
        </div>
    );
};

export default AddCategory;

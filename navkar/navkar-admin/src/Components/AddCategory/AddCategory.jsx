import React, { useState, useEffect } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import add_icon from '../../assets/plus1.png';
import './AddCategory.css';

const url = import.meta.env.VITE_API_URL; // Backend URL

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

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

    const deleteCategory = async (category) => {
        try {
            const response = await fetch(`${url}/categories/${category.id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.message === 'Category removed successfully') {
                fetchCategories();
                closeModal();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const openModal = (category) => {
        setCategoryToDelete(category);
        setIsModalOpen(true);
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
                        <span>{category}</span>
                        <button onClick={() => openModal(category)}>
                            <img src={cross_icon} alt="Delete" />
                        </button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this category and all its products?</h3>
                        <div className="modal-buttons">
                            <button onClick={() => deleteCategory(categoryToDelete)}>Yes</button>
                            <button onClick={closeModal}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCategory;

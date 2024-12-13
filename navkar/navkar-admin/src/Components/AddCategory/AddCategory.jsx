import React, { useState, useEffect } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import add_icon from '../../assets/plus1.png';
import './AddCategory.css';

const url = import.meta.env.VITE_API_URL; // Backend URL

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

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
            const response = await fetch(`${url}/categories/${categoryId}`, { // Send category id instead of category name
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
                        <button onClick={() => deleteCategory(category.id)}> {/* Send category id here */}
                            <img src={cross_icon} alt="Delete" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddCategory;

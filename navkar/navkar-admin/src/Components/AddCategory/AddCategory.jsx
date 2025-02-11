// AddCategory.js
import React, {useEffect, useState} from 'react';
import add_icon from '../../assets/plus1.png';
import './AddCategory.css';
import {FaTrashAlt} from "react-icons/fa";
import {confirmAlert} from "react-confirm-alert";

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
        confirmAlert({
            title: 'Delete Category Confirmation',

            message: `Are you certain you want to delete this category? Please note that deleting a category will also permanently remove all products associated with it.
Proceed with caution⚠️`,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => deleteCategory(categoryId),
                    style: {
                        backgroundColor: '#ff0000', // Change to your desired color
                        color: '#ffffff' // Change text color if needed
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => close()
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],

        });


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

        </div>
    );
};

export default AddCategory;

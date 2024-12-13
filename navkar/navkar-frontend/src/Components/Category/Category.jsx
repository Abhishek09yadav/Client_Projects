import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Category.css';
import Item from '../item/item';
import html2pdf from 'html2pdf.js';
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { ShopContext } from '../../Context/ShopContext'; // Import the context
import signanureimg from "../Assets/signature.jpeg";
import cross_icon from "../Assets/cross_icon.png";
const Category = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);

    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // Store all products across categories
    const [products, setProducts] = useState([]); // Products for current category
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProducts, setSelectedProducts] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const { userDetails } = useContext(ShopContext);
    const handleOnClick = () => {
        const element = document.querySelector('#generate-pdf');
        var opt = {
            margin:       1,
            filename:   `${userDetails?.name}.pdf`, // 'myfile.pdf',
            // image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

// New Promise-based usage:
        html2pdf().set(opt).from(element).save();
        console.log("PDF button clicked");
        // html2pdf(element);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/categories');
                const productsResponse = await axios.get('http://localhost:4000/allproducts');

                const categoriesData = response.data;
                const productsData = productsResponse.data;

                setCategories(categoriesData);
                setAllProducts(productsData);

                // Automatically select the first category and fetch its products
                if (categoriesData.length > 0) {
                    const firstCategory = categoriesData[0].category;
                    setSelectedCategory(firstCategory);

                    const categoryProducts = productsData.filter(
                        product => product.category === firstCategory
                    );
                    setProducts(categoryProducts);
                }
            } catch (error) {
                console.error("Error fetching categories or products:", error);
            }
        };

        fetchCategories();
    }, []);


    const fetchProductsByCategory = (category) => {
        setSelectedCategory(category);
        const categoryProducts = allProducts.filter(product => product.category === category);
        setProducts(categoryProducts);
    };

    const handleProductSelection = (productId, isChecked) => {
        setSelectedProducts((prevSelectedProducts) => {
            const newSelectedProducts = { ...prevSelectedProducts };

            if (isChecked) {
                newSelectedProducts[productId] = { quantity: 1 };
            } else {
                delete newSelectedProducts[productId];
            }

            // Calculate totalQuantity based on the updated state
            const updatedQuantity = Object.values(newSelectedProducts).reduce((acc, product) => acc + product.quantity, 0);
            setTotalQuantity(updatedQuantity);

            return newSelectedProducts;
        });
    };


    const handleQuantityChange = (productId, quantity) => {
        const parsedQuantity = Math.max(0, parseInt(quantity, 10) || 0);

        setSelectedProducts((prevSelectedProducts) => {
            const newSelectedProducts = { ...prevSelectedProducts };

            if (newSelectedProducts[productId]) {
                newSelectedProducts[productId].quantity = parsedQuantity;
            }

            // Recalculate totalQuantity directly
            const updatedQuantity = Object.values(newSelectedProducts).reduce((acc, product) => acc + product.quantity, 0);
            setTotalQuantity(updatedQuantity);

            return newSelectedProducts;
        });
    };


    const generateQuery = () => {
        if (!userDetails) {
            alert("Please log in to continue.");
            return;
        }
        let total = 0;
        const selectedItems = Object.keys(selectedProducts).map((productId) => {
            const product = allProducts.find(item =>
                item.id === Number(productId) || item._id === productId
            );
            if (!product) {
                console.error(`Product with ID ${productId} not found.`);
                return null;
            }
            const quantity = parseInt(selectedProducts[productId].quantity, 10);
            const price = product.new_price;
            // Convert Tax to a number, default to 0 if not a valid number
            const tax = parseFloat(product?.Tax || 0);
            // const tax = (price * taxRate) / 100;
            const itemTotal = (price + tax) * quantity; // Price + Tax
            total += itemTotal;
            // var  TotalTax = tax*quantity;
            //  TotalTax = TotalTax.toFixed(2);
            const TotalTax = tax;
            return {
                name: product.name,
                quantity,
                price,
                totalPrice: itemTotal,
                category: product.category,
                TotalTax, // convert to number
            };
        }).filter(item => item !== null);

        setTotalPrice(total);
        setSelectedItems(selectedItems);
        setIsModalOpen(true);
    };

    // console.log("user details ", userDetails)
    return (
        <div className={'Category'}>
            <h1>Categories</h1>
            <hr />
            <div className="category-container">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category-pill ${selectedCategory === category.category ? "active" : ""}`}
                        onClick={() => fetchProductsByCategory(category.category)}
                    >
                        {category.category}
                    </div>
                ))}

            </div>
            {selectedCategory && (
                <div>

                    {products.length > 0 ? (
                        <>
                            <h1>Products in {selectedCategory}</h1>
                            <div className="products-grid">
                                {products.map((item) => (
                                    <div key={item.id} className="product-item">
                                        <Item
                                            id={item.id}
                                            name={item.name}
                                            image={item.image}
                                            new_price={item.new_price}
                                            old_price={item.old_price}
                                            MOQ={item.MOQ}
                                        />
                                        <input
                                            type="checkbox"
                                            checked={!!selectedProducts[item.id]}
                                            onChange={(e) => handleProductSelection(item.id, e.target.checked)}
                                        />
                                        {selectedProducts[item.id] && (
                                            <div className={'Quantity-field'}>
                                                <p>Quantity: </p>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={selectedProducts[item.id].quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No products found for this category.</p>
                    )}
                </div>
            )}

            <button
                className="query-generator-button"
                onClick={generateQuery}
            >
                Generate Quotation
                {totalQuantity > 0 && (
                    <span
                        style={{
                            position: 'absolute',
                            right: '10px',
                            backgroundColor: 'white',
                            color: 'red',
                            borderRadius: '50%',
                            padding: '6px 15px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                    >
       Net Quantity: {totalQuantity}
    </span>
                )}
            </button>
            {totalPrice > 0 && (
                <div className="total-price">
                    <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                </div>
            )}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Selected Products</h3>
                        <div id={"generate-pdf"}>
                        <Link to={'/'} className="nav-logo" style={{textDecoration: 'none'}}>
                                <img src={logo} alt="logo"/>
                                <p>NAVKAR</p>
                            </Link>
                            <div className="details">
                                <div className="company-details-box">
                                    <p className={"company-details"}>Contact: 1234</p>
                                    <p className={"company-details"}>mail: 1234@nav.com</p>
                                    <p className={"company-details"}>Address: 1234</p>
                                </div>
                                <div className="customer-details-box">
                                    <div>
                                        {userDetails ? (
                                            <div>
                                                <p className={"customer-details"}>Name: {userDetails.name}!</p>
                                                <p className={"customer-details"}>Email: {userDetails.email}</p>
                                                <p className={"customer-details"}>State: {userDetails.state}</p>
                                                <p className={"customer-details"}>City: {userDetails.city}</p>
                                                <p className={"customer-details"}>Phone No.: {userDetails.phoneNo}</p>

                                            </div>
                                        ) : (
                                            <p>Loading user details...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <table className="selected-products-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Tax</th>
                                    <th>Total Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.category}</td>
                                        <td>₹{isNaN(item.price) ? '0.00' : item.price.toFixed(2)}</td>
                                        <td>{isNaN(item.TotalTax) ? '0.00' : item.TotalTax}</td>
                                        <td>₹{item.totalPrice.toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="total-price">
                                <p><strong>Final Total: ₹{totalPrice.toFixed(2)}</strong></p>
                            </div>
                            {totalQuantity > 0 && (
                                <div className="total-quantity">
                                    <p>Total Quantity: {totalQuantity}</p>
                                </div>
                            )}

                            <h3>Sign: <img src={signanureimg} className={'signature'}/></h3>
                        </div>
                        {/*pdf generation ends here*/}
                        <button onClick={handleOnClick}>PDF</button>
                        {/*<button onClick={() => setIsModalOpen(false)}>Close</button>*/}
                        <img
                            src={cross_icon}
                            alt="Close"
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                cursor: 'pointer',
                                width: '20px',
                                height: '20px',
                            }}
                        />

                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;

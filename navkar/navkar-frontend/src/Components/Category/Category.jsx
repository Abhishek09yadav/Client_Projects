import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import './Category.css';
import Item from '../item/item';
import html2pdf from 'html2pdf.js';
import logo from "../Assets/logo.png";
import {ShopContext} from '../../Context/ShopContext'; // Import the context
import signanureimg from "../Assets/signature.jpeg";
import cross_icon from "../Assets/cross_icon.png";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import no_products_found from "../Assets/no_products_found.jpeg"

const url = process.env.REACT_APP_API_URL;
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
    const {userDetails, categoryRef} = useContext(ShopContext);
    const notify = () => toast("Wow so easy!");

    const handleOnClick = async () => {
        try {
            const element = document.querySelector('#generate-pdf');
            const opt = {
                margin: 1,
                filename: `${userDetails?.name}_quotation.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generate the PDF and download it directly
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate the quotation.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}/categories`);
                const productsResponse = await axios.get(`${url}/allproducts`);

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

    const onProductSelect = (productId, initialQuantity, isChecked) => {

        setSelectedProducts((prevSelectedProducts) => {
            const newSelectedProducts = { ...prevSelectedProducts };

            if (isChecked) {
                newSelectedProducts[productId] = {quantity: initialQuantity};
            } else {
                delete newSelectedProducts[productId];
            }

            // Calculate totalQuantity based on the updated state
            const updatedQuantity = Object.values(newSelectedProducts).reduce((acc, product) => acc + product.quantity, 0);
            setTotalQuantity(updatedQuantity);

            return newSelectedProducts;
        });
    };


    const onQuantityChange = (productId, quantity, MOQ) => {
        const parsedQuantity = Math.max(0, parseInt(quantity, 10) || 0);
        if (!userDetails) {
            toast.warn("please login to continue");
        }
        if (quantity < MOQ) {
            toast.warn(`Current Quantity: ${quantity} is below the Minimum Order Quantity of ${MOQ}`, {
                // position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
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


    const generateQuery = async () => {
        if (!userDetails) {
            toast.warn("Please log in to continue.");
            return;
        }
        if (Object.keys(selectedProducts).length === 0) {
            toast.warn("No products selected. Please select a product to generate the quotation.");
            return;
        }

        // First check all MOQs before calculating anything
        let hasInvalidQuantities = false;
        Object.keys(selectedProducts).forEach((productId) => {
            const product = allProducts.find(item =>
                item.id === Number(productId) || item._id === productId
            );
            if (product) {
                const quantity = parseInt(selectedProducts[productId].quantity, 10);
                if (quantity < product.MOQ) {
                    toast.error(`Quantity for ${product.name} is below the Minimum Order Quantity of ${product.MOQ}.`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    hasInvalidQuantities = true;
                }
            }
        });

        // If any product has invalid quantity, stop here
        if (hasInvalidQuantities) {
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
            const taxPercentage = product?.Tax;

            const tax = (price * taxPercentage) / 100;
            const itemTotal = (price * quantity) + (tax * quantity);
            total += itemTotal;
            const TotalTax = tax * quantity;

            return {
                name: product.name,
                quantity,
                price,
                totalPrice: itemTotal,
                category: product.category,
                Tax: product.Tax,
            };
        }).filter(item => item !== null);

        setTotalPrice(total);
        setSelectedItems(selectedItems);
        setIsModalOpen(true);

        // Delay PDF generation and upload
        setTimeout(async () => {
            try {
                const element = document.querySelector('#generate-pdf');
                const opt = {
                    margin: 1,
                    filename: `${userDetails?.name}_quotation.pdf`,
                    html2canvas: {scale: 2},
                    jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
                };

                // Generate the PDF as a Blob
                const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');

                // Create FormData and append the PDF file
                const formData = new FormData();
                const pdfFile = new File([pdfBlob], `${userDetails?.name}.pdf`, {type: 'application/pdf'});
                formData.append('quotation', pdfFile);
                formData.append('userId', userDetails._id);

                // Upload the PDF to the server
                const response = await axios.post(`${url}/uploadQuotation`, formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                });

                if (response.data.success) {
                    toast.success(`Quotation Generated successfully`);
                }
            } catch (error) {
                console.error('Error generating or uploading PDF:', error);
                toast.error('Failed to upload the quotation.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }, 1000);
    };


    return (
        <div ref={categoryRef} className={'Category'}>
            <ToastContainer/>
            <h1>Categories</h1>
            <div className="category-container">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category-pill ${selectedCategory === category.category ? "active" : ""}`}
                        onClick={() => fetchProductsByCategory(category.category)}
                    >
                        <span className={'pill-text'}>  {category.category}    </span>
                    </div>
                ))}
            </div>
            {selectedCategory && (
                <div>
                    {products.length > 0 ? (
                        <>
                            <span className={'products-in'}>Products in {selectedCategory}</span>
                            <div className="products-grid">
                                {products.map((item) => (
                                    <Item
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        image={item.image}
                                        new_price={item.new_price}
                                        old_price={item.old_price}
                                        MOQ={item.MOQ}
                                        isSelected={!!selectedProducts[item.id]}
                                        onProductSelect={onProductSelect}
                                        onQuantityChange={onQuantityChange}
                                        selectedQuantity={selectedProducts[item.id]?.quantity || item.MOQ}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <img className={'no_products_found'} src={no_products_found} alt={''}/>
                        // <p>No products found for this category.</p>
                    )}
                </div>
            )}

            <div className="net-quantity-container">
                <span className="net-quantity">Net Quantity: {totalQuantity}</span>
                <button
                    className="query-generator-button"
                    onClick={generateQuery}
                >
                    Generate Quotation
                </button>
            </div>


            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">

                        <div id={"generate-pdf"}>
                            <div className="nav-logo-container" style={{textDecoration: 'none'}}>
                                <img src={logo} style={{maxWidth: "90px"}} alt="logo"/>
                                <p>NAVKAR</p>
                            </div>
                            <div className="details">
                                <div className="company-details-box">
                                    <p className={"company-details"}>Contact: 02646221638</p>
                                    <p className={"company-details"}>Email: shrinavkar@gmail.com</p>
                                    <p className={"company-details"}>Address: F-7, Arunoday Complex,<br/> GIDC
                                        Ankleshwar - 393002 Gujarat (India)</p>
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
                                        <td>{item.Tax}</td>
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

                            <h3 className={'signature'}>Sign: <img src={signanureimg} className={'signature'}/></h3>
                        </div>
                        <button onClick={handleOnClick}>Download PDF</button>
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

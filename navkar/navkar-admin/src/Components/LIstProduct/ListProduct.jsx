import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';
import edit_icon from '../../assets/edit_icon.svg';
import AddProduct from '../AddProduct/AddProduct';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

Modal.setAppElement('#root'); // Adjust if your app's root element has a different id

const url = import.meta.env.VITE_API_URL;

function ListProduct() {
    const [allProducts, setAllProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const fetchInfo = async () => {
        const response = await fetch(`${url}/allproducts`);
        const data = await response.json();
        setAllProducts(data);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProductModal = async (id, name) => {
        confirmAlert({
            title: 'Delete Product Confirmation',
            message: `Are you certain you wish to permanently delete Product ${name}? Please note that this action is irreversible.`,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => removeProduct(id),
                    style: {
                        backgroundColor: '#ff0000',
                        color: '#ffffff' 
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
            willUnmount: () => {
            },
            afterClose: () => {
            },
            onClickOutside: () => {
            },
            onKeypress: () => {
            },
            onKeypressEscape: () => {
            },
            overlayClassName: "overlay-custom-class-name"
        });

    };
    const removeProduct = async (id) => {
        await fetch(`${url}/removeProduct`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        await fetchInfo();
    }


    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
        fetchInfo();
    };

    // const handleAddNew = () => {
    //     setSelectedProduct(null);
    //     setShowModal(true);
    // };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const customModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            maxWidth: '90%',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    // Calculate paginated products
    const offset = currentPage * itemsPerPage;
    const paginatedProducts = allProducts.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allProducts.length / itemsPerPage);

    return (
        <>
            <div className="ListProduct">
                <div className="ListProduct-header">
                    <h1>All Products List</h1>
                </div>
                <div className="ListProduct-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    {/* <p>Old Price</p> */}
                    <p> Price</p>
                    <p>Category</p>
                    <p>Edit</p>
                    <p>Remove</p>
                </div>
                <div className="ListProduct-allproducts">
                    <hr/>
                    {paginatedProducts.map((product, index) => (
                        <div key={index} className="ListProduct-format-main ListProduct-format">
                            <img src={`${url}${product.image}`} alt="" className="ListProduct-product-icon"/>
                            <p>{' '}{product.name}</p>
                            {/* <p>₹{product.old_price}</p> */}
                            <p>₹{product.new_price}</p>
                            <p>{product.category}</p>
                            <img
                                className="ListProduct-remove-icon"
                                src={edit_icon}
                                onClick={() => handleEdit(product)}
                                alt="Edit"
                            />
                            <img
                                className="ListProduct-remove-icon"
                                src={cross_icon}
                                onClick={() => removeProductModal(product.id, product.name)}
                                alt="Remove"
                            />
                        </div>
                    ))}
                </div>
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel="..."
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={25}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
            <Modal
                classname={'Modal-main-container'}
                isOpen={showModal}
                onRequestClose={handleModalClose}
                style={customModalStyles}
                contentLabel="Product Modal"
            >
                <button
                    onClick={handleModalClose}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                    }}
                >
                    <img src={cross_icon} alt="" className="ListProduct-icon"/>

                </button>
                <AddProduct
                    product={selectedProduct}
                    onClose={handleModalClose}
                    isEdit={!!selectedProduct}
                />
            </Modal>
        </>
    );
}

export default ListProduct;

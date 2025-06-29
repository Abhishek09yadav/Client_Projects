import React, {useCallback, useContext, useEffect, useState} from 'react';
import {debounce} from "lodash";
import axios from 'axios';
import './Category.css';
import Item from '../item/item';
import {ShopContext} from '../../Context/ShopContext';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import no_products_found from "../Assets/no_products_found.jpeg";
import CategoryModal from "./CategoryModal"; // Import the new QuotationModal component
import html2pdf from 'html2pdf.js';
import SelectedItemsModal from './SelectedItemsModal';
import {FaEye} from 'react-icons/fa';
import Spinner from "../spinner/Spinner"

const url = process.env.REACT_APP_API_URL;
const Category = () => {
    const [isSelectedItemsModalOpen, setIsSelectedItemsModalOpen] = useState(false);

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProducts, setSelectedProducts] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const {userDetails, categoryRef} = useContext(ShopContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${url}/categories`);
                const productsResponse = await axios.get(`${url}/allproducts`);

                const categoriesData = response.data;
                const productsData = productsResponse.data;

                setCategories(categoriesData);
                setAllProducts(productsData);

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
            } finally {
                setLoading(false);
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
        if (!userDetails) {
            toast.warn("Please login to continue");
            return;
        }

        setSelectedProducts((prevSelectedProducts) => {
            const newSelectedProducts = { ...prevSelectedProducts };

            if (isChecked) {
                newSelectedProducts[productId] = {quantity: initialQuantity};
            } else {
                delete newSelectedProducts[productId];
            }

            const updatedQuantity = Object.values(newSelectedProducts).reduce(
                (acc, product) => acc + (Number(product.quantity) || 0),
                0
            );

            setTotalQuantity(updatedQuantity);
            return newSelectedProducts;
        });
    };
    const debouncedToast = useCallback(
        debounce((quantity, MOQ) => {
            toast.warn(`Quantity: ${quantity} is below the Minimum Order Quantity of ${MOQ}`, {
                autoClose: 2000,
            });
        }, 500),
        []
    );
    const onQuantityChange = (productId, quantity, MOQ) => {
        const parsedQuantity = Math.max(0, parseInt(quantity, 10) || 0);
        if (!selectedProducts[productId]) {
            toast.warn('please select product first')
        }
        if (selectedProducts[productId] && parsedQuantity < MOQ) {
            debouncedToast(parsedQuantity, MOQ);
        } else {
            debouncedToast.cancel();
        }

        setSelectedProducts((prevSelectedProducts) => {
            const newSelectedProducts = { ...prevSelectedProducts };

            if (newSelectedProducts[productId]) {
                newSelectedProducts[productId].quantity = parsedQuantity;
            }

            const updatedQuantity = Object.values(newSelectedProducts).reduce(
                (acc, product) => acc + (product.quantity || 0),
                0
            );

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
        toast.warn(
          "No products selected. Please select a product to generate the quotation."
        );
        return;
      }

      let hasInvalidQuantities = false;
      Object.keys(selectedProducts).forEach((productId) => {
        const product = allProducts.find(
          (item) => item.id === Number(productId) || item._id === productId
        );
        if (product) {
          const quantity = parseInt(selectedProducts[productId].quantity, 10);
          if (quantity < product.MOQ) {
            toast.error(
              `Quantity for ${product.name} is below the Minimum Order Quantity of ${product.MOQ}.`
            );
            hasInvalidQuantities = true;
          }
        }
      });

      if (hasInvalidQuantities) return;

      let total = 0;
      const selectedItems = Object.keys(selectedProducts)
        .map((productId) => {
          const product = allProducts.find(
            (item) => item.id === Number(productId) || item._id === productId
          );
          if (!product) {
            console.error(`Product with ID ${productId} not found.`);
            return null;
          }

          const quantity = parseInt(selectedProducts[productId].quantity, 10);
          const price = product.new_price;
          const taxPercentage = product?.Tax;

          const tax = (price * taxPercentage) / 100;
          const itemTotal = price * quantity + tax * quantity;
          total += itemTotal;

          return {
            _id: product._id,
            name: product.name,
            quantity,
            price,
            totalPrice: itemTotal,
            category: product.category,
            Tax: product.Tax,
          };
        })
        .filter((item) => item !== null);

      setTotalPrice(total);
      setSelectedItems(selectedItems);
      setIsModalOpen(true);

      try {
        const response = await axios.post(`${url}/api/uploadQuotation`, {
          user: {
            id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
          },
          products: selectedItems,
          totalPrice: total,
        });

        if (response.data.success) {
          toast.success("Quotation details sent successfully.");
        } else {
          toast.error("Failed to send quotation details.");
        }
      } catch (error) {
        console.error("Error sending quotation details:", error);
        toast.error("Failed to send quotation details.");
      }
    };
    

    return (
        <div ref={categoryRef} className={'Category container-md p-0'}>
            <ToastContainer/>
            <h1 className={`text-white text-lg-start my-4 fs-3`}>Categories</h1>
            <div className="category-container p-0">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category-pill w-fit ${selectedCategory === category.category ? "active" : ""}`}
                        onClick={() => fetchProductsByCategory(category.category)}

                    >
                        <span className={'pill-text'}>  {category.category}    </span>
                    </div>
                ))}
            </div>
            {loading ? <Spinner paragraph={'Loading Products...'}/> : selectedCategory && (
                <div>
                    {products.length > 0 ? (
                        <>
                            <span className={'products-in text-white'}>Products in {selectedCategory}</span>
                            <div
                                className="products-grid d-flex flex-wrap justify-content-xl-between justify-content-center gap-5">
                                {products.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={index === products.length - 1 ? 'last-item' : ''}
                                    >
                                        <Item
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
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <img className={'no_products_found'} src={no_products_found} alt={''}/>
                    )}
                </div>

            )}


            <div className="net-quantity-container ">
                <div className={`container-md  d-flex justify-content-end gap-5 align-items-center`}>
                    <button
                        className="btn d-none d-sm-block  btn-light d-flex align-items-center gap-2"
                        onClick={() => {
                            if (totalQuantity < 1) toast.warning('No products Selected');
                            else if (userDetails) setIsSelectedItemsModalOpen(true);
                            // else if(!userDetails || userDetails.length === 0) toast.warning('please login first');

                        }}
                    >
                        <FaEye/>
                        View Selected Items
                    </button>
                    <div className={'d-flex flex-row align-items-center gap-5 '}>
                        <div className="net-quantity ">Net Quantity: {totalQuantity}</div>
                        <button
                            className="query-generator-button p-3 h-100 "
                            onClick={generateQuery}
                        >
                            Request Quotation
                        </button>
                    </div>
                </div>
            </div>

            <CategoryModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedItems={selectedItems}
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
                userDetails={userDetails}
            />
            <SelectedItemsModal
                isModalOpen={isSelectedItemsModalOpen}
                setIsModalOpen={setIsSelectedItemsModalOpen}
                selectedProducts={selectedProducts}
                allProducts={allProducts}
            />
        </div>
    );
};

export default Category;
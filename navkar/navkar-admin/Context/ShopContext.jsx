import React, {createContext, useEffect, useState} from 'react';

const url = import.meta.env.VITE_API_URL;


export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const authToken = localStorage.getItem("auth-token");
    const [all_product, setAll_Product] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [triggerFetchingUserDetails, setTriggerFetchingUserDetails] = useState(false);
    // Function to fetch user details


    useEffect(() => {
        const fetchUserDetails = async () => {
            if (authToken) {
                try {
                    const response = await fetch(`${url}/getUserDetails`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            'auth-token': authToken,
                            'Content-Type': "application/json",
                        },
                        body: "",
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserDetails(data.userDetails); // Update state with user details
                        console.log("Fetched User Details:", data.userDetails);
                    } else {
                        console.error("Failed to fetch user details:", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };
        fetchUserDetails();
    }, [authToken, triggerFetchingUserDetails]);


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${url}/allproducts`);
            const data = await response.json();
            setAll_Product([...data]);


        }
        fetchProducts();
    }, [authToken]);


    const contextValue = {all_product, userDetails, setTriggerFetchingUserDetails, authToken}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
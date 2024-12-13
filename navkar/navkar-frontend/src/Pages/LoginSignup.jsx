import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    const url = process.env.REACT_APP_API_URL;
    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        state: '',
        city: '',
        phoneNo: ''
    });

    const [state, setState] = useState("Login");

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("form data ",formData)
    };

    const Login = async () => {
        console.log('Logging in...', formData);
        let responseData;
        await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(res => res.json()).then(data => {
            responseData = data;
        });
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.error);
            console.log('responseData', responseData);
        }
    };

    const SignUp = async () => {
        if (!formData.username || !formData.email || !formData.password) {
            alert('All fields are required');
            return;
        }
        console.log('Signing up...', formData);
        let responseData;
        await fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(res => res.json()).then(data => {
            responseData = data;
        });
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.error);
            console.log('responseData', responseData);
        }
    };

    return (
        <div className="login-signup">
            <div className="login-signup-container">
                <h1>{state}</h1>
                <div className="login-signup-fields">
                    {state === 'SignUp' && (
                        <>
                            <input
                                onChange={changeHandler}
                                name="username"
                                value={formData.username}
                                type="text"
                                placeholder="Your Name"
                            />
                            <select
                                name="state"
                                value={formData.state}
                                onChange={changeHandler}
                                className="dropdown"
                            >
                                <option value="" disabled>Select State</option>
                                {indianStates.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={changeHandler}
                                placeholder="Your City"
                            />
                            <input
                                type="text"
                                name="phoneNo"
                                value={formData.phoneNo}
                                onChange={changeHandler}
                                placeholder="Your Phone Number"
                            />
                        </>
                    )}
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Your Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="Your Password"
                    />
                </div>
                <button
                    onClick={() => {
                        state === 'Login' ? Login() : SignUp();
                    }}
                    className="btn btn-lg login-signup-button"
                >
                    {state}
                </button>
                {state === 'SignUp' ? (
                    <p className="login-signup-login">
                        Already have an account{' '}
                        <span onClick={() => setState('Login')}>Login</span>
                    </p>
                ) : (
                    <p className="login-signup-login">
                        Create an account{' '}
                        <span onClick={() => setState('SignUp')}>Sign Up</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;

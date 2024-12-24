import React, {useState} from 'react';
import './CSS/LoginSignup.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [otpState, setOtpState] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const [state, setState] = useState("Login");
    const [forgotPasswordState, setForgotPasswordState] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [disableLoginSignupButtonAfterOTP, setDisableLoginSignupButtonAfterOTP] = useState(false);
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const Login = async () => {
        console.log('Logging in...', formData);
        try {
            const response = await fetch(`${url}/api/otp/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace('/');
            } else {
                alert(responseData.error);
                console.log('responseData', responseData);
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Login failed. Please try again.');
        }
    };

    const SignUp = async () => {
        if (!formData.username || !formData.email || !formData.city || !formData.phoneNo || !formData.password) {
            alert('All fields are required');
            return;
        }


        try {
            // Request OTP
            const response = await fetch(`${url}/api/otp/request-otp`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await response.json();

            if (data.success) {
                setOtpState(true); // Show OTP input
                toast.info('OTP sent please check your mail for OTP.');
                setDisableLoginSignupButtonAfterOTP(true);
                setTimeout(() => {
                    setDisableLoginSignupButtonAfterOTP(prev => !prev)
                }, 60000);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('OTP Request Error:', error);
            alert('Failed to send OTP');
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await fetch(`${url}/api/otp/verify-otp`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    otp: otpInput
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success("OTP verified successfully!");
                localStorage.setItem('auth-token', data.token);
                window.location.replace('/');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('OTP Verification Error:', error);
            alert('OTP verification failed');
        }
    };

    const requestForgotPasswordOTP = async () => {
        if (!formData.email) {
            alert('Please enter your email');
            return;
        }

        try {
            const response = await fetch(`${url}/api/otp/forgot-password-otp`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await response.json();

            if (data.success) {
                setOtpState(true);
                toast.info('OTP sent please check your mail for OTP.');
                setDisableLoginSignupButtonAfterOTP(true);
                setTimeout(() => {
                    setDisableLoginSignupButtonAfterOTP(prev => !prev)
                }, 60000);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Forgot Password OTP Request Error:', error);
            alert('Failed to send OTP');
        }
    };

    const resetPassword = async () => {
        if (!otpInput || !newPassword) {
            alert('Please enter OTP and new password');
            return;
        }

        try {
            const response = await fetch(`${url}/api/otp/reset-password`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: otpInput,
                    newPassword: newPassword
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('Password reset successfully');
                setForgotPasswordState(false);
                setOtpState(false);
                setState('Login');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Password Reset Error:', error);
            alert('Failed to reset password');
        }
    };

    return (
        <div className="login-signup">
            <ToastContainer/>
            <div className="login-signup-container">
                <h1>
                    {forgotPasswordState
                        ? 'Forgot Password'
                        : state}
                </h1>
                <div className="login-signup-fields">
                    {/* Signup Fields */}
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
                            {otpState && (
                                <div className="otp-verification">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otpInput}
                                        onChange={(e) => setOtpInput(e.target.value)}
                                        maxLength={6}
                                    />
                                    <button onClick={verifyOTP}>Verify OTP</button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Login and Forgot Password Email Field */}
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Your Email"
                    />

                    {/* Forgot Password OTP and New Password Fields */}
                    {forgotPasswordState && otpState && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otpInput}
                                onChange={(e) => setOtpInput(e.target.value)}
                                maxLength={6}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </>
                    )}

                    {/* Password Field for Login and Signup */}
                    {!forgotPasswordState && (
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Your Password"
                        />
                    )}
                </div>

                <button
                    disabled={disableLoginSignupButtonAfterOTP}
                    onClick={() => {
                        if (forgotPasswordState) {
                            if (!otpState) {
                                requestForgotPasswordOTP();
                            } else {
                                resetPassword();
                            }
                        } else {
                            state === 'Login' ? Login() : SignUp();
                        }
                    }}
                    className="btn btn-lg login-signup-button"
                >
                    {forgotPasswordState
                        ? (otpState ? 'Reset Password' : 'Send OTP')
                        : state}
                </button>

                {/* Navigation and Forgot Password Links */}
                {!forgotPasswordState ? (
                    state === 'SignUp' ? (
                        <p className="login-signup-login">
                            Already have an account{' '}
                            <span onClick={() => setState('Login')}>Login</span>
                        </p>
                    ) : (
                        <div className="login-signup-links">
                            <p className="login-signup-login">
                                Create an account{' '}
                                <span onClick={() => setState('SignUp')}>Sign Up</span>
                            </p>
                            <p className="login-signup-login">
                                <span onClick={() => {
                                    setState('Login');
                                    setForgotPasswordState(true);
                                }}>
                                    Forgot Password?
                                </span>
                            </p>
                        </div>
                    )
                ) : (
                    <p className="login-signup-login">
                        <span onClick={() => {
                            setForgotPasswordState(false);
                            setOtpState(false);
                        }}>
                            Back to Login
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
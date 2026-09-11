// src/pages/Register.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/Register.css";


const Register = () => {

    const navigate = useNavigate();


    // =========================================
    // STATES
    // =========================================

    const [name, setName] = useState("");

    const [phone, setPhone] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =========================================
    // REGISTER
    // =========================================

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");


        // =====================================
        // VALIDATION
        // =====================================

        if (
            !name ||
            !phone ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please fill all fields"
            );

            return;
        }


        // =====================================
        // PHONE VALIDATION
        // =====================================

        if (!/^[0-9]{10}$/.test(phone)) {

            setError(
                "Phone number must contain 10 digits"
            );

            return;
        }


        // =====================================
        // PASSWORD VALIDATION
        // =====================================

        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters"
            );

            return;
        }


        // =====================================
        // CONFIRM PASSWORD
        // =====================================

        if (password !== confirmPassword) {

            setError(
                "Passwords do not match"
            );

            return;
        }


        try {

            setLoading(true);


            // =====================================
            // SEND DATA TO BACKEND
            // =====================================

            const response = await fetch(
                "https://sjb-backend-01lg.onrender.com/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name.trim(),
                        phone: phone,
                        password: password
                    })
                }
            );


            const data = await response.json();


            // =====================================
            // REGISTER FAILED
            // =====================================

            if (
                !response.ok ||
                !data.success
            ) {

                setError(
                    data.message ||
                    "Registration failed"
                );

                return;
            }


            // =====================================
            // REGISTER SUCCESS
            // =====================================

            setSuccess(
                "Account created successfully! Redirecting to login..."
            );


            // =====================================
            // REDIRECT TO LOGIN
            // =====================================

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            console.error(
                "REGISTER ERROR:",
                error
            );

            setError(
                "Unable to connect to server"
            );


        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // JSX
    // =========================================

    return (

        <main className="register-page">


            {/* =================================
                REGISTER CARD
            ================================= */}

            <section className="register-card">


                {/* =================================
                    BRAND
                ================================= */}

                <div className="register-brand">

                    <span className="register-line"></span>

                    <h1>
                        J COLLECTIONS
                    </h1>

                    <span className="register-line"></span>

                </div>


                {/* =================================
                    HEADING
                ================================= */}

                <div className="register-heading">

                    <h2>
                        Create Account
                    </h2>

                </div>


                {/* =================================
                    FORM
                ================================= */}

                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >


                    {/* =================================
                        NAME
                    ================================= */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            autoComplete="name"
                        />

                    </div>


                    {/* =================================
                        PHONE
                    ================================= */}

                    <div className="form-group">

                        <label htmlFor="phone">
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            type="tel"
                            inputMode="numeric"
                            value={phone}
                            onChange={(e) =>
                                setPhone(
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            placeholder="Enter 10 digit phone number"
                            maxLength="10"
                            autoComplete="tel"
                        />

                    </div>


                    {/* =================================
                        PASSWORD
                    ================================= */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter password"
                            autoComplete="new-password"
                        />

                    </div>


                    {/* =================================
                        CONFIRM PASSWORD
                    ================================= */}

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Re-enter password"
                            autoComplete="new-password"
                        />

                    </div>


                    {/* =================================
                        ERROR MESSAGE
                    ================================= */}

                    {error && (

                        <div className="register-error">
                            {error}
                        </div>

                    )}


                    {/* =================================
                        SUCCESS MESSAGE
                    ================================= */}

                    {success && (

                        <div className="register-success">
                            {success}
                        </div>

                    )}


                    {/* =================================
                        REGISTER BUTTON
                    ================================= */}

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Register"
                        }

                    </button>

                </form>


                {/* =================================
                    LOGIN SECTION
                ================================= */}

                <div className="login-section">

                    <p>
                        Already have an account?
                    </p>

                    <Link to="/login">
                        Login
                    </Link>

                </div>


            </section>

        </main>
    );
};


export default Register;
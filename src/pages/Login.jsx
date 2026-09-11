import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {

    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        // ==============================
        // VALIDATION
        // ==============================

        if (!phone || !password) {

            setError(
                "Please enter phone number and password"
            );

            return;
        }


        if (!/^[0-9]{10}$/.test(phone)) {

            setError(
                "Please enter a valid 10 digit phone number"
            );

            return;
        }


        try {

            setLoading(true);


            // ==============================
            // LOGIN API
            // ==============================

            const response = await fetch(
                "https://sjb-backend-01lg.onrender.com/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        phone: phone,
                        password: password
                    })
                }
            );


            const data = await response.json();


            // ==============================
            // LOGIN FAILED
            // ==============================

            if (!response.ok || !data.success) {

                setError(
                    data.message ||
                    "Invalid phone number or password"
                );

                return;
            }


            // ==============================
            // SAVE JWT
            // ==============================

            localStorage.setItem(
                "token",
                data.token
            );


            // Save user information

            if (data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

            }


            // ==============================
            // LOGIN SUCCESS
            // ==============================

            navigate("/sarees");


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            setError(
                "Unable to connect to server"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="login-page">


            {/* ==============================
                LOGIN CARD
            ============================== */}

            <section className="login-card">


                {/* BRAND */}

                <div className="login-brand">

                    <span className="login-line"></span>

                    <h1>
                        J COLLECTIONS
                    </h1>

                    <span className="login-line"></span>

                </div>


                {/* TITLE */}

                <div className="login-heading">

                    <h2>
                        Login
                    </h2>
                </div>


                {/* FORM */}

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >


                    {/* PHONE */}

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


                    {/* PASSWORD */}

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
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="login-error">

                            {error}

                        </div>

                    )}


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>


                </form>


                {/* REGISTER */}

                <div className="register-section">

                    <p>
                        Don't have an account?
                    </p>

                    <Link to="/register">
                        Create Account
                    </Link>

                </div>


            </section>

        </main>

    );

};


export default Login;
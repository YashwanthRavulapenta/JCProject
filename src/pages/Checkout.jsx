import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";
import { loadRazorpay } from "../utils/razorpay";

// =====================================================
// BACKEND URL
// =====================================================

const API_URL = "https://sjb-backend-01lg.onrender.com";


// =====================================================
// CHECKOUT COMPONENT
// =====================================================

const Checkout = () => {

    const navigate = useNavigate();

    // =====================================================
    // SHIPPING ADDRESS
    // =====================================================

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });


    // =====================================================
    // LOADING
    // =====================================================

    const [loading, setLoading] = useState(false);


    // =====================================================
    // ERROR
    // =====================================================

    const [error, setError] = useState("");


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setShippingAddress((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // =====================================================
    // PAY NOW
    // =====================================================

    const handlePayment = async () => {

        try {

            setError("");
            setLoading(true);


            // =================================================
            // 1. CHECK LOGIN TOKEN
            // =================================================

            const token = localStorage.getItem("token");

            if (!token) {

                setError(
                    "Please login before placing an order."
                );

                setLoading(false);

                return;
            }


            // =================================================
            // 2. LOAD RAZORPAY
            // =================================================

            const razorpayLoaded = await loadRazorpay();

            if (!razorpayLoaded) {

                setError(
                    "Razorpay failed to load. Please check your internet connection."
                );

                setLoading(false);

                return;
            }


            // =================================================
            // 3. CREATE ORDER
            // =================================================

            const orderResponse = await fetch(
                `${API_URL}/api/orders/create`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        shippingAddress
                    })
                }
            );


            // =================================================
            // READ RESPONSE SAFELY
            // =================================================

            const orderText = await orderResponse.text();

            let orderData;

            try {

                orderData = JSON.parse(orderText);

            } catch (parseError) {

                console.error(
                    "Order API returned non-JSON:",
                    orderText
                );

                throw new Error(
                    `Order creation failed. Server returned status ${orderResponse.status}.`
                );
            }


            // =================================================
            // 4. CHECK ORDER CREATION
            // =================================================

            if (
                !orderResponse.ok ||
                !orderData.success
            ) {

                setError(
                    orderData.message ||
                    "Unable to create order"
                );

                setLoading(false);

                return;
            }


            // =================================================
            // 5. RAZORPAY OPTIONS
            // =================================================

            const options = {

                key: orderData.key,

                amount: orderData.amount,

                currency: orderData.currency,

                name: "J Collections",

                description: "J Collections Order",

                order_id: orderData.razorpayOrderId,


                // =================================================
                // CUSTOMER DETAILS
                // =================================================

                prefill: {

                    name: shippingAddress.fullName,

                    contact: shippingAddress.phone

                },


                // =================================================
                // PAYMENT SUCCESS
                // =================================================

                handler: async (response) => {

                    try {

                        setError("");


                        console.log(
                            "Razorpay payment response:",
                            response
                        );


                        // =============================================
                        // VERIFY PAYMENT WITH BACKEND
                        // =============================================

                        const verifyResponse = await fetch(
                            `${API_URL}/api/payments/verify`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },

                                body: JSON.stringify({

                                    razorpay_payment_id:
                                        response.razorpay_payment_id,

                                    razorpay_order_id:
                                        response.razorpay_order_id,

                                    razorpay_signature:
                                        response.razorpay_signature

                                })
                            }
                        );


                        // =============================================
                        // READ RESPONSE SAFELY
                        // =============================================

                        const verifyText =
                            await verifyResponse.text();

                        let verifyData;

                        try {

                            verifyData =
                                JSON.parse(verifyText);

                        } catch (parseError) {

                            console.error(
                                "Payment verification returned non-JSON:",
                                verifyText
                            );

                            throw new Error(
                                `Payment verification API returned status ${verifyResponse.status}.`
                            );
                        }


                        console.log(
                            "Payment verification response:",
                            verifyData
                        );


                        // =============================================
                        // VERIFICATION FAILED
                        // =============================================

                        if (
                            !verifyResponse.ok ||
                            !verifyData.success
                        ) {

                            setError(
                                verifyData.message ||
                                "Payment verification failed"
                            );

                            setLoading(false);

                            return;
                        }


                        // =============================================
                        // PAYMENT SUCCESS
                        // =============================================

                        setLoading(false);

                        navigate(
                            `/order-success/${verifyData.orderId}`
                        );

                    } catch (error) {

                        console.error(
                            "Payment verification error:",
                            error
                        );

                        setError(
                            error.message ||
                            "Payment was completed, but verification failed. Please contact support."
                        );

                        setLoading(false);
                    }

                },


                // =================================================
                // RAZORPAY MODAL CLOSED
                // =================================================

                modal: {

                    ondismiss: () => {

                        setLoading(false);

                    }

                },


                // =================================================
                // RAZORPAY THEME
                // =================================================

                theme: {

                    color: "#8b5e3c"

                }

            };


            // =================================================
            // 6. CREATE RAZORPAY INSTANCE
            // =================================================

            const razorpay =
                new window.Razorpay(options);


            // =================================================
            // 7. PAYMENT FAILED
            // =================================================

            razorpay.on(
                "payment.failed",
                (response) => {

                    console.error(
                        "Payment failed:",
                        response.error
                    );

                    setError(
                        response.error?.description ||
                        "Payment failed. Please try again."
                    );

                    setLoading(false);

                }
            );


            // =================================================
            // 8. OPEN RAZORPAY
            // =================================================

            razorpay.open();


        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            setError(
                error.message ||
                "Something went wrong. Please try again."
            );

            setLoading(false);

        }

    };


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="checkout-page">

            <div className="checkout-container">


                {/* =============================================
                    PAGE TITLE
                ============================================= */}

                <h1>
                    Checkout
                </h1>


                {/* =============================================
                    SHIPPING ADDRESS
                ============================================= */}

                <div className="checkout-section">

                    <h2>
                        Delivery Address
                    </h2>


                    <div className="checkout-form">


                        {/* FULL NAME */}

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={
                                shippingAddress.fullName
                            }
                            onChange={
                                handleChange
                            }
                            autoComplete="name"
                        />


                        {/* PHONE */}

                        <input
                            type="tel"
                            name="phone"
                            placeholder="10 Digit Phone Number"
                            value={
                                shippingAddress.phone
                            }
                            onChange={(e) => {

                                const value =
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );

                                setShippingAddress(
                                    (previous) => ({
                                        ...previous,
                                        phone: value
                                    })
                                );

                            }}
                            maxLength="10"
                            autoComplete="tel"
                        />


                        {/* ADDRESS */}

                        <textarea
                            name="address"
                            placeholder="Complete Address"
                            value={
                                shippingAddress.address
                            }
                            onChange={
                                handleChange
                            }
                            autoComplete="street-address"
                        />


                        {/* CITY */}

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={
                                shippingAddress.city
                            }
                            onChange={
                                handleChange
                            }
                            autoComplete="address-level2"
                        />


                        {/* STATE */}

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={
                                shippingAddress.state
                            }
                            onChange={
                                handleChange
                            }
                            autoComplete="address-level1"
                        />


                        {/* PINCODE */}

                        <input
                            type="text"
                            name="pincode"
                            placeholder="6 Digit Pincode"
                            value={
                                shippingAddress.pincode
                            }
                            onChange={(e) => {

                                const value =
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );

                                setShippingAddress(
                                    (previous) => ({
                                        ...previous,
                                        pincode: value
                                    })
                                );

                            }}
                            maxLength="6"
                            autoComplete="postal-code"
                        />

                    </div>

                </div>


                {/* =============================================
                    ERROR MESSAGE
                ============================================= */}

                {error && (

                    <div className="checkout-error">

                        {error}

                    </div>

                )}


                {/* =============================================
                    PAY NOW
                ============================================= */}

                <button
                    type="button"
                    className="pay-now-button"
                    onClick={handlePayment}
                    disabled={loading}
                >

                    {loading
                        ? "Processing..."
                        : "Pay Now"
                    }

                </button>


            </div>

        </div>

    );

};


export default Checkout;
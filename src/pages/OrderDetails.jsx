import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/OrderDetails.css";

const API_URL = "https://sjb-backend-01lg.onrender.com";

const OrderDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // FETCH ORDER
    // =====================================================

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                // =============================================
                // CHECK LOGIN
                // =============================================

                if (!token) {

                    setError(
                        "Please login to view this order."
                    );

                    setLoading(false);

                    return;
                }


                // =============================================
                // GET ORDER
                // =============================================

                const response = await fetch(
                    `${API_URL}/api/orders/${id}`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


                // =============================================
                // READ RESPONSE SAFELY
                // =============================================

                const text =
                    await response.text();

                let data;

                try {

                    data = JSON.parse(text);

                } catch {

                    throw new Error(
                        `Server returned status ${response.status}`
                    );
                }


                // =============================================
                // CHECK RESPONSE
                // =============================================

                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to fetch order"
                    );
                }


                setOrder(data.order);


            } catch (error) {

                console.error(
                    "Fetch order error:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load order."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchOrder();

    }, [id]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="order-details-page">

                <div className="order-details-container">

                    <p className="order-details-loading">
                        Loading order details...
                    </p>

                </div>

            </div>
        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error || !order) {

        return (
            <div className="order-details-page">

                <div className="order-details-container">

                    <h1>
                        Order Details
                    </h1>

                    <div className="order-details-error">
                        {error || "Order not found"}
                    </div>

                    <button
                        className="back-orders-button"
                        onClick={() =>
                            navigate("/orders")
                        }
                    >
                        Back to My Orders
                    </button>

                </div>

            </div>
        );

    }


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const orderDate = new Date(
        order.createdAt
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );


    // =====================================================
    // FORMAT STATUS
    // =====================================================

    const paymentStatus =
        order.paymentStatus || "pending";

    const orderStatus =
        order.orderStatus || "pending";


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="order-details-page">

            <div className="order-details-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="order-details-header">

                    <div>

                        <h1>
                            Order Details
                        </h1>

                        <p>
                            Order placed on {orderDate}
                        </p>

                    </div>


                    <button
                        className="back-orders-button"
                        onClick={() =>
                            navigate("/orders")
                        }
                    >
                        ← My Orders
                    </button>

                </div>


                {/* =================================================
                    ORDER INFORMATION
                ================================================= */}

                <div className="order-info-card">

                    <div className="order-info-item">

                        <span>
                            Order ID
                        </span>

                        <strong>
                            {order._id}
                        </strong>

                    </div>


                    <div className="order-info-item">

                        <span>
                            Payment
                        </span>

                        <strong
                            className={
                                `details-payment-status ${paymentStatus}`
                            }
                        >
                            {paymentStatus}
                        </strong>

                    </div>


                    <div className="order-info-item">

                        <span>
                            Order Status
                        </span>

                        <strong
                            className={
                                `details-order-status ${orderStatus}`
                            }
                        >
                            {orderStatus}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    PRODUCTS
                ================================================= */}

                <div className="details-section">

                    <h2>
                        Items
                    </h2>


                    <div className="details-items">

                        {order.items?.map(
                            (item, index) => (

                                <div
                                    className="details-item"
                                    key={
                                        `${item.productId}-${index}`
                                    }
                                >

                                    {/* IMAGE */}

                                    <div className="details-item-image">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                    </div>


                                    {/* PRODUCT INFO */}

                                    <div className="details-item-info">

                                        <h3>
                                            {item.name}
                                        </h3>

                                        {item.category && (

                                            <p>
                                                Category:{" "}
                                                {item.category}
                                            </p>

                                        )}

                                        <p>
                                            Quantity:{" "}
                                            {item.quantity}
                                        </p>

                                    </div>


                                    {/* PRICE */}

                                    <div className="details-item-price">

                                        <div className="original-price">

                                            ₹
                                            {Number(
                                                item.originalPrice
                                            ).toFixed(2)}

                                            {" × "}

                                            {item.quantity}

                                        </div>


                                        <div className="discounted-price">

                                            ₹
                                            {Number(
                                                item.discountedPrice
                                            ).toFixed(2)}

                                            {" × "}

                                            {item.quantity}

                                        </div>


                                        <strong>

                                            ₹
                                            {Number(
                                                item.totalPrice
                                            ).toFixed(2)}

                                        </strong>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>


                {/* =================================================
                    PRICE SUMMARY
                ================================================= */}

                <div className="details-section">

                    <h2>
                        Price Summary
                    </h2>


                    <div className="price-summary">


                        {/* SUBTOTAL */}

                        <div className="price-row">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                ₹
                                {Number(
                                    order.subtotal
                                ).toFixed(2)}
                            </span>

                        </div>


                        {/* DISCOUNT */}

                        <div className="price-row discount-row">

                            <span>
                                Discount
                            </span>

                            <span>
                                - ₹
                                {Number(
                                    order.discount
                                ).toFixed(2)}
                            </span>

                        </div>


                        {/* DELIVERY */}

                        <div className="price-row">

                            <span>
                                Delivery Charge
                            </span>

                            <span>
                                ₹
                                {Number(
                                    order.deliveryCharge
                                ).toFixed(2)}
                            </span>

                        </div>


                        {/* TOTAL */}

                        <div className="price-row total-row">

                            <strong>
                                Total
                            </strong>

                            <strong>
                                ₹
                                {Number(
                                    order.totalAmount
                                ).toFixed(2)}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SHIPPING ADDRESS
                ================================================= */}

                <div className="details-section">

                    <h2>
                        Delivery Address
                    </h2>


                    <div className="shipping-address">

                        <strong>
                            {order.shippingAddress?.fullName}
                        </strong>

                        <p>
                            {order.shippingAddress?.address}
                        </p>

                        <p>
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.state}
                        </p>

                        <p>
                            Pincode:{" "}
                            {order.shippingAddress?.pincode}
                        </p>

                        <p>
                            Phone:{" "}
                            {order.shippingAddress?.phone}
                        </p>

                    </div>

                </div>


                {/* =================================================
                    PAYMENT INFORMATION
                ================================================= */}

                {order.razorpayPaymentId && (

                    <div className="details-section">

                        <h2>
                            Payment Information
                        </h2>


                        <div className="payment-information">

                            <div>

                                <span>
                                    Payment ID
                                </span>

                                <strong>
                                    {order.razorpayPaymentId}
                                </strong>

                            </div>


                            {order.razorpayOrderId && (

                                <div>

                                    <span>
                                        Razorpay Order ID
                                    </span>

                                    <strong>
                                        {order.razorpayOrderId}
                                    </strong>

                                </div>

                            )}

                        </div>

                    </div>

                )}


                {/* =================================================
                    BOTTOM BUTTON
                ================================================= */}

                <button
                    className="continue-shopping-button"
                    onClick={() =>
                        navigate("/sarees")
                    }
                >
                    Continue Shopping
                </button>


            </div>

        </div>

    );

};

export default OrderDetails;
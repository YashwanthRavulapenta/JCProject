import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";

const API_URL = "https://sjb-backend-01lg.onrender.com";

const Orders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {

                    setError(
                        "Please login to view your orders."
                    );

                    setLoading(false);

                    return;
                }

                const response = await fetch(
                    `${API_URL}/api/orders/my-orders`,
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

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

                if (
                    !response.ok ||
                    !data.success
                ) {
                    throw new Error(
                        data.message ||
                        "Unable to fetch orders"
                    );
                }

                setOrders(
                    data.orders || []
                );

            } catch (error) {

                console.error(
                    "Fetch orders error:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load orders."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, []);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="orders-page">

                <div className="orders-container">

                    <h1>My Orders</h1>

                    <p className="orders-loading">
                        Loading your orders...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (
            <div className="orders-page">

                <div className="orders-container">

                    <h1>My Orders</h1>

                    <div className="orders-error">
                        {error}
                    </div>

                    <button
                        className="orders-shop-button"
                        onClick={() =>
                            navigate("/sarees")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // NO ORDERS
    // =====================================================

    if (orders.length === 0) {

        return (
            <div className="orders-page">

                <div className="orders-container">

                    <h1>My Orders</h1>

                    <div className="no-orders">

                        <div className="no-orders-icon">
                            🛍️
                        </div>

                        <h2>
                            No Orders Yet
                        </h2>

                        <p>
                            You haven't placed any orders yet.
                        </p>

                        <button
                            className="orders-shop-button"
                            onClick={() =>
                                navigate("/sarees")
                            }
                        >
                            Start Shopping
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // ORDERS
    // =====================================================

    return (

        <div className="orders-page">

            <div className="orders-container">

                <h1>
                    My Orders
                </h1>


                <div className="orders-list">

                    {orders.map((order) => {

                        const firstItem =
                            order.items?.[0];

                        return (

                            <div
                                className="order-card"
                                key={order._id}
                            >

                                {/* ORDER HEADER */}

                                <div className="order-header">

                                    <div>

                                        <span className="order-label">
                                            Order ID
                                        </span>

                                        <strong>
                                            {order._id}
                                        </strong>

                                    </div>


                                    <div className="order-date">

                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )}

                                    </div>

                                </div>


                                {/* PRODUCT PREVIEW */}

                                <div className="order-product">

                                    {firstItem?.image && (

                                        <img
                                            src={
                                                firstItem.image
                                            }
                                            alt={
                                                firstItem.name
                                            }
                                        />

                                    )}


                                    <div className="order-product-info">

                                        <h3>
                                            {firstItem?.name ||
                                                "Order Items"}
                                        </h3>

                                        {order.items?.length > 1 && (

                                            <p>
                                                +{" "}
                                                {order.items.length - 1}
                                                {" "}
                                                more item(s)
                                            </p>

                                        )}

                                        <p>
                                            Quantity:{" "}
                                            {order.items?.reduce(
                                                (
                                                    total,
                                                    item
                                                ) =>
                                                    total +
                                                    item.quantity,
                                                0
                                            )}
                                        </p>

                                    </div>

                                </div>


                                {/* ORDER FOOTER */}

                                <div className="order-footer">

                                    <div className="order-status-section">

                                        <span>
                                            Payment
                                        </span>

                                        <strong
                                            className={
                                                `payment-status ${
                                                    order.paymentStatus
                                                }`
                                            }
                                        >
                                            {
                                                order.paymentStatus
                                            }
                                        </strong>

                                    </div>


                                    <div className="order-status-section">

                                        <span>
                                            Order Status
                                        </span>

                                        <strong
                                            className={
                                                `order-status ${
                                                    order.orderStatus
                                                }`
                                            }
                                        >
                                            {
                                                order.orderStatus
                                            }
                                        </strong>

                                    </div>


                                    <div className="order-total">

                                        <span>
                                            Total
                                        </span>

                                        <strong>
                                            ₹
                                            {Number(
                                                order.totalAmount
                                            ).toFixed(2)}
                                        </strong>

                                    </div>


                                    <button
                                        className="view-order-button"
                                        onClick={() =>
                                            navigate(
                                                `/orders/${order._id}`
                                            )
                                        }
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>
    );
};

export default Orders;
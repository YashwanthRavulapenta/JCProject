import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    return (
        <div className="order-success-page">

            <div className="order-success-container">

                {/* SUCCESS ICON */}

                <div className="success-icon">
                    ✓
                </div>


                {/* TITLE */}

                <h1>
                    Order Placed Successfully!
                </h1>


                {/* MESSAGE */}

                <p className="success-message">
                    Thank you for shopping with J Collections.
                    Your payment has been successfully verified
                    and your order has been placed.
                </p>


                {/* ORDER ID */}

                <div className="order-id-box">

                    <span>
                        Order ID
                    </span>

                    <strong>
                        {id}
                    </strong>

                </div>


                {/* BUTTONS */}

                <div className="success-buttons">

                    <button
                        className="view-order-button"
                        onClick={() =>
                            navigate(`/orders/${id}`)
                        }
                    >
                        View Order
                    </button>


                    <button
                        className="my-orders-button"
                        onClick={() =>
                            navigate("/orders")
                        }
                    >
                        My Orders
                    </button>


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

        </div>
    );
};

export default OrderSuccess;
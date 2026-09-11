import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Cart.css";

const Cart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const DISCOUNT_PERCENTAGE = 10;
    const DELIVERY_CHARGE = 25;


    // =========================================
    // GET CART
    // =========================================

    const getCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(
                "https://sjb-backend-01lg.onrender.com/api/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                setCart(
                    Array.isArray(data.items)
                        ? data.items
                        : []
                );
            } else {
                setCart([]);
                console.error(data.message);
            }

        } catch (error) {
            console.error("GET CART ERROR:", error);
            alert("Unable to load cart");

        } finally {
            setLoading(false);
        }
    };


    // =========================================
    // LOAD CART
    // =========================================

    useEffect(() => {
        getCart();
    }, []);


    // =========================================
    // CHANGE QUANTITY
    // =========================================

    const changeQuantity = async (item, newQuantity) => {

        if (newQuantity < 1) {
            return;
        }

        // Update UI immediately
        setCart(previousCart =>
            previousCart.map(cartItem =>
                cartItem.cartItemId === item.cartItemId
                    ? {
                        ...cartItem,
                        quantity: newQuantity
                    }
                    : cartItem
            )
        );

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(
                `https://sjb-backend-01lg.onrender.com/api/cart/${item.cartItemId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        quantity: newQuantity
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {

                alert(
                    data.message ||
                    "Unable to update quantity"
                );

                getCart();
                return;
            }

            window.dispatchEvent(
                new Event("cartUpdated")
            );

        } catch (error) {

            console.error(
                "QUANTITY ERROR:",
                error
            );

            alert("Unable to update quantity");

            getCart();
        }
    };


    // =========================================
    // REMOVE ITEM
    // =========================================

    const removeItem = async (itemId) => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            const response = await fetch(
                `https://sjb-backend-01lg.onrender.com/api/cart/${itemId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {

                setCart(previousCart =>
                    previousCart.filter(
                        item =>
                            item.cartItemId !== itemId
                    )
                );

                window.dispatchEvent(
                    new Event("cartUpdated")
                );

            } else {

                alert(
                    data.message ||
                    "Unable to remove item"
                );
            }

        } catch (error) {

            console.error(
                "REMOVE ERROR:",
                error
            );

            alert("Unable to remove item");
        }
    };


    // =========================================
    // TOTAL ITEMS
    // =========================================

    const totalItems = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );


    // =========================================
    // ORDER CALCULATIONS
    // =========================================

    let subtotal = 0;
    let totalDiscount = 0;
    let discountedSubtotal = 0;


    cart.forEach(item => {

        const originalPrice =
            Number(item.price || 0);

        const quantity =
            Number(item.quantity || 0);


        // 10% discount on this product

        const discountPerItem =
            originalPrice *
            (DISCOUNT_PERCENTAGE / 100);


        const discountedPrice =
            originalPrice -
            discountPerItem;


        subtotal +=
            originalPrice * quantity;


        totalDiscount +=
            discountPerItem * quantity;


        discountedSubtotal +=
            discountedPrice * quantity;
    });


    // Delivery is NOT discounted

    const finalTotal =
        discountedSubtotal +
        DELIVERY_CHARGE;


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (
            <main className="cart-page">

                <div className="cart-loading">
                    Loading your cart...
                </div>

            </main>
        );
    }


    // =========================================
    // EMPTY CART
    // =========================================

    if (cart.length === 0) {

        return (
            <main className="cart-page">

                <div className="empty-cart">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <h1>
                        Your Cart is Empty
                    </h1>

                    <p>
                        Add some beautiful sarees
                        or jewellery to your cart.
                    </p>

                    <button
                        type="button"
                        className="continue-shopping"
                        onClick={() =>
                            navigate("/sarees")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            </main>
        );
    }


    // =========================================
    // CART PAGE
    // =========================================

    return (
        <main className="cart-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="cart-heading">

                <h1>
                    Shopping Cart
                </h1>

                <p>
                    {totalItems} item
                    {totalItems !== 1 ? "s" : ""}
                </p>

            </div>


            {/* =================================
                CART LAYOUT
            ================================= */}

            <div className="cart-layout">


                {/* =================================
                    CART ITEMS
                ================================= */}

                <section className="cart-items">

                    {cart.map(item => {

                        const originalPrice =
                            Number(item.price || 0);

                        const quantity =
                            Number(item.quantity || 0);


                        // 10% discount

                        const discountPerItem =
                            originalPrice *
                            (DISCOUNT_PERCENTAGE / 100);


                        // Price after discount

                        const discountedPrice =
                            originalPrice -
                            discountPerItem;


                        // Quantity total

                        const itemTotal =
                            discountedPrice *
                            quantity;


                        return (

                            <article
                                className="cart-item"
                                key={item.cartItemId}
                            >


                                {/* =================================
                                    IMAGE
                                ================================= */}

                                <div className="cart-image-box">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-image"
                                    />

                                </div>


                                {/* =================================
                                    PRODUCT DETAILS
                                ================================= */}

                                <div className="cart-product">


                                    {/* NAME */}

                                    <h2>
                                        {item.name}
                                    </h2>


          

                                    {/* PRICE */}

                                    <div className="product-price">

                                        <span className="old-price">
                                            ₹
                                            {originalPrice.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>


                                        <span className="new-price">
                                            ₹
                                            {discountedPrice.toLocaleString(
                                                "en-IN",
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }
                                            )}
                                        </span>

                                    </div>


                                    {/* =================================
                                        QUANTITY + REMOVE
                                    ================================= */}

                                    <div className="product-actions">


                                        {/* QUANTITY */}

                                        <div className="quantity-box">

                                            <button
                                                type="button"

                                                onClick={() =>
                                                    changeQuantity(
                                                        item,
                                                        quantity - 1
                                                    )
                                                }

                                                disabled={
                                                    quantity <= 1
                                                }
                                            >
                                                −
                                            </button>


                                            <span>
                                                {quantity}
                                            </span>


                                            <button
                                                type="button"

                                                onClick={() =>
                                                    changeQuantity(
                                                        item,
                                                        quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>


                                        {/* REMOVE */}

                                        <button
                                            type="button"
                                            className="remove-btn"

                                            onClick={() =>
                                                removeItem(
                                                    item.cartItemId
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>


                                {/* =================================
                                    ITEM TOTAL
                                ================================= */}

                                <div className="item-total">

                                    ₹
                                    {itemTotal.toLocaleString(
                                        "en-IN",
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }
                                    )}

                                </div>

                            </article>
                        );
                    })}

                </section>


                {/* =================================
                    ORDER SUMMARY
                ================================= */}

                <aside className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="summary-row">

                        <span>
                            Items
                        </span>

                        <span>
                            {totalItems}
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Subtotal
                        </span>

                        <span>
                            ₹
                            {subtotal.toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            You Save
                        </span>

                        <span className="discount-text" id="you_save">
                            ₹
                            {totalDiscount.toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Delivery
                        </span>

                        <span>
                            ₹25
                        </span>

                    </div>


                    <div className="summary-line"></div>


                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹
                            {finalTotal.toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}
                        </strong>

                    </div>


                    <button
                        type="button"
                        className="checkout-btn"

                        onClick={() =>
                            navigate("/checkout")
                        }
                    >
                        Proceed to Checkout
                    </button>


                    <button
                        type="button"
                        className="continue-btn"

                        onClick={() =>
                            navigate("/sarees")
                        }
                    >
                        ← Continue Shopping
                    </button>

                </aside>

            </div>

        </main>
    );
};


export default Cart;
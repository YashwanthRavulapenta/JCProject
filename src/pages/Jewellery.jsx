import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "../styles/Jewellery.css";


const BASE_URL =
    "https://sjb-backend-01lg.onrender.com";


const Jewellery = () => {

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [jewellery, setJewellery] =
        useState([]);

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    const [addingId, setAddingId] =
        useState(null);

    const [error, setError] =
        useState("");


    // =========================================================
    // CATEGORIES
    // =========================================================

    const categories = [

        {
            name: "All",
            display: "All Jewellery"
        },

        {
            name: "Necklace",
            display: "Necklace"
        },

        {
            name: "Earrings",
            display: "Earrings"
        },

        {
            name: "Bangles",
            display: "Bangles"
        },

        {
            name: "Bracelet",
            display: "Bracelet"
        },

        {
            name: "Ring",
            display: "Ring"
        },

        {
            name: "Jewellery Set",
            display: "Jewellery Set"
        }

    ];


    // =========================================================
    // GET JEWELLERY
    // =========================================================

    const getJewellery = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await fetch(
                    `${BASE_URL}/api/jewellery`
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch jewellery"
                );

            }


            const data =
                await response.json();


            if (!Array.isArray(data)) {

                throw new Error(
                    "Invalid jewellery data"
                );

            }


            setJewellery(data);

        } catch (error) {

            console.error(
                "GET JEWELLERY ERROR:",
                error
            );


            setError(
                "Unable to load jewellery. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // LOAD JEWELLERY
    // =========================================================

    useEffect(() => {

        getJewellery();

    }, []);


    // =========================================================
    // FILTER JEWELLERY
    // =========================================================

    const displayedJewellery =
        useMemo(() => {

            if (
                selectedCategory === "All"
            ) {

                return jewellery;

            }


            const selected =
                selectedCategory
                    .trim()
                    .toLowerCase();


            return jewellery.filter(
                (item) => {

                    const category =
                        String(
                            item.category || ""
                        )
                            .trim()
                            .toLowerCase();


                    return (
                        category ===
                        selected
                    );

                }
            );


        }, [
            jewellery,
            selectedCategory
        ]);


    // =========================================================
    // CATEGORY CHANGE
    // =========================================================

    const handleCategoryChange =
        (category) => {

            setSelectedCategory(
                category
            );


            setTimeout(() => {

                const products =
                    document.querySelector(
                        ".jewellery-products-section"
                    );


                if (products) {

                    products.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }, 50);

        };


    // =========================================================
    // ADD TO CART
    // =========================================================

    const handleAdd =
        async (item) => {


        // -----------------------------------------------------
        // SOLD OUT CHECK
        // -----------------------------------------------------

        if (
            item.isAvailable === false
        ) {

            alert(
                "This jewellery is currently sold out."
            );

            return;

        }


        // -----------------------------------------------------
        // GET TOKEN
        // -----------------------------------------------------

        const token =
            localStorage.getItem(
                "token"
            );


        // -----------------------------------------------------
        // LOGIN CHECK
        // -----------------------------------------------------

        if (!token) {

            alert(
                "Please login first"
            );

            navigate("/login");

            return;

        }


        try {

            setAddingId(
                item._id
            );


            // -------------------------------------------------
            // ADD TO CART
            // -------------------------------------------------

            const response =
                await fetch(
                    `${BASE_URL}/api/cart`,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify({

                                productId:
                                    item._id,

                                productType:
                                    "jewellery"

                            })

                    }
                );


            const data =
                await response.json();


            // -------------------------------------------------
            // ERROR
            // -------------------------------------------------

            if (
                !response.ok ||
                !data.success
            ) {

                alert(
                    data.message ||
                    "Unable to add jewellery to cart"
                );

                return;

            }


            // -------------------------------------------------
            // UPDATE NAVBAR CART COUNT
            // -------------------------------------------------

            window.dispatchEvent(
                new Event(
                    "cartUpdated"
                )
            );


            // -------------------------------------------------
            // GO TO CART
            // -------------------------------------------------

            alert('Added')


        } catch (error) {

            console.error(
                "ADD JEWELLERY ERROR:",
                error
            );


            alert(
                "Unable to add jewellery to cart"
            );


        } finally {

            setAddingId(
                null
            );

        }

    };


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <main className="jewellery-page">


            {/* =================================================
                BRAND
            ================================================= */}

            <header className="jewellery-brand">

                <span
                    className="brand-line"
                ></span>


                <h1>
                    J COLLECTIONS
                </h1>


                <span
                    className="brand-line"
                ></span>

            </header>


            {/* =================================================
                CATEGORY FILTER
            ================================================= */}

            <nav
                className="category-section"
                aria-label="Jewellery categories"
            >

                {categories.map(
                    (category) => (

                        <button

                            key={
                                category.name
                            }

                            type="button"

                            className={

                                selectedCategory ===
                                category.name

                                    ? "category-btn active"

                                    : "category-btn"

                            }

                            aria-pressed={
                                selectedCategory ===
                                category.name
                            }

                            onClick={() =>
                                handleCategoryChange(
                                    category.name
                                )
                            }

                        >

                            {
                                category.display
                            }

                        </button>

                    )
                )}

            </nav>


            {/* =================================================
                ERROR
            ================================================= */}

            {!loading &&
                error && (

                    <div
                        className="
                            jewellery-error
                        "
                    >

                        <div>

                            <strong>
                                Something went wrong
                            </strong>

                            <p>
                                {error}
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={
                                getJewellery
                            }
                        >
                            Try Again
                        </button>

                    </div>

                )}


            {/* =================================================
                PRODUCTS SECTION
            ================================================= */}

            <section
                className="
                    jewellery-products-section
                "
            >


                {/* =================================================
                    CATEGORY TITLE
                    NO COUNT
                ================================================= */}

                {!loading &&
                    !error && (

                        <div
                            className="
                                selected-category-info
                            "
                        >

                            <div>

                                <span
                                    className="
                                        section-eyebrow
                                    "
                                >
                                    J COLLECTIONS
                                </span>


                                <h2>

                                    {
                                        selectedCategory ===
                                        "All"

                                            ? "All Jewellery"

                                            : selectedCategory

                                    }

                                </h2>

                            </div>

                        </div>

                    )}


                {/* =================================================
                    LOADING SKELETON
                ================================================= */}

                {loading && (

                    <div
                        className="
                            jewellery-grid
                        "
                    >

                        {Array.from({
                            length: 10
                        }).map(
                            (_, index) => (

                                <div
                                    className="
                                        jewellery-card
                                        skeleton-card
                                    "
                                    key={index}
                                >

                                    <div
                                        className="
                                            skeleton
                                            skeleton-image
                                        "
                                    ></div>


                                    <div
                                        className="
                                            skeleton-content
                                        "
                                    >

                                        <div
                                            className="
                                                skeleton
                                                skeleton-title
                                            "
                                        ></div>


                                        <div
                                            className="
                                                skeleton
                                                skeleton-price
                                            "
                                        ></div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}


                {/* =================================================
                    PRODUCTS
                ================================================= */}

                {!loading &&
                    !error && (

                        <div
                            className="
                                jewellery-grid
                            "
                        >

                            {displayedJewellery.length > 0 ? (

                                displayedJewellery.map(
                                    (item) => {

                                        const isSoldOut =
                                            item.isAvailable ===
                                            false;


                                        const isAdding =
                                            addingId ===
                                            item._id;


                                        return (

                                            <article

                                                key={
                                                    item._id
                                                }

                                                className={

                                                    isSoldOut

                                                        ? "jewellery-card sold-out-card"

                                                        : "jewellery-card"

                                                }

                                            >


                                                {/* =================================
                                                    IMAGE
                                                ================================= */}

                                                <div
                                                    className="
                                                        jewellery-image-box
                                                    "
                                                >

                                                    {item.image ? (

                                                        <img

                                                            src={
                                                                item.image
                                                            }

                                                            alt={
                                                                item.name ||
                                                                "Jewellery"
                                                            }

                                                            loading="lazy"

                                                        />

                                                    ) : (

                                                        <div
                                                            className="
                                                                no-image
                                                            "
                                                        >
                                                            Image unavailable
                                                        </div>

                                                    )}


                                                    {/* ---------------------------------
                                                        CATEGORY ON IMAGE
                                                    --------------------------------- */}

                                                    <span
                                                        className="
                                                            image-category-badge
                                                        "
                                                    >

                                                        {
                                                            item.category
                                                        }

                                                    </span>


                                                    {/* ---------------------------------
                                                        SOLD OUT
                                                    --------------------------------- */}

                                                    {isSoldOut && (

                                                        <div
                                                            className="
                                                                sold-out-overlay
                                                            "
                                                        >

                                                            SOLD OUT

                                                        </div>

                                                    )}

                                                </div>


                                                {/* =================================
                                                    DETAILS
                                                ================================= */}

                                                <div
                                                    className="
                                                        jewellery-details
                                                    "
                                                >


                                                    {/* ---------------------------------
                                                        NAME
                                                    --------------------------------- */}

                                                    <h3>

                                                        {
                                                            item.name
                                                        }

                                                    </h3>


                                                    {/* ---------------------------------
                                                        PRICE + ADD
                                                    --------------------------------- */}

                                                    <div
                                                        className="
                                                            jewellery-bottom
                                                        "
                                                    >

                                                        <span
                                                            className="
                                                                jewellery-price
                                                            "
                                                        >

                                                            ₹{" "}

                                                            {
                                                                Number(
                                                                    item.price ||
                                                                    0
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )
                                                            }

                                                        </span>


                                                        <button

                                                            type="button"

                                                            className={

                                                                isSoldOut

                                                                    ? "sold-out-add-btn"

                                                                    : ""

                                                            }

                                                            disabled={
                                                                isSoldOut ||
                                                                isAdding
                                                            }

                                                            aria-label={

                                                                isSoldOut

                                                                    ? `${item.name} is sold out`

                                                                    : `Add ${item.name} to cart`

                                                            }

                                                            onClick={() =>
                                                                handleAdd(
                                                                    item
                                                                )
                                                            }

                                                        >

                                                            {

                                                                isSoldOut

                                                                    ? "Sold Out"

                                                                    : isAdding

                                                                        ? "Adding..."

                                                                        : "Add"

                                                            }

                                                        </button>

                                                    </div>

                                                </div>

                                            </article>

                                        );

                                    }

                                )

                            ) : (

                                <div
                                    className="
                                        no-products
                                    "
                                >

                                    <div
                                        className="
                                            no-products-icon
                                        "
                                    >
                                        ✦
                                    </div>


                                    <h3>
                                        No Jewellery Found
                                    </h3>


                                    <p>
                                        There are currently
                                        no jewellery items
                                        available in this category.
                                    </p>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedCategory(
                                                "All"
                                            )
                                        }
                                    >
                                        View All Jewellery
                                    </button>

                                </div>

                            )}

                        </div>

                    )}

            </section>

        </main>

    );

};


export default Jewellery;
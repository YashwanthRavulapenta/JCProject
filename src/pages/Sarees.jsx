import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "../styles/Sarees.css";


const BASE_URL =
    "https://sjb-backend-01lg.onrender.com";


const Sarees = () => {

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [sarees, setSarees] =
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
            display: "All Sarees"
        },

        {
            name: "Cotton Sarees",
            display: "Cotton"
        },

        {
            name: "Chiffon Saree",
            display: "Chiffon"
        },

        {
            name: "Silk Sarees",
            display: "Silk"
        },

        {
            name: "Kanjivaram Saree",
            display: "Kanjivaram"
        },

        {
            name: "Georgette Saree",
            display: "Georgette"
        }

    ];


    // =========================================================
    // GET ALL SAREES
    // =========================================================

    const getSarees = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await fetch(
                    `${BASE_URL}/api/sarees`
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch sarees"
                );

            }


            const data =
                await response.json();


            if (!Array.isArray(data)) {

                throw new Error(
                    "Invalid saree data received"
                );

            }


            setSarees(data);

        } catch (error) {

            console.error(
                "GET SAREES ERROR:",
                error
            );


            setError(
                "Unable to load sarees. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // LOAD DATA
    // =========================================================

    useEffect(() => {

        getSarees();

    }, []);


    // =========================================================
    // FILTER PRODUCTS
    // =========================================================

    const displayedSarees =
        useMemo(() => {

            if (
                selectedCategory === "All"
            ) {

                return sarees;

            }


            const selected =
                selectedCategory
                    .trim()
                    .toLowerCase();


            return sarees.filter(
                (saree) => {

                    const category =
                        String(
                            saree.category || ""
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
            sarees,
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
                        ".sarees-products-section"
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
        async (saree) => {


        // -----------------------------------------------------
        // SOLD OUT
        // -----------------------------------------------------

        if (
            saree.isAvailable === false
        ) {

            alert(
                "This saree is currently sold out."
            );

            return;

        }


        // -----------------------------------------------------
        // TOKEN
        // -----------------------------------------------------

        const token =
            localStorage.getItem(
                "token"
            );


        // -----------------------------------------------------
        // LOGIN
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
                saree._id
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
                                    saree._id,

                                productType:
                                    "saree"

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
                    "Unable to add saree to cart"
                );

                return;

            }


            // -------------------------------------------------
            // UPDATE NAVBAR CART
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
                "ADD SAREE ERROR:",
                error
            );


            alert(
                "Unable to add saree to cart"
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

        <main className="sarees-page">


            {/* =================================================
                BRAND
            ================================================= */}

            <header className="sarees-brand">

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
                aria-label="Saree categories"
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

                    <div className="saree-error">

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
                                getSarees
                            }
                        >
                            Try Again
                        </button>

                    </div>

                )}


            {/* =================================================
                PRODUCTS
            ================================================= */}

            <section
                className="sarees-products-section"
            >


                {/* =================================================
                    CATEGORY HEADER
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

                                            ? "All Sarees"

                                            : selectedCategory

                                    }

                                </h2>

                            </div>



                        </div>

                    )}


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div
                        className="sarees-grid"
                    >

                        {Array.from({
                            length: 10
                        }).map(
                            (_, index) => (

                                <div
                                    className="
                                        saree-card
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
                                                skeleton-color
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
                    PRODUCT GRID
                ================================================= */}

                {!loading &&
                    !error && (

                        <div
                            className="
                                sarees-grid
                            "
                        >

                            {displayedSarees.length > 0 ? (

                                displayedSarees.map(
                                    (saree) => {

                                        const isSoldOut =
                                            saree.isAvailable ===
                                            false;


                                        const isAdding =
                                            addingId ===
                                            saree._id;


                                        return (

                                            <article

                                                key={
                                                    saree._id
                                                }

                                                className={

                                                    isSoldOut

                                                        ? "saree-card sold-out-card"

                                                        : "saree-card"

                                                }

                                            >


                                                {/* =================================
                                                    IMAGE
                                                ================================= */}

                                                <div
                                                    className="
                                                        saree-image-box
                                                    "
                                                >

                                                    {saree.image ? (

                                                        <img

                                                            src={
                                                                saree.image
                                                            }

                                                            alt={
                                                                saree.name ||
                                                                "Saree"
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
                                                        IMAGE CATEGORY
                                                    --------------------------------- */}

                                                    <span
                                                        className="
                                                            image-category-badge
                                                        "
                                                    >

                                                        {
                                                            saree.category
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
                                                        saree-details
                                                    "
                                                >


                                                    {/* ---------------------------------
                                                        NAME
                                                    --------------------------------- */}

                                                    <h3>

                                                        {
                                                            saree.name
                                                        }

                                                    </h3>


                                                    {/* ---------------------------------
                                                        COLOR
                                                    --------------------------------- */}

                                                    <div
                                                        className="
                                                            saree-color
                                                        "
                                                    >

                                                        <span>
                                                            Color
                                                        </span>

                                                        <strong>
                                                            {
                                                                saree.color ||
                                                                "Classic"
                                                            }
                                                        </strong>

                                                    </div>


                                                    {/* ---------------------------------
                                                        PRICE + ADD
                                                    --------------------------------- */}

                                                    <div
                                                        className="
                                                            saree-bottom
                                                        "
                                                    >

                                                        <span
                                                            className="
                                                                saree-price
                                                            "
                                                        >

                                                            ₹{" "}

                                                            {
                                                                Number(
                                                                    saree.price ||
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

                                                                    ? "saree-add-btn sold-out-add-btn"

                                                                    : "saree-add-btn"

                                                            }

                                                            disabled={
                                                                isSoldOut ||
                                                                isAdding
                                                            }

                                                            aria-label={

                                                                isSoldOut

                                                                    ? `${saree.name} is sold out`

                                                                    : `Add ${saree.name} to cart`

                                                            }

                                                            onClick={() =>
                                                                handleAdd(
                                                                    saree
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
                                        No Sarees Found
                                    </h3>


                                    <p>
                                        There are currently
                                        no sarees available
                                        in this category.
                                    </p>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedCategory(
                                                "All"
                                            )
                                        }
                                    >
                                        View All Sarees
                                    </button>

                                </div>

                            )}

                        </div>

                    )}

            </section>

        </main>

    );

};


export default Sarees;
import React, { useEffect, useState } from "react";
import "../styles/Jewellery.css";

const Jewellery = () => {

    // Store ALL jewellery from backend
    const [jewellery, setJewellery] = useState([]);

    // Store random 8 jewellery products initially
    const [featuredJewellery, setFeaturedJewellery] = useState([]);

    // Selected category
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Loading state
    const [loading, setLoading] = useState(true);


    // =========================================
    // FETCH ALL JEWELLERY
    // =========================================

    async function getJewellery() {

        try {

            setLoading(true);

            const response = await fetch(
                "https://sjb-backend-01lg.onrender.com/api/jewellery"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch jewellery");
            }

            const data = await response.json();

            console.log("All Jewellery:", data);

            // Store all jewellery
            setJewellery(data);


            // =========================================
            // RANDOM 8 PRODUCTS FOR INITIAL DISPLAY
            // =========================================

            const shuffledJewellery = [...data]
                .sort(() => Math.random() - 0.5)
                .slice(0, 8);

            setFeaturedJewellery(shuffledJewellery);


        } catch (error) {

            console.log("Jewellery Error:", error);

        } finally {

            setLoading(false);

        }

    }


    // Fetch when page opens

    useEffect(() => {

        getJewellery();

    }, []);



    // =========================================
    // JEWELLERY CATEGORIES
    // =========================================

    const categories = [

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
            display: "Rings"
        },

        {
            name: "Jewellery Set",
            display: "Jewellery Set"
        }

    ];



    // =========================================
    // FRONTEND FILTERING
    // =========================================

    const displayedJewellery =

        selectedCategory === null

            // Initially show random 8
            ? featuredJewellery

            // Filter based on selected category
            : jewellery.filter(

                (eachJewellery) =>

                    eachJewellery.category === selectedCategory

            );



    // =========================================
    // CATEGORY CLICK
    // =========================================

    function handleCategory(categoryName) {

        setSelectedCategory(categoryName);

    }



    return (

        <main className="jewellery-page">


            {/* =================================
                J COLLECTIONS
            ================================= */}

            <div className="jewellery-brand">

                <span className="brand-line"></span>

                <h1>
                    J COLLECTIONS
                </h1>

                <span className="brand-line"></span>

            </div>



            {/* =================================
                CATEGORY BUTTONS
            ================================= */}

            <div className="jewellery-category-section">

                {

                    categories.map((category) => (

                        <button

                            key={category.name}

                            className={

                                selectedCategory === category.name

                                    ? "jewellery-category-btn active"

                                    : "jewellery-category-btn"

                            }

                            onClick={() =>
                                handleCategory(category.name)
                            }

                        >

                            {category.display}

                        </button>

                    ))

                }

            </div>



            {/* =================================
                SHIMMER LOADING
            ================================= */}

            {

                loading && (

                    <div className="jewellery-grid">

                        {

                            Array.from({ length: 10 }).map((_, index) => (

                                <div
                                    className="jewellery-card skeleton-card"
                                    key={index}
                                >

                                    <div className="skeleton jewellery-skeleton-image"></div>

                                    <div className="jewellery-skeleton-content">

                                        <div className="skeleton skeleton-title"></div>

                                        <div className="skeleton skeleton-text"></div>

                                        <div className="skeleton skeleton-price"></div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }



            {/* =================================
                JEWELLERY PRODUCTS
            ================================= */}

            {

                !loading && (

                    <div className="jewellery-grid">

                        {

                            displayedJewellery.length > 0

                                ?

                                displayedJewellery.map((eachJewellery) => (

                                    <article
                                        className="jewellery-card"
                                        key={eachJewellery._id}
                                    >


                                        {/* IMAGE */}

                                        <div className="jewellery-image-box">

                                            <img
                                                src={eachJewellery.image}
                                                alt={eachJewellery.name}
                                                loading="lazy"
                                            />

                                        </div>



                                        {/* DETAILS */}

                                        <div className="jewellery-details">


                                            <h3>
                                                {eachJewellery.name}
                                            </h3>


                                            <p className="jewellery-type">
                                                {eachJewellery.category}
                                            </p>


                                            <div className="jewellery-bottom">


                                                <span>
                                                    ₹ {eachJewellery.price}
                                                </span>


                                                <button>
                                                    Add
                                                </button>


                                            </div>


                                        </div>


                                    </article>

                                ))

                                :

                                <div className="no-jewellery">

                                    <h2>
                                        No Products Available
                                    </h2>

                                    <p>
                                        Products will be added soon.
                                    </p>

                                </div>

                        }

                    </div>

                )

            }


        </main>

    );

};


export default Jewellery;
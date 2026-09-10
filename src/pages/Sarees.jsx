import React, { useEffect, useState } from "react";
import "../styles/Sarees.css";

const Sarees = () => {

    // All sarees from backend
    const [sarees, setSarees] = useState([]);

    // Initial random 8 sarees
    const [featuredSarees, setFeaturedSarees] = useState([]);

    // Selected category
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Loading
    const [loading, setLoading] = useState(true);


    // =========================================
    // FETCH ALL SAREES
    // =========================================

    async function getSarees() {

        try {

            setLoading(true);

            const response = await fetch(
                "https://sjb-backend-01lg.onrender.com/api/sarees"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch sarees");
            }

            const data = await response.json();

            // Store all sarees
            setSarees(data);


            // ---------------------------------
            // RANDOM 8 FOR INITIAL DISPLAY
            // ---------------------------------

            const shuffledSarees = [...data]
                .sort(() => Math.random() - 0.5)
                .slice(0, 8);

            setFeaturedSarees(shuffledSarees);


        } catch (error) {

            console.log("Error:", error);

        } finally {

            setLoading(false);

        }

    }


    // Run once when page opens

    useEffect(() => {

        getSarees();

    }, []);



    // =========================================
    // CATEGORIES
    // =========================================

    const categories = [

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



    // =========================================
    // DISPLAY PRODUCTS
    // =========================================

    const displayedSarees =

        selectedCategory === null

            // Initial random 8
            ? featuredSarees

            // Category products
            : sarees.filter(

                (eachSaree) =>

                    eachSaree.category === selectedCategory

            );



    // =========================================
    // CATEGORY CLICK
    // =========================================

    function handleCategory(categoryName) {

        setSelectedCategory(categoryName);

    }



    return (

        <main className="sarees-page">


            {/* =================================
                SIMPLE PAGE TITLE
            ================================= */}

            <div className="sarees-brand">

                <span className="brand-line"></span>

                <h1>
                    J COLLECTIONS
                </h1>

                <span className="brand-line"></span>

            </div>



            {/* =================================
                CATEGORY BUTTONS
            ================================= */}

            <div className="category-section">

                {

                    categories.map((category) => (

                        <button

                            key={category.name}

                            className={

                                selectedCategory === category.name

                                    ? "category-btn active"

                                    : "category-btn"

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

                    <div className="sarees-grid">

                        {

                            Array.from({ length: 10 }).map((_, index) => (

                                <div
                                    className="saree-card skeleton-card"
                                    key={index}
                                >

                                    <div className="skeleton skeleton-image"></div>

                                    <div className="skeleton-content">

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
                PRODUCTS
            ================================= */}

            {

                !loading && (

                    <div className="sarees-grid">

                        {

                            displayedSarees.length > 0

                                ?

                                displayedSarees.map((eachSaree) => (

                                    <article
                                        className="saree-card"
                                        key={eachSaree._id}
                                    >


                                        {/* IMAGE */}

                                        <div className="saree-image-box">

                                            <img
                                                src={eachSaree.image}
                                                alt={eachSaree.name}
                                                loading="lazy"
                                            />

                                        </div>



                                        {/* PRODUCT DETAILS */}

                                        <div className="saree-details">


                                            <h3>

                                                {eachSaree.name}

                                            </h3>


                                            <p>

                                                {eachSaree.color}

                                            </p>


                                            <div className="saree-bottom">


                                                <span>

                                                    ₹ {eachSaree.price}

                                                </span>


                                                <button>

                                                    Add

                                                </button>


                                            </div>


                                        </div>


                                    </article>

                                ))

                                :

                                <div className="no-products">

                                    <h2>
                                        No Products Available
                                    </h2>

                                </div>

                        }

                    </div>

                )

            }


        </main>

    );

};


export default Sarees;
import React from "react";


const BeautyCard = ({ service, onBook }) => {

    return (

        <div className="beauty-card">


            {/* IMAGE */}

            <div className="beauty-image">

                <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                />

            </div>


            {/* DETAILS */}

            <div className="beauty-details">

                <h2>
                    {service.name}
                </h2>


                <p className="beauty-category">

                    {service.category}

                </p>


                <div className="beauty-bottom">

                    <span className="beauty-price">

                        ₹ {service.price}

                    </span>


                    <button
                        className="book-btn"
                        onClick={() => onBook(service)}
                    >

                        Book

                    </button>

                </div>

            </div>

        </div>

    );

};


export default BeautyCard;
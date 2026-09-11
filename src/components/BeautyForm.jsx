import React, { useState } from "react";


const BeautyForm = ({
    service,
    onClose
}) => {


    const [form, setForm] = useState({

        name: "",

        phone: "",

        date: "",

        time: ""

    });


    const [loading, setLoading] = useState(false);


    // ============================================
    // INPUT CHANGE
    // ============================================

    function handleChange(e) {

        const {
            name,
            value
        } = e.target;


        setForm({

            ...form,

            [name]: value

        });

    }


    // ============================================
    // SUBMIT
    // ============================================

    function handleSubmit(e) {

        e.preventDefault();


        setLoading(true);


        // YOUR MOM'S WHATSAPP NUMBER
        const whatsappNumber =
            "91XXXXXXXXXX";


        const message =

`Hello J Collections,

I would like to book a beauty service.

Customer Details
-------------------------
Name: ${form.name}
Phone: ${form.phone}

Service Details
-------------------------
Service: ${service.name}
Category: ${service.category}
Price: ₹${service.price}

Preferred Appointment
-------------------------
Date: ${form.date}
Time: ${form.time}

Please confirm whether this time is available.

Thank you.`;


        const whatsappUrl =

            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappUrl,
            "_blank"
        );


        setLoading(false);


        onClose();

    }


    // ============================================
    // TODAY
    // ============================================

    const today =

        new Date()
            .toISOString()
            .split("T")[0];


    return (

        <div
            className="beauty-form-overlay"
            onMouseDown={(e) => {

                if (
                    e.target === e.currentTarget
                ) {

                    onClose();

                }

            }}
        >


            <div className="beauty-form-modal">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="beauty-form-header">

                    <div>

                        <p>
                            J COLLECTIONS
                        </p>

                        <h2>
                            Book Appointment
                        </h2>

                    </div>


                    <button
                        type="button"
                        className="form-close"
                        onClick={onClose}
                    >

                        ×

                    </button>

                </div>



                {/* =================================
                    SELECTED SERVICE
                ================================= */}

                <div className="selected-beauty-service">


                    <img
                        src={service.image}
                        alt={service.name}
                    />


                    <div>

                        <small>
                            Selected Service
                        </small>


                        <h3>
                            {service.name}
                        </h3>


                        <p>
                            {service.category}
                        </p>

                    </div>


                    <strong>
                        ₹{service.price}
                    </strong>


                </div>



                {/* =================================
                    FORM
                ================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="beauty-form"
                >


                    {/* NAME */}

                    <div className="form-field">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            placeholder="Enter your name"
                            required
                            onChange={handleChange}
                        />

                    </div>



                    {/* PHONE */}

                    <div className="form-field">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            placeholder="Enter 10-digit phone number"
                            required
                            pattern="[0-9]{10}"
                            maxLength="10"
                            inputMode="numeric"
                            onChange={handleChange}
                        />

                    </div>



                    {/* DATE */}

                    <div className="form-field">

                        <label>
                            Preferred Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            min={today}
                            required
                            onChange={handleChange}
                        />

                    </div>



                    {/* TIME */}

                    <div className="form-field">

                        <label>
                            Preferred Time
                        </label>

                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            required
                            onChange={handleChange}
                        />

                        <small>
                            Final timing will be confirmed through WhatsApp.
                        </small>

                    </div>



                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="beauty-submit-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Opening WhatsApp..."
                            : "Request Appointment"
                        }

                    </button>


                </form>


            </div>

        </div>

    );

};


export default BeautyForm;
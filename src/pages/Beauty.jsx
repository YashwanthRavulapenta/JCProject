import React, { useEffect, useState } from "react";
import beautyServices from "../data/beautyServices";
import "../styles/Beauty.css";

const Beauty = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================
     LOAD BEAUTY SERVICES
  ========================================= */

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setServices(beautyServices);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /* =========================================
     OPEN BOOKING
  ========================================= */

  const handleBook = (service) => {
    setSelectedService(service);

    setName("");
    setPhone("");
    setDate("");
    setTime("");

    setError("");
    setSuccess("");
  };

  /* =========================================
     CLOSE BOOKING
  ========================================= */

  const handleCloseForm = () => {
    if (formLoading) return;

    setSelectedService(null);

    setError("");
    setSuccess("");
  };

  /* =========================================
     SUBMIT APPOINTMENT
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /* Validation */

    if (
      !name.trim() ||
      !phone ||
      !date ||
      !time
    ) {
      setError("Please fill all fields");
      return;
    }

    /* Phone validation */

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10 digit phone number");
      return;
    }

    try {
      setFormLoading(true);

      const response = await fetch(
        "https://sjb-backend-01lg.onrender.com/api/appointments",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customerName: name.trim(),
            phone: phone,
            service: selectedService.name,
            category: selectedService.category,
            price: selectedService.price,
            date: date,
            time: time,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Unable to book appointment"
        );

        return;
      }

      setSuccess("Appointment booked successfully!");

      setName("");
      setPhone("");
      setDate("");
      setTime("");

      setTimeout(() => {
        setSelectedService(null);
        setSuccess("");
      }, 2000);

    } catch (err) {
      console.error("APPOINTMENT ERROR:", err);

      setError("Unable to connect to server");

    } finally {
      setFormLoading(false);
    }
  };

  /* =========================================
     TODAY
  ========================================= */

  const today = new Date()
    .toISOString()
    .split("T")[0];

  /* =========================================
     JSX
  ========================================= */

  return (
    <main className="beauty-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="beauty-header">

        <div className="beauty-title-line"></div>

        <h1>J COLLECTIONS</h1>

        <div className="beauty-title-line beauty-title-line-right"></div>

      </section>

      <p className="beauty-subtitle">
        Beauty & Salon Services
      </p>


      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (
        <section className="beauty-grid">

          {Array.from({ length: 10 }).map((_, index) => (
            <div
              className="beauty-card beauty-shimmer-card"
              key={index}
            >

              <div className="beauty-shimmer-image"></div>

              <div className="beauty-details">

                <div className="beauty-shimmer-title"></div>

                <div className="beauty-shimmer-category"></div>

                <div className="beauty-shimmer-bottom">
                  <div className="beauty-shimmer-price"></div>
                  <div className="beauty-shimmer-button"></div>
                </div>

              </div>

            </div>
          ))}

        </section>
      )}


      {/* =====================================
          SERVICES
      ===================================== */}

      {!loading && (
        <section className="beauty-grid">

          {services.map((service) => (

            <article
              className="beauty-card"
              key={service.id}
            >

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

                <h2 title={service.name}>
                  {service.name}
                </h2>

                <p className="beauty-category">
                  {service.category}
                </p>


                <div className="beauty-bottom">

                  <span className="beauty-price">
                    ₹{service.price}
                  </span>

                  <button
                    type="button"
                    className="book-btn"
                    onClick={() => handleBook(service)}
                  >
                    Book
                  </button>

                </div>

              </div>

            </article>

          ))}

        </section>
      )}


      {/* =====================================
          BOOKING MODAL
      ===================================== */}

      {selectedService && (

        <div
          className="booking-overlay"
          onClick={handleCloseForm}
        >

          <div
            className="booking-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              type="button"
              className="booking-close"
              onClick={handleCloseForm}
              disabled={formLoading}
              aria-label="Close"
            >
              ×
            </button>


            {/* MODAL HEADER */}

            <div className="booking-heading">

              <span></span>

              <h2>Book Appointment</h2>

              <span></span>

            </div>


            {/* SELECTED SERVICE */}

            <div className="selected-service">

              <h3>
                {selectedService.name}
              </h3>

              <p>
                {selectedService.category}
              </p>

              <strong>
                ₹{selectedService.price}
              </strong>

            </div>


            {/* FORM */}

            <form
              className="booking-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="booking-group">

                <label htmlFor="customerName">
                  Name
                </label>

                <input
                  id="customerName"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                  autoComplete="name"
                />

              </div>


              {/* PHONE */}

              <div className="booking-group">

                <label htmlFor="customerPhone">
                  Phone Number
                </label>

                <input
                  id="customerPhone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Enter 10 digit phone number"
                  maxLength="10"
                  autoComplete="tel"
                />

              </div>


              {/* DATE */}

              <div className="booking-group">

                <label htmlFor="appointmentDate">
                  Date
                </label>

                <input
                  id="appointmentDate"
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />

              </div>


              {/* TIME */}

              <div className="booking-group">

                <label htmlFor="appointmentTime">
                  Time
                </label>

                <input
                  id="appointmentTime"
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                />

              </div>


              {/* ERROR */}

              {error && (
                <div className="booking-message booking-error">
                  {error}
                </div>
              )}


              {/* SUCCESS */}

              {success && (
                <div className="booking-message booking-success">
                  {success}
                </div>
              )}


              {/* SUBMIT */}

              <button
                type="submit"
                className="booking-submit"
                disabled={formLoading}
              >
                {formLoading
                  ? "Booking..."
                  : "Confirm Appointment"}
              </button>

            </form>

          </div>

        </div>

      )}

    </main>
  );
};

export default Beauty;
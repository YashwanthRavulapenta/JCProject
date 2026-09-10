import React from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import "../styles/Footer.css";


// ==========================================
// JCOLLECTION LOCATION
// ==========================================

const position = [16.895463, 79.740518];


// ==========================================
// CUSTOM GOLD ICON
// ==========================================

const goldIcon = L.divIcon({
  className: "custom-map-marker",

  html: `
    <div class="gold-marker">
      <div class="gold-marker-inner"></div>
    </div>
  `,

  iconSize: [32, 32],

  iconAnchor: [16, 16],
});


// ==========================================
// FOOTER COMPONENT
// ==========================================

const Footer = () => {

  const googleMapsUrl =
    "https://www.google.com/maps?q=16.895463,79.740518";


  return (

    <footer className="footer" id="contact">

      <div className="footer-container">


        {/* ======================================
            LEFT SIDE - CONTACT
        ====================================== */}

        <div className="footer-left">

          <h2>Contact Us</h2>

          <p className="footer-description">
            Connect with JCollection anytime through your preferred platform.
          </p>


          {/* CONTACT OPTIONS */}

          <div className="contact-list">


            {/* PHONE */}

            <a
              href="tel:+919346179135"
              className="contact-card"
            >

              <div className="contact-icon">
                <FaPhoneAlt />
              </div>

              <div className="contact-text">

                <span>Call Us</span>

                <strong>
                  +91 9346179135
                </strong>

              </div>

            </a>


            {/* WHATSAPP */}

            <a
              href="https://wa.me/919346179135"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >

              <div className="contact-icon">
                <FaWhatsapp />
              </div>

              <div className="contact-text">

                <span>WhatsApp</span>

                <strong>
                  Chat with JCollection
                </strong>

              </div>

            </a>


            {/* EMAIL */}

            <a
              href="mailto:yashuravulapenta@gmail.com"
              className="contact-card"
            >

              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <div className="contact-text">

                <span>Email Us</span>

                <strong>
                  yashuravulapenta@gmail.com
                </strong>

              </div>

            </a>

          </div>


          {/* ======================================
              SOCIAL MEDIA
          ====================================== */}

          <div className="social-section">

            <p>FOLLOW JCOLLECTION</p>


            <div className="social-links">


              {/* INSTAGRAM */}

              <a
                href="#"
                className="social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>


              {/* YOUTUBE */}

              <a
                href="#"
                className="social-icon"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>


              {/* WHATSAPP */}

              <a
                href="https://wa.me/919346179135"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>


            </div>

          </div>

        </div>



        {/* ======================================
            RIGHT SIDE - MAP
        ====================================== */}

        <div className="footer-right">

          <div className="map-wrapper">


            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={true}
              zoomControl={true}
              className="jcollection-map"
            >


              {/* MAP TILES */}

              <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              {/* LOCATION MARKER */}

              <Marker
                position={position}
                icon={goldIcon}
              >

                <Popup>

                  <div className="popup-content">

                    <strong>JCollection</strong>

                    <span>
                      Garidepally, Suryapet District
                    </span>


                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >

                      Open in Google Maps

                    </a>

                  </div>

                </Popup>

              </Marker>


            </MapContainer>


            {/* MAP LABEL */}

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="location-label"
            >

              <FaMapMarkerAlt />

              <span>
                Garidepally, Suryapet District
              </span>

            </a>


          </div>

        </div>


      </div>

    </footer>

  );
};


export default Footer;
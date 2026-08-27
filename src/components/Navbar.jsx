import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import logoImage from '../assets/logo.png'


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}
        <div>
            <NavLink to="/" className="logo" onClick={closeMenu}>
            <img src={logoImage} alt="Logo"/>
            </NavLink>
        </div>


        {/* Navigation Links */}

        <div className={`nav-menu ${menuOpen ? "show" : ""}`}>

          <NavLink
            to="/sarees"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            Sarees
          </NavLink>


          <NavLink
            to="/jewellery"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            Jewellery
          </NavLink>


          <NavLink
            to="/beauty-services"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            Beauty Services
          </NavLink>


          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            About
          </NavLink>


          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={closeMenu}
          >
            Contact
          </NavLink>


          {/* Right Side */}

          <div className="nav-actions">

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "cart active" : "cart"
              }
              onClick={closeMenu}
            >
              🛒
            </NavLink>


            <NavLink
              to="/login"
              className="login"
              onClick={closeMenu}
            >
              Login
            </NavLink>

          </div>

        </div>


        {/* Mobile Button */}

        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
import React, { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate
} from "react-router-dom";

import "../styles/Navbar.css";

import logoImage from "../assets/logo.png";

import {
  isLoggedIn,
  getUser,
  getToken,
  logoutUser
} from "../utils/auth";


const BASE_URL = "https://sjb-backend-01lg.onrender.com";


const Navbar = () => {

  // =========================================
  // STATE
  // =========================================

  const [menuOpen, setMenuOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(
    isLoggedIn()
  );

  const [user, setUser] = useState(
    getUser()
  );

  const [cartCount, setCartCount] = useState(0);


  // =========================================
  // ROUTER
  // =========================================

  const navigate = useNavigate();

  const location = useLocation();


  // =========================================
  // GET CART COUNT
  // =========================================

  const getCartCount = async () => {

    const token = getToken();

    if (!token) {
      setCartCount(0);
      return;
    }

    try {

      const response = await fetch(
        `${BASE_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        data.success &&
        Array.isArray(data.items)
      ) {

        const total = data.items.reduce(
          (sum, item) => {
            return sum + Number(item.quantity || 0);
          },
          0
        );

        setCartCount(total);

      } else {

        setCartCount(0);

      }

    } catch (error) {

      console.error(
        "NAVBAR CART ERROR:",
        error
      );

      setCartCount(0);

    }
  };


  // =========================================
  // CHECK AUTH
  // =========================================

  useEffect(() => {

    const status = isLoggedIn();

    setLoggedIn(status);

    if (status) {

      setUser(getUser());

      getCartCount();

    } else {

      setUser(null);

      setCartCount(0);

    }

  }, [location]);


  // =========================================
  // CART UPDATED EVENT
  // =========================================

  useEffect(() => {

    const handleCartUpdated = () => {

      if (isLoggedIn()) {
        getCartCount();
      } else {
        setCartCount(0);
      }

    };


    window.addEventListener(
      "cartUpdated",
      handleCartUpdated
    );


    return () => {

      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );

    };

  }, []);


  // =========================================
  // CLOSE MENU WHEN ROUTE CHANGES
  // =========================================

  useEffect(() => {

    setMenuOpen(false);

  }, [location.pathname]);


  // =========================================
  // MENU TOGGLE
  // =========================================

  const handleMenuToggle = () => {

    setMenuOpen(prev => !prev);

  };


  // =========================================
  // CLOSE MENU
  // =========================================

  const closeMenu = () => {

    setMenuOpen(false);

  };


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    logoutUser();

    setLoggedIn(false);

    setUser(null);

    setCartCount(0);

    setMenuOpen(false);

    navigate("/login");

  };


  // =========================================
  // NAVBAR
  // =========================================

  return (

    <nav className="navbar">

      <div className="navbar-container">


        {/* =====================================
            LOGO
        ===================================== */}

        <NavLink
          to="/"
          className="logo"
          onClick={closeMenu}
        >

          <img
            src={logoImage}
            alt="J Collections"
          />

        </NavLink>


        {/* =====================================
            NAVIGATION MENU
        ===================================== */}

        <div
          className={
            menuOpen
              ? "nav-menu show"
              : "nav-menu"
          }
        >

          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/sarees"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Sarees
          </NavLink>


          <NavLink
            to="/jewellery"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Jewellery
          </NavLink>


          <NavLink
            to="/beauty-services"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Beauty Services
          </NavLink>


          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            About
          </NavLink>


          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Contact
          </NavLink>


          {/* ===================================
              MOBILE AUTH
          =================================== */}

          <div className="mobile-nav-actions">

            {loggedIn ? (

              <>

                <span
                  className="user-name"
                  title={user?.name || "User"}
                >
                  {user?.name || "User"}
                </span>


                <button
                  type="button"
                  className="logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <NavLink
                  to="/login"
                  className="login"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>


                <NavLink
                  to="/register"
                  className="register"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>

              </>

            )}

          </div>

        </div>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="navbar-right">


          {/* ===================================
              CART
          =================================== */}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "cart active"
                : "cart"
            }
            aria-label="Shopping cart"
            title="Shopping Cart"
          >

            <span className="cart-icon">
              🛒
            </span>


            {cartCount > 0 && (

              <span className="cart-badge">

                {cartCount > 99
                  ? "99+"
                  : cartCount}

              </span>

            )}

          </NavLink>


          {/* ===================================
              DESKTOP AUTH
          =================================== */}

          <div className="desktop-nav-actions">

            {loggedIn ? (

              <>

                <span
                  className="user-name"
                  title={user?.name || "User"}
                >
                  {user?.name || "User"}
                </span>


                <button
                  type="button"
                  className="logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <NavLink
                  to="/login"
                  className="login"
                >
                  Login
                </NavLink>


                <NavLink
                  to="/register"
                  className="register"
                >
                  Register
                </NavLink>

              </>

            )}

          </div>


          {/* ===================================
              HAMBURGER MENU
          =================================== */}

          <button
            type="button"
            className={
              menuOpen
                ? "menu-btn open"
                : "menu-btn"
            }
            onClick={handleMenuToggle}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >

            <span></span>
            <span></span>
            <span></span>

          </button>


        </div>

      </div>

    </nav>
  );
};


export default Navbar;
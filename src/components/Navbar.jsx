import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="mt-5 ">
      <nav
        style={{ backgroundColor: "#F3F7FD" }}
        className="navbar navbar-expand-lg d-flex justify-content-between w-100 navbar-light"
      >
        <div className="container">
          <Link
            style={{ color: "#0D0A52", fontWeight: "bold" }}
            className="navbar-brand"
            to="/en"
          >
            Schiphol
          </Link>

          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeMenu}>
                  Parking & Transport
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeMenu}>
                  Shop, Taste & Discover
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeMenu}>
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeMenu}>
                  Covid
                </Link>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/sepet" onClick={closeMenu}>
                <i className="fa-sharp fa-solid fa-bag-shopping mx-2"></i>
                <span className="position-absolute top-10 start-80 translate-middle badge rounded-pill bg-danger"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/en" onClick={closeMenu}>
                EN
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nl" onClick={closeMenu}>
                NL
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

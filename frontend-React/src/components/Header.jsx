import React from "react";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <a
          href="/"
          className="navbar-brand d-flex align-items-center text-light"
        >
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="me-2 rounded-circle shadow"
          />
          <span className="fs-4 fw-bold text-info">Stock+</span>
        </a>

        <div>
          <a className="btn btn-outline-light me-2 hover-shadow">Login</a>
          <a className="btn btn-info text-white">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;

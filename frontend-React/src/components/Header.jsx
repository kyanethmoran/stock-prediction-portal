import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-dark py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* come back to this for routing */}
        <Link
          to="/"
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
        </Link>

        {isLoggedIn ? (
          <Link to="/" className="btn btn-outline-light me-2 hover-shadow">
            Logout
          </Link>
        ) : (
          <div>
            <Link
              to="/login"
              className="btn btn-outline-light me-2 hover-shadow"
            >
              Login
            </Link>
            <Link to="/signup" className="btn btn-info text-white">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

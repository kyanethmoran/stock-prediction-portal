import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../AuthProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        formData
      );

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      console.log("login works");

      setErrorMsg([]);
      setFormData({
        username: "",
        password: "",
      });
      setSuccess(true);
      // come back and route to the dashboard when it is ready
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setSubmitted(true);
      const backendErrors = [];
      const data = error?.response?.data;

      if (data?.detail) {
        if (data.detail.includes("No active account")) {
          backendErrors.push("Invalid username or password.");
        } else {
          backendErrors.push(data.detail);
        }
      } else {
        backendErrors.push("An unexpected error occured.");
      }

      console.log(backendErrors);
      setErrorMsg(backendErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="container my-5"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div
              className="card shadow-lg rounded-4 border-0"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <div className="card-body p-4">
                <h3 className="text-center mb-4 text-info">Login</h3>

                {submitted && errorMsg.length > 0 && (
                  <div className="alert alert-info small">
                    <ul className="mb-0 ps-3">
                      {errorMsg.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-muted">Username:</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted">Password:</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {loading ? (
                    <button className="btn btn-info w-100" disabled>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      Please Wait...
                    </button>
                  ) : (
                    <button className="btn btn-info w-100 text-light">
                      Login
                    </button>
                  )}
                </form>
                <p className="text-center mt-3 text-muted">
                  Don’t have an account?
                  <Link to="/signup" className="text-info">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]); // array of error strings
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);

    const errors = [];

    // Frontend validations
    if (formData.password.length < 4) {
      errors.push("Password must be at least 4 characters.");
      setLoading(false);
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push("Passwords do not match.");
      setLoading(false);
    }

    if (errors.length > 0) {
      setErrorMessage(errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        formData
      );
      console.log("response.data: ", response?.data);
      console.log("Signup successful");
      setErrorMessage([]); // clear any previous errors
      setSubmitted(false);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSuccess(true);
    } catch (error) {
      console.error("signup error: ", error?.response?.data || error.message);

      const backendErrors = [];
      const data = error?.response?.data;

      if (data?.username) backendErrors.push(`Username: ${data.username[0]}`);
      if (data?.email) backendErrors.push(`Email: ${data.email[0]}`);
      if (data?.password) backendErrors.push(`Password: ${data.password[0]}`);
      if (!data || backendErrors.length === 0)
        backendErrors.push("An unexpected error occurred.");

      setErrorMessage(backendErrors);
    } finally {
      setLoading(false);
      setSubmitted(false);
    }
  };

  return (
    <>
      {success ? (
        <div
          className="container my-5"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "2rem",
            borderRadius: "1rem",
          }}
        >
          <div className="row justify-content-center mt-4">
            <div className="col-md-6 col-lg-5">
              <div
                className="card shadow-lg rounded-4 border-0"
                style={{ backgroundColor: "#f4f4f4" }}
              >
                <div className="card-body p-4 text-center">
                  <h4 className="text-muted mb-3">
                    Account Created Successfully!
                  </h4>
                  <p className="text-muted mb-4">
                    You can now log in to your account.
                  </p>
                  <Link to="/login" className="btn btn-info w-100 text-light">
                    Go to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                  <h3 className="text-center mb-4 text-info">Create Account</h3>

                  {submitted && errorMessage.length > 0 && (
                    <div className="alert alert-info small">
                      <ul className="mb-0 ps-3">
                        {errorMessage.map((msg, idx) => (
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
                      <label className="form-label text-muted">Email:</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        required
                        value={formData.email}
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
                    <div className="mb-3">
                      <label className="form-label text-muted">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {loading ? (
                      <button
                        type="submit"
                        className="btn btn-info w-100"
                        disabled
                      >
                        <FontAwesomeIcon icon={faSpinner} spin />
                        Please Wait...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-info w-100 text-light"
                      >
                        Sign Up
                      </button>
                    )}
                  </form>
                  <p className="text-center mt-3 text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-info">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
